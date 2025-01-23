const fs = require("node:fs/promises");
const grpc = require("@grpc/grpc-js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const userDetails = require("../../dummydata/user.json");
const sequelize = require("../../db/connection");
const { Sequelize } = require("sequelize");

const AddUser = async (call, callback) => {
  try {
    const transaction = await sequelize.transaction();
    const { name, email, address, age, password } = call.request;

    if (!name || !email || !address || !age || !password) {
      return callback({
        details: "Please provide all the form fields",
        code: grpc.status.INVALID_ARGUMENT,
      });
    }

    const [checkEmailExists, _] = await sequelize.query(
      "SELECT * FROM users WHERE email=:email",
      {
        raw: true,
        replacements: {
          email,
        },
      }
    );

    console.log(checkEmailExists);

    if (checkEmailExists && checkEmailExists.length === 1) {
      return callback({
        details: "User with this email already exists",
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    const [__, affectedRows] = await sequelize.query(
      "INSERT INTO users (id, name, email, password, address, age, createdAt, updatedAt) VALUES (:id, :name, :email, :password, :address, :age, :createdAt, :updatedAt)",
      {
        raw: true,
        replacements: {
          id: uuidv4(),
          name,
          email,
          password,
          address,
          age,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        transaction: transaction,
      }
    );

    // const newUserDetails = [...userDetails,user];

    // await fs.writeFile(
    //   path.resolve(__dirname, "../../dummydata/user.json"),
    //   JSON.stringify(newUserDetails, null, 2)
    // );
    if (affectedRows === 1) {
      await transaction.commit();
      return callback(null, {
        message: "User Added successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return callback({
      details: error.details || error.message,
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = AddUser;
