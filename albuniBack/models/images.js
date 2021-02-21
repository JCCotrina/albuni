"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fotoSchema = Schema(
    {
        dueño: { type: String, required: true },
        descripcion: { type: String },
        imagen: { type: String, required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
    },
    {
        collection: "fotos",
    }
);

module.exports = mongoose.model("fotos", fotoSchema);
