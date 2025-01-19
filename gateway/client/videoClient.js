const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");
const {
  PROTO_LOADER_OPTIONS,
  VIDEO_STREAM_PROTO_PATH,
  HOST_URL,
} = require("../../config/config");

const videoPackageDefinations = protoloader.loadSync(
  path.resolve(VIDEO_STREAM_PROTO_PATH),
  PROTO_LOADER_OPTIONS
);

const proto = grpc.loadPackageDefinition(videoPackageDefinations);

const VideoStreamService = proto.stream.VideoStreamService;

const streamClient = new VideoStreamService(
  HOST_URL,
  grpc.credentials.createInsecure()
);

module.exports = streamClient;
