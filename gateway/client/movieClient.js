const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const {
  PROTO_LOADER_OPTIONS,
  MOVIE_PROTO_PATH,
  HOST_URL,
} = require("../../config/config")

const moviePackageDefinations = protoloader.loadSync(
  MOVIE_PROTO_PATH,
  PROTO_LOADER_OPTIONS
)

const movieProto = grpc.loadPackageDefinition(moviePackageDefinations);
const movieService = movieProto.movie.MovieService;

const movieClient = new movieService(
  HOST_URL,
 grpc.credentials.createInsecure()
);

module.exports = movieClient;
