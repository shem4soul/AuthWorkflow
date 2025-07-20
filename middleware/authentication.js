const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  let token;

  // ✅ 1. Check signed cookies first
  if (req.signedCookies && req.signedCookies.token) {
    token = req.signedCookies.token;
  }

  // ✅ 2. Fallback: check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ❌ If no token found, throw error
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    // ✅ 3. Verify token
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
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
