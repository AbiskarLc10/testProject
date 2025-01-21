const grpc = require("@grpc/grpc-js");

const userDetails = [
  {
    id: 1,
    name: "Abiskar",
    email: "abinjr08@gmail.com",
    address: "Tokha-06, Kathmandu",
    age: 21,
  },
  {
    id: 2,
    name: "Suman",
    email: "suman1234@gmail.com",
    address: "Balaju, Kathmandu",
    age: 23,
  },
  {
    id: 3,
    name: "Nisha",
    email: "nisha.m@gmail.com",
    address: "Lalitpur-04, Kathmandu",
    age: 22,
  },
  {
    id: 4,
    name: "Pooja",
    email: "pooja_1@gmail.com",
    address: "Kathmandu-12, Nepal",
    age: 25,
  },
  {
    id: 5,
    name: "Rajesh",
    email: "rajesh_987@gmail.com",
    address: "Maitidevi, Kathmandu",
    age: 29,
  },
  {
    id: 6,
    name: "Rita",
    email: "rita.93@gmail.com",
    address: "Chabahil, Kathmandu",
    age: 27,
  },
  {
    id: 7,
    name: "Binod",
    email: "binod.k@gmail.com",
    address: "Boudha, Kathmandu",
    age: 30,
  },
  {
    id: 8,
    name: "Anjana",
    email: "anjana.k@gmail.com",
    address: "Thamel, Kathmandu",
    age: 24,
  },
  {
    id: 9,
    name: "Suraj",
    email: "suraj_89@gmail.com",
    address: "Pokhara, Nepal",
    age: 26,
  },
  {
    id: 10,
    name: "Maya",
    email: "maya_90@gmail.com",
    address: "Biratnagar, Nepal",
    age: 28,
  },
];

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
