const fs = require("node:fs/promises");
const grpc = require("@grpc/grpc-js");
const path = require("path");

const userDetails = require("../../dummydata/user.json");

const AddUser = async (call, callback) => {
  try {
    const { user } = call.request;
    const { id, name, email, address, age } = user;

    if (!id || !name || !email || !address || !age) {
      return callback({
        details: "Please provide all the form fields",
        code: grpc.status.INVALID_ARGUMENT,
      });
    }

    const checkIdExists = userDetails.find((value,index)=> value.id === id);

    if (checkIdExists) {
      return callback({
        details: "User with this id already exists",
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    const newUserDetails = [...userDetails,user];

    await fs.writeFile(
      path.resolve(__dirname, "../../dummydata/user.json"),
      JSON.stringify(newUserDetails, null, 2) 
    );

    return callback(null, {
      message: "User Added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || error.message,
      code: grpc.status.INTERNAL,
    });
  }
};


module.exports = AddUser;