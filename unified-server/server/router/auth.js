const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { Authenticate, ensureUser } = require("../services/middleware/authenticate")
const upload = require("../services/middleware/upload")
const { roles } = require("../utils/constants")
const { body, validationResult } = require("express-validator")
const validator = require("validator")
const User = require("../model/userSchema")
const { default: mongoose } = require("mongoose")

router.get("/", (req, res) => {
  res.send("Hello User")
})

router.post("/logout", Authenticate, async (req, res) => {
  try {
    req.userData.tokens = req.userData.tokens.filter((token) => token.token !== req.token)
    await req.userData.save()
    res.clearCookie("jwtoken", { path: "/" })
    res.status(200).send(`${req.userData.name} (USER) Logged out !`)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(422).json({ Error: "Invalid Credentials" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password)
      const token = await userExist.generateAuthToken()
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 172800000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      res.set("Authorization", `Bearer ${token}`)
      if (isMatch) {
        res.send({ 
          message: `${userExist.name} (${userExist.role}) LOGIN SUCCESSFULL !`, 
          token,
          role: userExist.role,
          user: userExist.getPublicProfile()
        })
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

router.post(
  "/signup",
  [
    body("name").trim(),
    body("gender").trim(),
    body("email").trim().isEmail().withMessage("Email must be a valid email"),
    body("password").trim().isLength({ min: 7 }).withMessage("Password must be at least 7 characters long"),
    body("cpassword").trim().isLength({ min: 7 }).withMessage("Confirm Password must be at least 7 characters long"),
    body("school").trim(),
    body("mobile").trim(),
    body("state").trim(),
    body("city").trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const { name, gender, Class, email, password, cpassword, school, mobile, state, city } = req.body
      if (!name || !gender || !Class || !email || !password || !cpassword || !school || !mobile || !state || !city) {
        return res.status(422).json({ Error: "Please Fill all the Fields" })
      }
      if (password !== cpassword) {
        return res.status(422).json({ Error: "Please fill same Password and Confirm Password" })
      }
      const userExist = await User.findOne({ email: email })
      if (userExist) {
        return res.status(422).json({ Error: "Email Already Exist" })
      }
      const user = new User({ name, gender, Class, email, password, cpassword, school, mobile, state, city })
      const userRegister = await user.save()
      if (userRegister) {
        res.status(201).json({ message: `USER registered successfully` })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

router.get("/dashboard", Authenticate, ensureUser, (req, res) => {
  res.status(201).send(req.userData.getPublicProfile())
})

router.post("/dashboard/update", Authenticate, ensureUser, async (req, res) => {
  try {
    const _id = req.userData._id
    const { name, Class, email, school, mobile, state, city } = req.body
    if (!name || !Class || !email || !school) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'UG', 'PG'];
    if (!validClasses.includes(String(Class))) {
      return res.status(422).json({ Error: "Invalid Class, Class must be 1-12, UG, or PG" })
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email " })
    }
    await User.findByIdAndUpdate(
      _id,
      { name, Class, email, school, mobile, state, city },
      { new: true, runValidators: true }
    )
    res.status(201).json({ message: "Student Details Updated sucessfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving Student" })
  }
})

router.post("/dashboard", upload.single("testImage"), async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ Error: "User not found" })
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ Error: "Invalid ID" })
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ Error: "User not found" })
    res.set("Content-Type", user.img.contentType)
    res.status(200).send(user.img.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

// Test endpoints for saving test scores
// route for test-1
router.post("/dashboard/test-1", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-1 score from the request body
    const test1Score = req.body.test1Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test1": test1Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-1 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-2
router.post("/dashboard/test-2", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-2 score from the request body
    const test2Score = req.body.test2Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test2": test2Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-2 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-3
router.post("/dashboard/test-3", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-3 score from the request body
    const test3Score = req.body.test3Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test3": test3Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-3 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-4
router.post("/dashboard/test-4", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-4 score from the request body
    const test4Score = req.body.test4Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test4": test4Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-4 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-5
router.post("/dashboard/test-5", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-5 score from the request body
    const test5Score = req.body.test5Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test5": test5Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-5 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-6
router.post("/dashboard/test-6", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-6 score from the request body
    const test6Score = req.body.test6Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test6": test6Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-6 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

// route for test-7
router.post("/dashboard/test-7", Authenticate, ensureUser, async (req, res) => {
  try {
    // Get the user's ID from the request
    const userId = req.userData._id

    // Get the test-7 score from the request body
    const test7Score = req.body.test7Score

    // Find the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tests.test7": test7Score,
        },
      },
      { new: true }
    )

    await user.save()

    // Send a success response
    res.status(200).json({ message: "Test-7 score updated successfully" })
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message })
  }
})

module.exports = router



