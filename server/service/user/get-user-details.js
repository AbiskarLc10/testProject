const grpc = require("@grpc/grpc-js");

const userDetails = require("../../dummydata/user.json");
const sequelize = require("../../db/connection");

const GetUserDetails = async (call, callback) => {
  const { email } = call.request;

  if (!email) {
    return callback({
      details: "Invalid arguments provided",
      code: grpc.status.INVALID_ARGUMENT,
    });
  }
  try {
    // const user = userDetails.find((user) => user.id === id);

    const [user,_] = await sequelize.query(
      "SELECT * FROM users WHERE email= :email",
      {
        raw: true,
        replacements: {
          email,
        },
      }
    );

    if (user.length === 0) {
      return callback({
        details: "User with the id not found",
        code: grpc.status.NOT_FOUND,
      });
    }

    const {password, ...rest}= user[0];

    return callback(null, { user: rest });
  } catch (error) {
    console.log(error);
    return callback({
      details: "Failed to get User details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = GetUserDetails;
