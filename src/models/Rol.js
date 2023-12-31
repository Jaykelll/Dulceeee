const mongoose = require("mongoose");

const rolSchema = mongoose.Schema(
    {
      nombreRol: {
        type: String,
        require: true,
        trim: true,
        unique: true,
      },
      estadoRol: {
        type: Number,
        require: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Rol = mongoose.model("Rol", rolSchema);
  module.exports = Rol;