const { faker } = require("@faker-js/faker");
const sequelize = require("../index");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedUsers = async (count = 10) => {
  try {
    // await sequelize.sync(); // Ensure tables exist
    await sequelize.sync();

    let users = [];
    for (let i = 0; i < count; i++) {
      const plainPassword = "123123"; // Default password
      const salt = await bcrypt.genSalt(10);
      users.push({
        name: faker.person.fullName(),
        code: faker.string.alphanumeric(6),
        mobile: faker.phone.number("+91##########"),
        passwordSave: plainPassword,
        email: faker.internet.email(),
        googleID: faker.datatype.boolean() ? faker.string.uuid() : null,
        facebookID: faker.datatype.boolean() ? faker.string.uuid() : null,
        password: await bcrypt.hash(plainPassword, salt),
        profileImage: faker.image.avatar(),
        role: faker.helpers.arrayElement(["restaurant", "customer"]),
        token: faker.datatype.boolean() ? faker.string.uuid() : null,
        rememberToken: faker.datatype.boolean() ? faker.string.uuid() : null,
        resetToken: null,
        resetTokenExpiry: null,
      });
    }

    await User.bulkCreate(users);
    console.log(`${count} users inserted successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

module.exports = seedUsers;
