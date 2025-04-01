const Restaurant = require("../database/models/Restaurant");
const User = require("../database/models/User");

const RestaurantController = {
  // GET /restaurants
  async index(req, res) {
    try {
      const restaurants = await Restaurant.findAll();
      return res.status(200).json({ data: restaurants });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  async byUserID(req, res) {
    try {
      const { id } = req.params;

      // Find restaurants belonging to the given userId
      const restaurants = await Restaurant.findAll({
        where: { userId: id },
      });

      // Check if any restaurants were found
      if (!restaurants.length) {
        return res
          .status(404)
          .json({ message: "No restaurants found for this user." });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // GET /restaurants/:id
  async show(req, res) {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id);
      if (!restaurant)
        return res.status(404).json({ msg: "Restaurant not found" });

      const doctors = await restaurant.getDoctors({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });

      const doctorsWithrestaurantName = doctors.map((doc) => {
        const doctorObj = doc.toJSON();
        doctorObj.restaurantName = restaurant.name;
        return doctorObj;
      });

      return res.status(200).json({ data: doctorsWithrestaurantName });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  },

  // POST /restaurants
  async store(req, res) {
    try {
      const { name, description, image, location } = req.body;
      const restaurant = await Restaurant.create({
        name,
        description,
        image,
        location,
      });

      return res
        .status(201)
        .json({ msg: "Restaurant created", data: restaurant });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Creation failed", error: error.message });
    }
  },

  // PUT /restaurants/:id
  async update(req, res) {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id);
      if (!restaurant)
        return res.status(404).json({ msg: "Restaurant not found" });

      await restaurant.update(req.body);

      return res
        .status(200)
        .json({ msg: "Restaurant updated", data: restaurant });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Update failed", error: error.message });
    }
  },
  // DELETE /restaurants/:id
  async destroy(req, res) {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id);
      if (!restaurant)
        return res.status(404).json({ msg: "Restaurant not found" });

      await restaurant.destroy();
      return res.status(200).json({ msg: "Restaurant deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Delete failed", error: error.message });
    }
  },
};

module.exports = RestaurantController;
