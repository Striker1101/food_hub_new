const Users = require("../database/models/User"); // Import the Users model
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");
const transportMail = require("../config/nodemailer");
const path = require("path");
const { faker } = require("@faker-js/faker");
const Customer = require("../database/models/Customer");
const Restaurant = require("../database/models/Restaurant");

//get all users
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials, Email does not exist" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials, password is Wrong" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // You can add other user details as needed
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: "1h" }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user,
          token,
          msg: `${user.name} was logged in successfully`,
        });
      }
    );
  } catch (err) {
    console.error("Login error: ", err.message);
    res.status(500).send("Server error");
  }
};

// Create new user
exports.register = async (req, res) => {
  const { email, role, name, password } = req.body;

  try {
    // Check if user already exists
    let user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = await Users.create({
      name,
      email,
      password,
      passwordSave: password,
      role,
    });

    // If user is a restaurant, create dummy restaurant data
    if (role === "restaurant") {
      await Restaurant.create({
        userId: user.id,
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        rating: parseFloat(
          faker.number.float({ min: 3.0, max: 5.0 }).toFixed(1)
        ),
        status: faker.helpers.arrayElement(["open", "closed"]),
        cuisineType: faker.helpers.arrayElement([
          "Italian",
          "Mexican",
          "Chinese",
          "Indian",
          "American",
        ]),
        deliveryTime: faker.helpers.arrayElement([
          "20-30 mins",
          "30-40 mins",
          "40-50 mins",
        ]),
        minimumOrder: faker.number.float({ min: 5, max: 50 }),
        serviceFee: faker.number.float({ min: 0, max: 5 }),
        isVerified: faker.datatype.boolean(),
        featuredImage:
          "https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww",
        images: [
          {
            id: "0",
            image:
              "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            description: "Desi Burrito • Rs249",
          },
          {
            id: "0",
            image:
              "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            description: "Indain Burrito • Rs149",
          },
        ],
        noOfDelivery: faker.number.int({ min: 0, max: 500 }),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });
    }

    // If user is a customer, create dummy customer data
    if (role === "customer") {
      await Customer.create({
        userId: user.id,
        walletBalance: faker.number.float({ min: 0, max: 500 }),
        address: faker.location.streetAddress(),
        loyaltyPoints: faker.number.int({ min: 0, max: 100 }),
        orderCount: faker.number.int({ min: 0, max: 50 }),
        favoriteRestaurants: JSON.stringify([
          faker.number.int({ min: 1, max: 100 }),
          faker.number.int({ min: 1, max: 100 }),
        ]),
      });
    }

    // Generate JWT token
    const payload = { id: user.id, name: user.firstName };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        user,
        token,
        msg: `${user.name} account has been created`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// forgotten password send email
exports.send_token = async (req, res) => {
  const { user_id, title } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { id: user_id } });

    // Check if user is null
    if (!user) {
      return res.status(404).json({ msg: "User not found" }); // Return 404 if user not found
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(3).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Read the HTML template
    const filePath = path.join(__dirname, "../mails/send_token.html");
    let mailTemplate = fs.readFileSync(filePath, "utf-8");
    // Replace the reset token in the template
    mailTemplate = mailTemplate.replace("{{token}}", resetToken);
    mailTemplate = mailTemplate.replace("{{name}}", user?.name);
    mailTemplate = mailTemplate.replace(
      "{{company_name}}",
      process.env.DB_NAME
    );
    // Send email

    const transporter = transportMail;

    const mailOptions = {
      to: user?.email,
      subject: title,
      html: mailTemplate, // Use the modified HTML template
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ msg: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

//set new  password
exports.forget_password_confirm = async (req, res) => {
  // Find the user by ID
  const { confirm_password, password, reset_token, user_id } = req.body; // Get new password from body

  if (!user_id) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  try {
    const user = await Users.findOne({ where: { id: user_id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the reset token is valid and not expired
    if (user.resetToken !== reset_token || Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Validate that both passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    //reset new password
    user.password = password;

    // Clear the reset token and expiry
    user.resetToken = null;
    user.resetTokenExpiry = null;

    // Save the user
    await user.save();

    return res
      .status(200)
      .json({ msg: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// set new email
exports.reset_email_confirm = async (req, res) => {
  // const {} = req.query; // Get reset_token from params
  const { email, reset_token, id } = req.body; // Get new email from body

  if (!id) {
    return res.status(400).json({ msg: "User ID is required" });
  }
  try {
    // Find the user by reset token
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the reset token is valid and not expired
    if (user.resetToken !== reset_token || Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Update user's email
    user.email = email;
    user.resetToken = null; // Clear the reset token
    user.resetTokenExpiry = null; // Clear the expiry
    await user.save();

    return res
      .status(200)
      .json({ msg: "Email has been updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error." });
  }
};

exports.third_party_auth = async (req, res) => {
  try {
    // Custom logic here if needed
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, msg: `${req.user.email} was logged in successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong during authentication" });
  }
};

// exports.logout = async (req, res) => {
//   const { id } = req.body;
// };
