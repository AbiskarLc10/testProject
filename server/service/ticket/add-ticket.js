const grpc = require("@grpc/grpc-js");
const sequelize = require("../../db/connection");
const { v4: uuidv4 } = require("uuid");
const AddTicket = async (call, callback) => {
  try {
    const { movieName, price, description, stock } = call.request;

    if (!movieName || !price || !description || !stock) {
      return callback({
        details: "Please provide all fields",
        code: grpc.status.INVALID_ARGUMENT,
      });
    }

    const [checkTicketExists, _] = await sequelize.query(
      "SELECT * FROM tickets WHERE movieName= :movieName",
      {
        replacements: {
          movieName: movieName,
        },
        raw: true,
      }
    );
    if (checkTicketExists.length === 1) {
      return callback({
        details: "Ticket for this movie already exists",
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    const [__, affectedRows] = await sequelize.query(
      "INSERT INTO tickets (id,movieName,price,description,available,createdAt,updatedAt) VALUES (:id,:movieName,:price,:description,:available,:createdAt,:updatedAt)",
      {
        raw: true,
        replacements: {
          id: uuidv4(),
          movieName,
          price,
          description,
          available: stock > 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (affectedRows === 1) {
      return callback(null, {
        message: "Ticket Added successfully",
        success: true,
      });
    } else {
      throw {
        details: "Error while inserting into database",
      };
    }
  } catch (error) {
    console.log(error);
    return callback({
      details: error.details || "Failed to add ticket details",
      code: grpc.status.INTERNAL,
    });
  }
};

module.exports = AddTicket;
