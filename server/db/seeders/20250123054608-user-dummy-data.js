"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: "3d6a78f7-41fd-4e8b-a762-98d698a63d64",
        name: "Abiskar",
        email: "abinjr08@gmail.com",
        address: "Tokha-06, Kathmandu",
        age: 21,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a3028c5e-6f6e-4fdd-a36b-b7de36d92a3f",
        name: "Suman",
        email: "suman1234@gmail.com",
        address: "Balaju, Kathmandu",
        age: 23,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c56c94a5-bfe4-42da-b107-8a7db8b16c9d",
        name: "Nisha",
        email: "nisha.m@gmail.com",
        address: "Lalitpur-04, Kathmandu",
        age: 22,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8f30cd3a-1c61-4a1e-bd0b-b0d3cbfe2c2c",
        name: "Pooja",
        email: "pooja_1@gmail.com",
        address: "Kathmandu-12, Nepal",
        age: 25,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b741b1e9-1b77-45de-93f7-7892bfaed4f7",
        name: "Rajesh",
        email: "rajesh_987@gmail.com",
        address: "Maitidevi, Kathmandu",
        age: 29,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f318b63f-9247-426e-89b7-88d02cf0a6b1",
        name: "Rita",
        email: "rita.93@gmail.com",
        address: "Chabahil, Kathmandu",
        age: 27,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d51b2a36-f3ed-4cf9-bcc2-f0f897aabfbd",
        name: "Binod",
        email: "binod.k@gmail.com",
        address: "Boudha, Kathmandu",
        age: 30,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "67b2f1f7-df2d-47e3-a14c-c0b6b3cf5a18",
        name: "Anjana",
        email: "anjana.k@gmail.com",
        address: "Thamel, Kathmandu",
        age: 24,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8b69d464-b9a7-46ac-bfc5-0599be94e9d2",
        name: "Suraj",
        email: "suraj_89@gmail.com",
        address: "Pokhara, Nepal",
        age: 26,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "fdac1f2c-48d7-487f-b354-e9d95e8bcd8f",
        name: "Maya",
        email: "maya_90@gmail.com",
        address: "Biratnagar, Nepal",
        age: 28,
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3b7626ca-e697-48a0-bdfb-48f8ad1a4bdf",
        name: "Abiskar Lamichhane",
        email: "abiskar1234@outlook.com",
        age: 25,
        address: "Tokha",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2a6a6bfe-2c9c-4379-8963-6a0a3e8d4fd6",
        name: "Abiskar Lamichhane111",
        email: "abiskar1234@outlook.com",
        age: 21,
        address: "Tokha",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users", null, {});
  },
};
