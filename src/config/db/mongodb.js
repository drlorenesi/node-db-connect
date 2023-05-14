const mongoose = require('mongoose');

// *Connect* to Database during App startup
async function mongodbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `- Connected to ${mongoose.connection.name} on ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log('- Could not connect to MongoDB:', error.message);
  }
}

module.exports = mongodbConnect;
