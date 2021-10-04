const { OAUTH2_CLIENT } = require('google-auth-library');

const CLIENT = new OAUTH2_CLIENT( process.env.GOOGLE_CLIENT_ID );

const GOOGLE_VERIFY = async( idToken = '' ) => {

  const TICKET = await CLIENT.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const { 
    NAME: nombre, 
    PICTURE: img, 
    EMAIL: correo
  } = TICKET.getPayload();
  return { nombre, img, correo };
}

module.exports = {
  GOOGLE_VERIFY
}