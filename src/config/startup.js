module.exports = () => {
  if (!process.env.MONGO_URL) {
    console.error('FATAL ERROR: MONGO_URL is not defined.');
    process.exit(1);
  }
};
