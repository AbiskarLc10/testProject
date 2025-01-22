const grpc = require("@grpc/grpc-js");

const userDetails = require("../../dummydata/user.json");

const GetUserDetails = async (call, callback) => {
  const { id } = call.request;

  if (!id) {
    return callback({
      details: "Invalid arguments provided",
      code: grpc.status.INVALID_ARGUMENT,
    });
  }
  try {
    const user = userDetails.find((user) => user.id === id);
    if (!user) {
      return callback({
        details: "User with the id not found",
        code: grpc.status.NOT_FOUND,
      });
    }

    return callback(null, { user });
  } catch (error) {
    console.log(error);
    return callback({
      details: "Failed to get User details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetUserDetails;
