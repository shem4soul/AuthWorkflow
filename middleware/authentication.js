const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
 const {refreshToken, accessToken} = req.signedCookies


  try {
   if (accessToken) {
    const payload = isTokenValid(accessToken)
    req.user = payload.user
    return next()
   }
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

// ✅ Role-based access control
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
// const CustomError = require('../errors');
// const { isTokenValid } = require('../utils');

// const authenticateUser = async (req, res, next) => {
//   const token = req.signedCookies.token;

//   if (!token) {
//     throw new CustomError.UnauthenticatedError('Authentication Invalid');
//   }

//   try {
//     const { name, userId, role } = isTokenValid({ token });
//     req.user = { name, userId, role };
//     next();
//   } catch (error) {
//     throw new CustomError.UnauthenticatedError('Authentication Invalid');
//   }
// };

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new CustomError.UnauthorizedError(
//         'Unauthorized to access this route'
//       );
//     }
//     next();
//   };
// };

// module.exports = {
//   authenticateUser,
//   authorizePermissions,
// };
