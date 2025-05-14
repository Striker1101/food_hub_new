const { faker } = require("@faker-js/faker");
const sequelize = require("../index");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedUsers = async (count = 10) => {
  try {
    // await sequelize.sync(); // Ensure tables exist
    await sequelize.sync();

    const data = [
      { name: "Forza cafe ", email: "forzacafe@gmail.com" },
      { name: "Kemi bee cafe ", email: "kemibeecafe@gmail.com" },
      { name: "Divine Cafe ", email: "divinecafe@gmail.com" },
      { name: "y2kcafe ", email: "y2kcafe@gmail.com" },
      { name: "blessedcafe ", email: "blessedcafe@gmail.com" },
      { name: "buwacafeteria", email: "buwacafeteria@gmail.com" },
      { name: "Jubilee ", email: "Jubilee@gmail.com" },
      { name: "destinationcafe ", email: "destinationcafe@gmail.com" },
    ];

    let users = [];
    for (let i = 0; i < data.length; i++) {
      const plainPassword = "123123"; // Default password
      const salt = await bcrypt.genSalt(10);
      users.push({
        name: data[i].name,
        code: faker.string.alphanumeric(6),
        mobile: faker.phone.number("+91##########"),
        passwordSave: plainPassword,
        email: data[i].email,
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
