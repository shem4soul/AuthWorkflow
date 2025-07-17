const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = reqiure('./sendVerificationEmail'); 


module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
};
