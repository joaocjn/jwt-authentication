const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado com sucesso ao banco de dados");
    })
    .catch((error) => {
      console.log("Conexão com o banco de dados falhou. saindo agora...");
      console.error(error);
      process.exit(1);
    });
};