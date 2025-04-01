const Product = require("../database/models/Product");
const { Op } = require("sequelize");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;

    const product = await Product.create(req.body);

    res.status(200).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
      const categoryIndex = acc.findIndex(
        (group) => group.name === product.category
      );

      if (categoryIndex > -1) {
        acc[categoryIndex].items.push(product);
      } else {
        acc.push({
          name: product.category,
          items: [product],
        });
      }

      return acc;
    }, []);

    res.status(200).json(groupedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProductByRestaurantID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    // Find products belonging to the given restaurant ID
    const products = await Product.findAll({
      where: { restaurantId: id },
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "image",
        "category",
        "isAvailable",
        "rating",
      ],
      order: [["category", "ASC"]], // Sort by category
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this restaurant" });
    }

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
      const category = product.category || "Uncategorized"; // Handle missing category
      if (!acc[category]) {
        acc[category] = { name: category, items: [] };
      }
      acc[category].items.push(product);
      return acc;
    }, {});

    res.status(200).json(Object.values(groupedProducts));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProductByRestaurantIDNonGroup = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    // Find products belonging to the given restaurant ID
    const products = await Product.findAll({
      where: { restaurantId: id },
      order: [["category", "ASC"]], // Sort by category
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this restaurant" });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(data);
    res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
