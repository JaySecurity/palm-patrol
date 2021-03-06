const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("connected", function (err) {
  if (err) {
    console.log(err.message);
  }
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
