const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const GOOGLE_VERIFY = async (idToken = '') => {
  const TICKET = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
 
    const {
        name: nombre,
        picture: img,
        email: correo
    } = TICKET.getPayload();
    return {nombre, img, correo};
}

module.exports = {
    GOOGLE_VERIFY
}