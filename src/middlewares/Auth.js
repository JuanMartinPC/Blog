const { tokenVerify } = require('../utils/handleJWT')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ 'mensaje': "No se encontro un token de verificación." });
  const isValidToken = await tokenVerify(token);
  isValidToken ? next() : res.status(401).json({ 'mensaje': "El token no es válido." });
};

module.exports = isAuth;