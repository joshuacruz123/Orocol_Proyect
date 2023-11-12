"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPersona = exports.postPersona = exports.deletePersona = exports.getPersona = exports.getPersonas = void 0;
const getPersonas = (req, res) => {
    res.json({
        msg: "getHolaMundo"
    });
};
exports.getPersonas = getPersonas;
const getPersona = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "getPersona",
        id: id
    });
};
exports.getPersona = getPersona;
const deletePersona = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "deletePersona",
        id: id
    });
};
exports.deletePersona = deletePersona;
const postPersona = (req, res) => {
    const { body } = req;
    res.json({
        msg: "postPersona",
        body: body
    });
};
exports.postPersona = postPersona;
const putPersona = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: "postPersona",
        body: body,
        id: id
    });
};
exports.putPersona = putPersona;
