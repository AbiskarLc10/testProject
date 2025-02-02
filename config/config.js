const PROTO_LOADER_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const MOVIE_PROTO_PATH = "../proto/movieproto.proto";
const USER_PROTO_PATH = "../proto/user.proto";
const HOST_URL = "localhost:50051";
const VIDEO_STREAM_PROTO_PATH = "../proto/video.proto";

module.exports = {
  PROTO_LOADER_OPTIONS,
  MOVIE_PROTO_PATH,
  USER_PROTO_PATH,
  HOST_URL,
  VIDEO_STREAM_PROTO_PATH,
};
