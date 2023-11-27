const Usuario = require("../models/Usuarios");
const jwt = require("jsonwebtoken");

const usuarioSave = async (req, res) => {
    try {
        const { email } = req.body;
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ mensaje: "Usuario Existente" });
        } else {
            usuario = new Usuario(req.body);
            await usuario.save();
            return res.status(200).json({ mensaje: "Usuario Creado" });
        }
    } catch (error) {
        console.log(error);
    }
};

const usuarioLogin = async (req, res) => {
    try {
        const { email, contra } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            if (usuario.contra === contra) {
                // Suponiendo que tu modelo 'Rol' tiene un campo 'id'
                const idRol = usuario.idRol;

                // Crear un token JWT con la información del usuario
                const token = jwt.sign(
                    { usuarioId: usuario._id, email: usuario.email, idRol },
                    "tuClaveSecreta",
                    { expiresIn: "1h" } // Puedes ajustar el tiempo de expiración según sea necesario
                );

                return res.status(200).json({
                    mensaje: "Ingreso",
                    usuario: usuario._id,
                    token, // Incluir el token en la respuesta
                    idRol, // Incluir el ID del rol en la respuesta
                });
            } else {
                return res.status(400).json({ mensaje: "Denegado" });
            }
        } else {
            return res.status(400).json({ mensaje: "Denegado" });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    usuarioSave,
    usuarioLogin,
};