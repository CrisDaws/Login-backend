const mongoose = require("mongoose");

const URI = "mongodb://localhost/ionic";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((db) => console.log("Base de datos Conectada"))
  .catch((err) => console.error(err));

module.exports = mongoose;
