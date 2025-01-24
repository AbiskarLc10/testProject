const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");
const { QueryTypes } = require("sequelize");

const GetStreamOfUsers = async (call) => {
  try {
    const userData = await sequelize.query(
      "SELECT id,name,email,address,age FROM users",
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(userData);

    if (userData.length === 0) {
      return call.end();
    }

    userData.forEach((user, index) => {
      return setTimeout(() => {
        call.write({
          user: user,
        });

        if (index === userData.length - 1) {
          call.end();
        }
      }, index * 1000);
    });
  } catch (error) {
    console.log(error);

    return call.emit("error", {
      details: error.details || error.message,
      code: grpc.status.INTERNAL,
    });
  }
};


module.exports = GetStreamOfUsers;