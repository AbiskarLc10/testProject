const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");
const {
  PROTO_LOADER_OPTIONS,
  USER_PROTO_PATH,
  MOVIE_PROTO_PATH,
  HOST_URL,
} = require("../config/config.js");



const bundledProto = require("../proto/bundle.js");

const GetTicketDetailsResponse = bundledProto.nested.movie.GetTicketDetailsResponse;

const userProtoPath = path.resolve(MOVIE_PROTO_PATH);
const movieProtoPath = path.resolve(USER_PROTO_PATH);

const packageDefinations = protoloader.loadSync(
  [userProtoPath, movieProtoPath],
  PROTO_LOADER_OPTIONS
);

const Proto = grpc.loadPackageDefinition(packageDefinations);


const movieService = Proto.movie.MovieService.service;

const server = new grpc.Server();

server.addService(movieService, {
  GetTicketDetails: (call, callback) => {
    const { ticketPrice } = call.request;

    const encodedResponse = GetTicketDetailsResponse.encode({ticketPrice}).finish()
    console.log(encodedResponse);
    return callback(null, encodedResponse);
  },
});

server.bindAsync(
  HOST_URL,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.log("Failed to connect to server ", error.cause)
    } else {
      console.log(`Server listening at port ${port}`)
    }
  }
);
