const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");
const {
  PROTO_LOADER_OPTIONS,
  USER_PROTO_PATH,
  MOVIE_PROTO_PATH,
  HOST_URL,
  VIDEO_STREAM_PROTO_PATH,
} = require("../config/config.js");

const bundledProto = require("../proto/bundle.js");
const StreamVideoFile = require("./service/video/stream-video.js");
const GetUserDetails = require("./service/user/get-user-details.js");
const AddUser = require("./service/user/add-user-details.js");
const sequelize = require("./db/connection.js");

const GetTicketDetailsResponse =
  bundledProto.nested.movie.GetTicketDetailsResponse;

const userProtoPath = path.resolve(MOVIE_PROTO_PATH);
const movieProtoPath = path.resolve(USER_PROTO_PATH);
const videoProtoPath = path.resolve(VIDEO_STREAM_PROTO_PATH);

const packageDefinations = protoloader.loadSync(
  [userProtoPath, movieProtoPath, videoProtoPath],
  PROTO_LOADER_OPTIONS
);

const Proto = grpc.loadPackageDefinition(packageDefinations);

const movieService = Proto.movie.MovieService.service;
const videoService = Proto.stream.VideoStreamService.service;
const userService = Proto.user.UserService.service;

const server = new grpc.Server();

server.addService(movieService, {
  GetTicketDetails: (call, callback) => {
    const { ticketPrice } = call.request;

    console.log(ticketPrice);

    return callback(null, { ticketPrice });
  },
});

server.addService(userService, {
  GetUserDetails,
  AddUser,
});

server.addService(videoService, {
  StreamVideoFile,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
    server.bindAsync(
      HOST_URL,
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          console.log("Failed to connect to server ", error.cause);
        } else {
          console.log(`Server listening at port ${port}`);
        }
      }
    );
  })
  .catch((error) => {
    console.log(`Connection failed : ${error}`);
  });
