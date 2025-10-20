const jwt = require("jsonwebtoken")
const User = require("../../model/userSchema")
const { roles } = require("../../utils/constants")

const Authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwtoken || req.header("Authorization").replace("Bearer ", "")
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    const userData = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    })
    if (!userData) {
      throw new Error("User Not Found")
    }
    req.token = token
    req.userData = userData
    next()
  } catch (error) {
    res.status(402).send("Unauthorized : No Token Provided")
  }
}

const ensureFranchise = (req, res, next) => {
  if (req.userData.role === roles.franchise) return next()
  res.status(401).send("Unauthorized : Only franchise are Authorized")
}

const ensureAdmin = (req, res, next) => {
  if (req.userData.role === roles.admin) return next()
  res.status(401).send("Unauthorized : Only admins are Authorized")
}

const ensureUser = (req, res, next) => {
  if (req.userData.role === roles.user) return next()
  res.status(401).send("Unauthorized : Only Students are Authorized")
}

const ensureSuper = (req, res, next) => {
  if (req.userData.role === roles.superAdmin) return next()
  res.status(401).send("Unauthorized : Only Superadmins are Authorized")
}

const ensureSchool = (req, res, next) => {
  if (req.userData.role === roles.school) return next()
  res.status(401).send("Unauthorized : Only schools are Authorized")
}

module.exports = {
  Authenticate,
  ensureAdmin,
  ensureUser,
  ensureSuper,
  ensureFranchise,
  ensureSchool,
}



