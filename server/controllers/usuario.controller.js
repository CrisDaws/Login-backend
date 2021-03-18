const Usuario = require("../models/usuario");
const usuarioCtrl = {};

const jwt = require('jsonwebtoken');

usuarioCtrl.iniciarSesion = async (req, res, next) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({ email });
    if( !usuario ) return res.status(401).send('El email no existe en nustra bd, Registrese');
    if( usuario.password !== password ) return res.status(401).send('Contraseña incorrecta intente de nuevo');
    const token = jwt.sign({_id: usuario._id}, 'secretKey');
    // res.json({
    //   status: `Acceso correcto, Bienvenido ${nombre}`
    // })
    return res.status(200).json({token});
};


usuarioCtrl.registrarUsuario = async (req, res, next) => {
  const nuevoUsuario = new Usuario({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    email: req.body.email,
    password: req.body.password,
  });
  const token = await jwt.sign({_id: nuevoUsuario._id}, 'secretKey');
  const {email} = req.body
  const usuario = await Usuario.findOne({ email:email });
  if(usuario) return res.status(401).send('Este correo ya existe');
  await nuevoUsuario.save();
  res.json({
      status: 'Usuario registrado correctamente!'
  });
  res.status(200).json({
      token
  });
};

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Solicitud no autorizada');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Solicitud no autorizada');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Solicitud no autorizada');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Solicitud no autorizada');
	}
}

module.exports = usuarioCtrl;
