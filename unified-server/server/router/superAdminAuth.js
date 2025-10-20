// Sourced from school-dashboard-main with minor wording adjustments
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { Authenticate, ensureSuper } = require("../services/middleware/authenticate")
const randomString = require("randomstring")
const addUserMail = require("../services/sendMail/addUserMail")
const User = require("../model/userSchema")
const upload = require("../services/middleware/upload")
const { roles } = require("../utils/constants")
const validator = require("validator")
const { default: mongoose } = require("mongoose")

router.get("/", ensureSuper, (req, res) => {
  res.send("Hello Superadmin, this is 'home' page ")
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(422).json({ Error: "Invalid Credentials" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist && userExist.role === roles.superAdmin) {
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
        res.send({ message: `${userExist.name} (SUPERADMIN) Logged In Sucessfully !`, token })
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
    res.status(200).send(`${req.userData.name} (SUPERADMIN) Logged out !`)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/dashboard", Authenticate, ensureSuper, (req, res) => {
  res.status(201).send(req.userData.getPublicProfile())
})

router.post("/dashboard", upload.single("testImage"), Authenticate, ensureSuper, async (req, res) => {
  try {
    const userId = req.userData._id
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ Error: "Superadmin not found" })
    if (!req.file) return res.status(400).json({ Error: "No image file provided" })
    user.img.data = req.file.buffer
    user.img.contentType = req.file.mimetype
    await user.save()
    res.status(200).json({ message: "Image uploaded successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error uploading image" })
  }
})

router.get("/image/:id", Authenticate, ensureSuper, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ Error: "Invalid ID" })
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ Error: "User not found" })
    if (!user.img || !user.img.data) {
      return res.status(404).json({ Error: "Image not found" })
    }
    res.set("Content-Type", user.img.contentType)
    res.status(200).send(user.img.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/dashboard/update", Authenticate, ensureSuper, async (req, res) => {
  try {
    const _id = req.userData._id
    const { name, email } = req.body
    if (!name || !email) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    if (!validator.isEmail(email)) return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    await User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    res.status(201).json({ message: "Superadmin Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Superadmin" })
  }
})

router.get("/dashboard/students", Authenticate, ensureSuper, async (req, res) => {
  try {
    let studentsData = await User.find({ role: roles.user })
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

router.post("/dashboard/students", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { name, gender, Class, email, school, mobile, state, city } = req.body
    if (!name || !gender || !Class || !email || !school || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    const password = randomString.generate(8)
    const cpassword = password
    const userExist = await User.findOne({ email: email })
    if (userExist) return res.status(422).json({ Error: "Email Already Exist" })
    const user = new User({ name, gender, Class, email, password, cpassword, school, mobile, state, city })
    const userRegister = await user.save()
    if (userRegister) {
      addUserMail(name, email, password)
      res.status(201).json({ message: `${name} (USER) Details added sucessfully !` })
    } else {
      res.status(500).json({ error: "Error saving user" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving user" })
  }
})

router.post("/dashboard/students/update", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id, name, Class, email, school, gender, mobile, state, city } = req.body
    if (!_id || !name || !Class || !email || !school) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'UG', 'PG'];
    if (!validClasses.includes(String(Class))) return res.status(422).json({ Error: "Invalid Class, Class must be 1-12, UG, or PG" })
    if (!validator.isEmail(email)) return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    await User.findByIdAndUpdate(_id, { name, Class, email, school, gender, mobile, state, city }, { new: true, runValidators: true })
    res.status(201).json({ message: "Student Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving user" })
  }
})

router.post("/dashboard/students/search", Authenticate, ensureSuper, async (req, res) => {
  try {
    let queryObj = {
      role: roles.user,
    }
    if (req.body.city) {
      queryObj.city = req.body.city
    }
    if (req.body.Class) {
      queryObj.Class = req.body.Class
    }
    if (req.body.state) {
      queryObj.state = req.body.state
    }
    if (req.body.school) {
      queryObj.school = req.body.school
    }
    console.log(queryObj, req.body.searchKey)

    let users = []
    if (req.body.searchKey !== "") {
      users = await User.find({
        $and: [
          queryObj,
          {
            $or: [
              { name: { $regex: req.body.searchKey, $options: "i" } },
              { email: { $regex: req.body.searchKey, $options: "i" } },
            ],
          },
        ],
      })
    } else {
      users = await User.find(queryObj)
    }

    if (users.length === 0) {
      return res.status(204).send()
    }

    users = users.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })

    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.delete("/dashboard/students", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id } = req.body
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const userExist = await User.findOne({ _id })
    if (userExist) {
      await User.findByIdAndDelete(_id)
      res.status(201).json({ message: "Student Deleted Sucessfully !" })
    } else {
      res.status(404).json({ error: "User not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error Deleting user" })
  }
})

router.get("/dashboard/admins", Authenticate, ensureSuper, async (req, res) => {
  try {
    let adminsData = await User.find({ role: roles.admin })
    if (adminsData.length === 0) return res.status(204).send()
    adminsData = adminsData.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })
    res.status(200).send(adminsData)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post("/dashboard/admins", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { name, gender, email, mobile, state, city, password, cpassword } = req.body
    if (!name || !gender || !email || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) return res.status(422).json({ Error: "Email Already Exist" })
    const user = new User({ name, gender, email, mobile, state, city, password, cpassword, role: roles.admin })
    const userRegister = await user.save()
    if (userRegister) {
      addUserMail(name, email, password)
      res.status(201).json({ message: `${name} (ADMIN) Details added sucessfully !` })
    } else {
      res.status(500).json({ error: "Error saving Admin" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Admin" })
  }
})

router.post("/dashboard/admins/update", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id, name, email, mobile, state, city, gender } = req.body
    if (!_id || !name || !email || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    }
    await User.findByIdAndUpdate(_id, { name, email, mobile, state, city, gender }, { new: true, runValidators: true })
    res.status(201).json({ message: "Admin Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Admin" })
  }
})

router.delete("/dashboard/admins", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id } = req.body
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const userExist = await User.findOne({ _id })
    if (userExist) {
      await User.findByIdAndDelete(_id)
      res.status(201).json({ message: "Admin Deleted Sucessfully !" })
    } else {
      res.status(404).json({ error: "Admin not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error Deleting user" })
  }
})

// Franchise Management Endpoints
router.get("/dashboard/franchises", Authenticate, ensureSuper, async (req, res) => {
  try {
    let franchisesData = await User.find({ role: roles.franchise })
    if (franchisesData.length === 0) return res.status(204).send()
    franchisesData = franchisesData.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })
    res.status(200).send(franchisesData)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post("/dashboard/franchises", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { name, gender, email, mobile, state, city, password, cpassword } = req.body
    if (!name || !gender || !email || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) return res.status(422).json({ Error: "Email Already Exist" })
    const user = new User({ name, gender, email, mobile, state, city, password, cpassword, role: roles.franchise })
    const userRegister = await user.save()
    if (userRegister) {
      addUserMail(name, email, password)
      res.status(201).json({ message: `${name} (FRANCHISE) Details added sucessfully !` })
    } else {
      res.status(500).json({ error: "Error saving Franchise" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Franchise" })
  }
})

router.post("/dashboard/franchises/update", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id, name, email, mobile, state, city, gender } = req.body
    if (!_id || !name || !email || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    }
    await User.findByIdAndUpdate(_id, { name, email, mobile, state, city, gender }, { new: true, runValidators: true })
    res.status(201).json({ message: "Franchise Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Franchise" })
  }
})

router.delete("/dashboard/franchises", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id } = req.body
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const userExist = await User.findOne({ _id })
    if (userExist) {
      await User.findByIdAndDelete(_id)
      res.status(201).json({ message: "Franchise Deleted Sucessfully !" })
    } else {
      res.status(404).json({ error: "Franchise not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error Deleting Franchise" })
  }
})

// School Management Endpoints
router.get("/dashboard/schools", Authenticate, ensureSuper, async (req, res) => {
  try {
    let schoolsData = await User.find({ role: roles.school })
    if (schoolsData.length === 0) return res.status(204).send()
    schoolsData = schoolsData.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })
    res.status(200).send(schoolsData)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post("/dashboard/schools", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { name, gender, email, mobile, state, city, password, cpassword } = req.body
    if (!name || !gender || !email || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) return res.status(422).json({ Error: "Email Already Exist" })
    const user = new User({ name, gender, email, mobile, state, city, password, cpassword, role: roles.school })
    const userRegister = await user.save()
    if (userRegister) {
      addUserMail(name, email, password)
      res.status(201).json({ message: `${name} (SCHOOL) Details added sucessfully !` })
    } else {
      res.status(500).json({ error: "Error saving School" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving School" })
  }
})

router.post("/dashboard/schools/update", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id, name, email, mobile, state, city, gender } = req.body
    if (!_id || !name || !email || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    }
    await User.findByIdAndUpdate(_id, { name, email, mobile, state, city, gender }, { new: true, runValidators: true })
    res.status(201).json({ message: "School Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving School" })
  }
})

router.delete("/dashboard/schools", Authenticate, ensureSuper, async (req, res) => {
  try {
    const { _id } = req.body
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    const userExist = await User.findOne({ _id })
    if (userExist) {
      await User.findByIdAndDelete(_id)
      res.status(201).json({ message: "School Deleted Sucessfully !" })
    } else {
      res.status(404).json({ error: "School not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error Deleting School" })
  }
})

module.exports = router



