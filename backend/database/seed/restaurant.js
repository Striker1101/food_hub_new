const { faker } = require("@faker-js/faker");
const Restaurant = require("../models/Restaurant");
const sequelize = require("../index"); // Sequelize instance

const seedRestaurant = async () => {
  try {
    await sequelize.sync();

    // const restaurants = [];
    const dataSet = [
      {
        id: 1,
        userId: 1,
        featuredImage:
          "https://fv5-6.files.fm/thumb_show.php?i=v2a92tk7yt&view&v=1&PHPSESSID=2832807a55a705b4526f5b26549b229bb537bc83",
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
            description: "a restaurant at bowen university",
          },
        ],
        name: "Forza cafe ",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "beside college of liberal studies",
        phone: "+234 701 338 8114",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6244731,
        longitude: 4.1917397,
        rating: 4.0,
        details: {
          bank_number: "5874690039",
          bank_name: "Moniepoint",
          account_name: "Forza Emporium",
        },
      },
      {
        id: 2,
        userId: 2,
        featuredImage:
          "https://fv5-3.files.fm/thumb_show.php?i=6cwvxkmqnb&view&v=1&PHPSESSID=b2eb0d8cb635ec6b4860cd35afec504d1c64f79e",
        name: "Kemi bee cafe",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "opposite car park (complex) ",
        phone: "+234 706 524 7766",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6251099,
        longitude: 4.1935482,
        rating: 4.0,
        details: {
          bank_number: "8273454754",
          bank_name: "Moniepoint",
          account_name: " Bee Kitchen / Ajobanji Akindele",
        },
      },
      {
        id: 3,
        userId: 3,
        featuredImage:
          "https://fv5-3.files.fm/thumb_show.php?i=rj5zxjgd89&view&v=1&PHPSESSID=b2eb0d8cb635ec6b4860cd35afec504d1c64f79e",
        name: "Divine Cafe (Oungbona)",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "",
        phone: "08150437390",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6246751,
        longitude: 4.1935624,
        rating: 4.0,
        details: {
          bank_number: "8150437390",
          bank_name: "PalmPay",
          account_name: "Adeyome Abosede",
        },
      },
      {
        id: 4,
        userId: 4,
        featuredImage:
          "https://images.unsplash.com/photo-1623848932096-b196440bb57b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hyaW0lMjByZXN0dXJhbnR8ZW58MHx8MHx8fDA%3D",
        name: "Y2K Cafe",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "beside boys hostel",
        phone: "+234 706 524 7766",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        rating: 4.0,
        latitude: 7.6225782,
        longitude: 4.2052917,
      },
      {
        id: 5,
        userId: 5,
        featuredImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
        name: "Blessed cafe",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "beside boys hostel ",
        phone: "+234 8137806917",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.622985,
        longitude: 4.2052773,
        rating: 4.0,
        details: {
          bank_number: "8137806917",
          bank_name: "Palmpay",
          account_name: "Blessed cafe",
        },
      },
      {
        userId: 6,
        featuredImage:
          "https://fv5-3.files.fm/thumb_show.php?i=9qrrmh4c49&view&v=1&PHPSESSID=b2eb0d8cb635ec6b4860cd35afec504d1c64f79e",
        name: "BUWA Cafeteria beside law college",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "",
        phone: "",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6225207,
        longitude: 4.2055991,
        rating: 4.0,
        details: {
          bank_number: "5405554465",
          bank_name: "Moniepoint",
          account_name: "BUWA Bukaterta",
        },
      },
      {
        id: 7,
        userId: 7,
        featuredImage:
          "https://fv5-3.files.fm/thumb_show.php?i=ga5zcmp8cs&view&v=1&PHPSESSID=b2eb0d8cb635ec6b4860cd35afec504d1c64f79e",
        name: "Jubilee ",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "opposite chapel  ",
        phone: "+234 8140389099",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6183997,
        rating: 4.0,
        longitude: 4.2025666,
        details: {
          bank_number: "6113566590",
          bank_name: "Opay",
          account_name: "Babatunde adeoye 2",
        },
      },
      {
        id: 8,
        userId: 8,
        featuredImage:
          "https://fv5-3.files.fm/thumb_show.php?i=cxe9qp3q76&view&v=1&PHPSESSID=b2eb0d8cb635ec6b4860cd35afec504d1c64f79e",
        name: "Destination Cafe ",
        time: "35 - 40 min • 1Km",
        average_cost_for_two: 1600,
        aggregate_rating: 4.3,
        address: "",
        website: "https://dedestinationbowen.com",
        phone: "",
        offer: "NGN 80 OFF",
        no_of_Delivery: 1500,
        latitude: 7.6183997,
        rating: 4.0,
        longitude: 4.2025666,
      },
    ];

    await Restaurant.bulkCreate(dataSet);
    console.log(` restaurants seeded successfully.`);
  } catch (error) {
    console.error("Error seeding restaurants:", error);
  } finally {
    process.exit();
  }
};

module.exports = seedRestaurant;
