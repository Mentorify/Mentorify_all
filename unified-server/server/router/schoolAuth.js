const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { Authenticate, ensureSchool } = require("../services/middleware/authenticate")
const randomString = require("randomstring")
const addUserMail = require("../services/sendMail/addUserMail")
const User = require("../model/userSchema")
const { roles } = require("../utils/constants")
const upload = require("../services/middleware/upload")
const { default: mongoose } = require("mongoose")
const validator = require("validator")

router.get("/", ensureSchool, (req, res) => {
  res.send("Hello School, this is 'home' page ")
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(422).json({ Error: "Invalid Credentials" })
    const userExist = await User.findOne({ email: email })
    if (userExist && userExist.role === roles.school) {
      const isMatch = await bcrypt.compare(password, userExist.password)
      const token = await userExist.generateAuthToken()
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 172800000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
      })
      res.set("Authorization", `Bearer ${token}`)
      if (isMatch) {
        res.send({ message: `${userExist.name} (SCHOOL) Logged In Sucessfully !`, token })
      } else {
        res.status(400).json({ Error: "Invalid Credentials" })
      }
    } else {
      res.status(400).json({ Error: "Invalid Credentials" })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/logout", Authenticate, async (req, res) => {
  try {
    req.userData.tokens = req.userData.tokens.filter((token) => token.token !== req.token)
    await req.userData.save()
    res.clearCookie("jwtoken", { path: "/" })
    res.set("Authorization", "")
    res.status(200).send(`${req.userData.name} (SCHOOL) Logged out !`)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/dashboard", Authenticate, ensureSchool, (req, res) => {
  res.status(201).send(req.userData.getPublicProfile())
})

router.post("/image", upload.single("testImage"), async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ Error: "School not found" })
    user.img.data = req.file.buffer
    user.img.contentType = req.file.mimetype
    await user.save()
    res.status(200).send("Image uploaded successfully")
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/image/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ Error: "Invalid ID" })
    const id = mongoose.Types.ObjectId(req.params.id)
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ Error: "School not found" })
    res.set("Content-Type", user.img.contentType)
    res.status(200).send(user.img.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/dashboard/update", Authenticate, ensureSchool, async (req, res) => {
  try {
    const _id = req.userData._id
    const { name, email } = req.body
    if (!name || !email) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    if (!validator.isEmail(email)) return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    await User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    res.status(201).json({ message: "School Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving School" })
  }
})

router.get("/dashboard/students", Authenticate, ensureSchool, async (req, res) => {
  try {
    let studentsData = await User.find({ role: roles.user, school: req.userData.name })
    if (studentsData.length === 0) return res.status(204).send()
    studentsData = studentsData.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })
    res.status(200).send(studentsData)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post("/dashboard/students/search", Authenticate, async (req, res) => {
  let queryObj = { role: roles.user, school: req.userData.name, city: req.userData.city }
  if (req.body.Class) queryObj.Class = req.body.Class
  let users = []
  if (req.body.searchKey !== "") {
    users = await User.find({
      $and: [
        queryObj,
        { $or: [{ name: { $regex: req.body.searchKey, $options: "i" } }, { email: { $regex: req.body.searchKey, $options: "i" } }] },
      ],
    })
  } else {
    users = await User.find({ $and: [queryObj] })
  }
  res.json(users)
})

router.post("/dashboard/students", Authenticate, ensureSchool, async (req, res) => {
  try {
    const { name, gender, Class, email, school, mobile, state, city, password, cpassword } = req.body
    if (!name || !gender || !Class || !email || !school || !mobile || !state || !city || !password || !cpassword) {
      res.status(422).json({ Error: "Please Fill all the Fields" })
      return
    }
    if (password !== cpassword) {
      res.status(422).json({ Error: "Confirm password donot match" })
      return
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      res.status(422).json({ Error: "Email Already Exist" })
      return
    }
    const user = new User({ name, gender, Class, email, password, cpassword, school, mobile, state, city })
    const userRegister = await user.save()
    if (userRegister) {
      res.status(201).json({ message: "Student Details added sucessfully !" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving user" })
  }
})

router.get("/mailcheck", (req, res) => {
  let info = sendMail()
  res.json(info)
})

router.post("/dashboard/students/update", Authenticate, ensureSchool, async (req, res) => {
  try {
    const { _id, name, Class, email, school, mobile, state, city } = req.body
    if (!_id || !name || !Class || !email || !school || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'UG', 'PG'];
    if (!validClasses.includes(String(Class))) return res.status(422).json({ Error: "Invalid Class, Class must be 1-12, UG, or PG" })
    if (!validator.isEmail(email)) return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    await User.findByIdAndUpdate(
      _id,
      { name, Class, email, school, mobile, state, city },
      { new: true, runValidators: true }
    )
    res.status(201).json({ message: "Student Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving user" })
  }
})

router.delete("/dashboard/students", Authenticate, ensureSchool, async (req, res) => {
  try {
    const { _id } = req.body
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const userExist = await User.findOne({ _id })
    if (userExist) {
      await userExist.remove()
      res.status(201).json({ message: "Student Deleted Sucessfully !" })
    } else {
      res.status(404).json({ error: "User not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error Deleting user" })
  }
})

module.exports = router



