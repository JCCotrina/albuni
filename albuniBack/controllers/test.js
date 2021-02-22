"use strict";

const Fotos = require("../models/images");

exports.subirFoto = async (req, res) => {
    const { dueño, descripcion, imagen } = req.body;
    console.log(req.body);
    try {
        const foto = new Fotos({ dueño, descripcion, imagen });
        const newFoto = await foto.save();

        return res.status(200).json({
            response: newFoto,
        });
    } catch (exception) {}
};

exports.getFotos = async (req, res) => {
    try {
        const fotos = await Fotos.find({}).exec();
        return res.status(200).json({
            response: fotos,
        });
    } catch (exception) {}
};

exports.likeDislike = async (req, res) => {
    const { action, fotoId } = req.body;
    let fotoUpdated;
    try {
        if (action == "like") {
            fotoUpdated = await Fotos.findByIdAndUpdate(
                fotoId,
                { $inc: { likes: 1 } },
                { new: true }
            ).exec();
        } else if (action == "dislike") {
            fotoUpdated = await Fotos.findByIdAndUpdate(
                fotoId,
                { $inc: { dislikes: 1 } },
                { new: true }
            ).exec();
        }

        return res.status(200).json({
            response: fotoUpdated,
        });
    } catch (exception) {}
};

exports.sayHello = async (req, res) => {
    return res.status(200).json({
        ok: true,
    });
};
