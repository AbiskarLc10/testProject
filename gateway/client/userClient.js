const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const path = require("path");
const {
  USER_PROTO_PATH,
  HOST_URL,
  PROTO_LOADER_OPTIONS,
} = require("../../config/config");

const userProtoPath = path.resolve(USER_PROTO_PATH);
const userPackageDefinations = protoloader.loadSync(
  userProtoPath,
  PROTO_LOADER_OPTIONS
);

const userProto = grpc.loadPackageDefinition(userPackageDefinations);

const userService = userProto.user.UserService;

const userClient = new userService(HOST_URL, grpc.credentials.createInsecure());

module.exports = userClient;
