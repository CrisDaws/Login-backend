const app = require("./app");

require("./database");

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});
