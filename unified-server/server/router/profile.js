const express = require("express")
const router = express.Router()
const { Authenticate } = require("../services/middleware/authenticate")
const upload = require("../services/middleware/upload")
const User = require("../model/userSchema")
const validator = require("validator")
const { default: mongoose } = require("mongoose")
const { roles } = require("../utils/constants")

// Unified dashboard endpoint for all roles
router.get("/dashboard", Authenticate, (req, res) => {
  res.status(201).send(req.userData.getPublicProfile())
})

// Unified profile update endpoint for all roles
router.post("/update", Authenticate, async (req, res) => {
  try {
    const _id = req.userData._id
    const { name, email, Class, school, mobile, state, city } = req.body
    
    // Basic validation for all roles
    if (!name || !email) {
      return res.status(422).json({ Error: "Name and email are required" })
    }
    
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid user ID" })
    }
    
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid email format" })
    }
    
    // Role-based field validation and update
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).json({ Error: "User not found" })
    }
    
    let updateFields = { name, email }
    
    // Add role-specific fields based on user role
    if (user.role === "USER") {
      // Students can update all fields
      if (Class && Class >= 1 && Class <= 12) {
        updateFields.Class = Class
      }
      if (school) updateFields.school = school
      if (mobile) updateFields.mobile = mobile
      if (state) updateFields.state = state
      if (city) updateFields.city = city
    } else if (user.role === "ADMIN" || user.role === "FRANCHISE" || user.role === "SCHOOL" || user.role === "SUPER_ADMIN") {
      // Admin, Franchise, School, SuperAdmin can update mobile, state, city
      if (mobile) updateFields.mobile = mobile
      if (state) updateFields.state = state
      if (city) updateFields.city = city
    }
    
    await User.findByIdAndUpdate(_id, updateFields, { new: true, runValidators: true })
    
    res.status(201).json({ 
      message: `${user.role} profile updated successfully!`,
      updatedFields: Object.keys(updateFields)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating profile" })
  }
})

// Unified image upload endpoint for all roles
router.post("/image", Authenticate, upload.single("testImage"), async (req, res) => {
  try {
    const _id = req.userData._id
    const user = await User.findById(_id)
    
    if (!user) {
      return res.status(404).json({ Error: "User not found" })
    }
    
    if (!req.file) {
      return res.status(400).json({ Error: "No image file provided" })
    }
    
    // Validate file type
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ Error: "File must be an image" })
    }
    
    // Validate file size (already handled by multer, but double-check)
    if (req.file.size > 500 * 1024) {
      return res.status(400).json({ Error: "File size must be less than 500KB" })
    }
    
    // Update user image
    user.img.data = req.file.buffer
    user.img.contentType = req.file.mimetype
    await user.save()
    
    console.log(`Image uploaded successfully for user: ${user.name} (${user.role})`)
    res.status(200).json({ message: "Image uploaded successfully" })
  } catch (err) {
    console.log("Error uploading image:", err)
    res.status(500).json({ error: "Error uploading image" })
  }
})

// Unified image retrieval endpoint for all roles
router.get("/image/:id", Authenticate, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ Error: "Invalid ID" })
    }
    
    const id = new mongoose.Types.ObjectId(req.params.id)
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({ Error: "User not found" })
    }
    
    if (!user.img || !user.img.data) {
      return res.status(404).json({ Error: "Image not found" })
    }
    
    // Set proper headers for image response
    res.set({
      "Content-Type": user.img.contentType,
      "Content-Length": user.img.data.length,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    })
    res.status(200).send(user.img.data)
  } catch (err) {
    console.log("Error retrieving image:", err)
    res.status(500).json({ error: "Error retrieving image" })
  }
})

// Unified student CRUD endpoints for all roles
router.get("/students", Authenticate, async (req, res) => {
  try {
    console.log("Student request from role:", req.userData.role, "User:", req.userData.name)
    
    let query = { role: roles.user }
    console.log("Base query for students:", query, "roles.user value:", roles.user)
    
    // Role-based filtering
    if (req.userData.role === "SCHOOL") {
      // School can only see students from their school
      query.school = { $regex: new RegExp(`^${req.userData.name}$`, 'i') }
      console.log("School filter - looking for students with school:", req.userData.name)
    } else if (req.userData.role === "FRANCHISE") {
      // Franchise can see students from their cities
      console.log("Franchise user city data:", req.userData.city, "Type:", typeof req.userData.city)
      const cityArr = req.userData.city.toString().split("-")
      query.city = { $in: [...cityArr] }
      console.log("Franchise filter - looking for students in cities:", cityArr)
      console.log("Franchise query:", query)
      
      // Additional debugging: Check if there are any students in the database
      const allStudents = await User.find({ role: roles.user })
      console.log("Total students in database:", allStudents.length)
      if (allStudents.length > 0) {
        console.log("Sample student cities in DB:", allStudents.slice(0, 5).map(s => ({ name: s.name, city: s.city })))
        console.log("Cities that franchise is looking for:", cityArr)
        
        // Check if any students match the franchise cities
        const matchingStudents = allStudents.filter(student => 
          cityArr.includes(student.city)
        )
        console.log("Students matching franchise cities:", matchingStudents.length)
        if (matchingStudents.length > 0) {
          console.log("Matching students:", matchingStudents.map(s => ({ name: s.name, city: s.city })))
        }
      }
    } else if (req.userData.role === "ADMIN") {
      // Admin can see all students (no additional filtering)
      console.log("Admin - showing all students")
    } else if (req.userData.role === "SUPER_ADMIN") {
      // SuperAdmin can see all students (no additional filtering)
      console.log("SuperAdmin - showing all students")
    }
    
    console.log("Final query:", query)
    const students = await User.find(query)
    console.log("Found students:", students.length)
    
    // Additional debugging for franchise users
    if (req.userData.role === "FRANCHISE") {
      console.log("Franchise debugging - Query executed:", JSON.stringify(query))
      console.log("Franchise debugging - Students found:", students.length)
      if (students.length > 0) {
        console.log("Franchise debugging - Sample found students:", students.slice(0, 3).map(s => ({ name: s.name, city: s.city })))
      }
    }
    
    // Debug: Show sample student data
    if (students.length > 0) {
      console.log("Sample student data:", {
        name: students[0].name,
        school: students[0].school,
        city: students[0].city,
        role: students[0].role
      })
    } else {
      // If no students found, let's see what students exist in the database
      const allStudents = await User.find({ role: roles.user })
      console.log("Total students in DB:", allStudents.length)
      if (allStudents.length > 0) {
        console.log("Sample student cities:", allStudents.slice(0, 3).map(s => ({ name: s.name, city: s.city })))
      }
    }
    
    if (students.length === 0) return res.status(204).send()
    
    const studentsData = students.map((userData) => {
      const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = userData
      return { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    })
    
    res.status(200).send(studentsData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching students" })
  }
})

// Get single student by ID
router.get("/students/:id", Authenticate, async (req, res) => {
  try {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ Error: "Invalid Student ID" })
    }
    
    const student = await User.findById(id)
    if (!student) {
      return res.status(404).json({ Error: "Student not found" })
    }
    
    // Check if user has permission to view this student
    if (req.userData.role === "SCHOOL") {
      // School can only see students from their school
      if (!student.school || !student.school.match(new RegExp(`^${req.userData.name}$`, 'i'))) {
        return res.status(403).json({ Error: "You can only view students from your school" })
      }
    } else if (req.userData.role === "FRANCHISE") {
      // Franchise can only see students from their cities
      const cityArr = req.userData.city.toString().split("-")
      if (!cityArr.includes(student.city)) {
        return res.status(403).json({ Error: "You can only view students from your cities" })
      }
    }
    // SuperAdmin and Admin can view any student
    
    const { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img } = student
    const studentData = { tests, _id, name, gender, Class, email, school, mobile, state, city, role, img }
    
    res.status(200).json(studentData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error retrieving student" })
  }
})

router.post("/students", Authenticate, async (req, res) => {
  try {
    const { name, gender, Class, email, school, mobile, state, city, password, cpassword } = req.body
    
    if (!name || !gender || !Class || !email || !school || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    
    if (password !== cpassword) {
      return res.status(422).json({ Error: "Confirm password donot match" })
    }
    
    // Franchise-specific validation: can only create students in their cities
    if (req.userData.role === "FRANCHISE") {
      const franchiseCities = req.userData.city.toString().split("-")
      if (!franchiseCities.includes(city)) {
        return res.status(403).json({ 
          Error: `You can only create students in your assigned cities: ${franchiseCities.join(", ")}` 
        })
      }
      console.log("Franchise validation passed - student city:", city, "franchise cities:", franchiseCities)
    }
    
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({ Error: "Email Already Exist" })
    }
    
    const user = new User({ name, gender, Class, email, password, cpassword, school, mobile, state, city })
    const userRegister = await user.save()
    
    if (userRegister) {
      res.status(201).json({ message: "Student Details added successfully!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving student" })
  }
})

router.post("/students/update", Authenticate, async (req, res) => {
  try {
    const { _id, name, Class, email, school, mobile, state, city } = req.body
    
    if (!_id || !name || !Class || !email || !school || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    
    const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'UG', 'PG'];
    if (!validClasses.includes(String(Class))) {
      return res.status(422).json({ Error: "Invalid Class, Class must be 1-12, UG, or PG" })
    }
    
    if (!validator.isEmail(email)) {
      return res.status(422).json({ Error: "Invalid Email, Please Provide a valid Email" })
    }
    
    // Check if user has permission to update this student
    const student = await User.findById(_id)
    if (!student) {
      return res.status(404).json({ Error: "Student not found" })
    }
    
    // Role-based permission check
    if (req.userData.role === "SCHOOL") {
      // School can only update students from their school
      if (!student.school || !student.school.match(new RegExp(`^${req.userData.name}$`, 'i'))) {
        return res.status(403).json({ Error: "You can only update students from your school" })
      }
    } else if (req.userData.role === "FRANCHISE") {
      // Franchise can only update students from their cities
      const cityArr = req.userData.city.toString().split("-")
      if (!cityArr.includes(student.city)) {
        return res.status(403).json({ Error: "You can only update students from your cities" })
      }
      
      // Also validate that the new city is within franchise's assigned cities
      if (!cityArr.includes(city)) {
        return res.status(403).json({ 
          Error: `You can only update students to cities within your assigned cities: ${cityArr.join(", ")}` 
        })
      }
      console.log("Franchise update validation passed - new city:", city, "franchise cities:", cityArr)
    }
    // SuperAdmin and Admin can update any student
    
    await User.findByIdAndUpdate(_id, { name, Class, email, school, mobile, state, city }, { new: true, runValidators: true })
    res.status(201).json({ message: "Student Details Updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating student" })
  }
})

router.delete("/students", Authenticate, async (req, res) => {
  try {
    const { _id } = req.body
    
    if (!_id) return res.status(422).json({ Error: "Please Provide all the Fields" })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(422).json({ Error: "Invalid Id Provided" })
    
    const student = await User.findById(_id)
    if (!student) {
      return res.status(404).json({ Error: "Student not found" })
    }
    
    // Role-based permission check
    if (req.userData.role === "SCHOOL") {
      // School can only delete students from their school
      if (!student.school || !student.school.match(new RegExp(`^${req.userData.name}$`, 'i'))) {
        return res.status(403).json({ Error: "You can only delete students from your school" })
      }
    } else if (req.userData.role === "FRANCHISE") {
      // Franchise can only delete students from their cities
      const cityArr = req.userData.city.toString().split("-")
      if (!cityArr.includes(student.city)) {
        return res.status(403).json({ Error: "You can only delete students from your cities" })
      }
    }
    // SuperAdmin and Admin can delete any student
    
    await User.findByIdAndDelete(_id)
    res.status(201).json({ message: "Student Deleted Successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error deleting student" })
  }
})

router.post("/students/search", Authenticate, async (req, res) => {
  try {
    let query = { role: roles.user }
    
    // Role-based filtering
    if (req.userData.role === "SCHOOL") {
      query.school = { $regex: new RegExp(`^${req.userData.name}$`, 'i') }
    } else if (req.userData.role === "FRANCHISE") {
      const cityArr = req.userData.city.toString().split("-")
      query.city = { $in: [...cityArr] }
      console.log("Franchise search filter - looking for students in cities:", cityArr)
    }
    
    // Add class filter if provided
    if (req.body.Class) query.Class = req.body.Class
    
    let users = []
    if (req.body.searchKey !== "") {
      users = await User.find({
        $and: [
          query,
          { $or: [{ name: { $regex: req.body.searchKey, $options: "i" } }, { email: { $regex: req.body.searchKey, $options: "i" } }] },
        ],
      })
    } else {
      users = await User.find(query)
    }
    
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error searching students" })
  }
})

// Unified school CRUD endpoints for all roles
router.get("/schools", Authenticate, async (req, res) => {
  try {
    console.log("School request from role:", req.userData.role, "User:", req.userData.name)
    
    let query = { role: "SCHOOL" }
    
    // Role-based filtering
    if (req.userData.role === "FRANCHISE") {
      // Franchise can see schools from their cities
      const cityArr = req.userData.city.toString().split("-")
      query.city = { $in: [...cityArr] }
      console.log("Franchise filter - looking for schools in cities:", cityArr)
    }
    // SuperAdmin and Admin can see all schools
    
    const schools = await User.find(query)
    console.log(`Found ${schools.length} schools for role ${req.userData.role}`)
    
    const schoolsData = schools.map((schoolData) => {
      const { _id, name, gender, email, mobile, state, city, img } = schoolData
      return { _id, name, gender, email, mobile, state, city, img }
    })
    
    res.status(200).send(schoolsData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching schools" })
  }
})

router.post("/schools", Authenticate, async (req, res) => {
  try {
    const { name, gender, email, mobile, state, city, password, cpassword } = req.body
    
    // Debug: Log the received data
    console.log("Received school data:", req.body)
    console.log("Field validation:", {
      name: !!name, gender: !!gender, email: !!email, mobile: !!mobile, 
      state: !!state, city: !!city, password: !!password, cpassword: !!cpassword
    })
    
    if (!name || !gender || !email || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    
    if (password !== cpassword) {
      return res.status(422).json({ Error: "Confirm password donot match" })
    }
    
    // Franchise-specific validation: can only create schools in their cities
    if (req.userData.role === "FRANCHISE") {
      const franchiseCities = req.userData.city.toString().split("-")
      if (!franchiseCities.includes(city)) {
        return res.status(403).json({ 
          Error: `You can only create schools in your assigned cities: ${franchiseCities.join(", ")}` 
        })
      }
      console.log("Franchise validation passed - school city:", city, "franchise cities:", franchiseCities)
    }
    
    // Check if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(422).json({ Error: "User already exist with that email" })
    }
    
    const user = new User({ 
      name, 
      gender, 
      email, 
      password, 
      cpassword, 
      mobile, 
      state, 
      city,
      role: "SCHOOL"
    })
    const userRegister = await user.save()
    
    if (userRegister) {
      res.status(201).json({ message: "School Details added successfully!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error adding school" })
  }
})

router.post("/schools/update", Authenticate, async (req, res) => {
  try {
    const { _id, name, gender, email, mobile, state, city } = req.body
    
    if (!_id || !name || !email || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    
    const school = await User.findById(_id)
    if (!school) {
      return res.status(404).json({ Error: "School not found" })
    }
    
    if (school.role !== "SCHOOL") {
      return res.status(400).json({ Error: "User is not a school" })
    }
    
    // Role-based permission check
    if (req.userData.role === "FRANCHISE") {
      // Franchise can only update schools from their cities
      const cityArr = req.userData.city.toString().split("-")
      if (!cityArr.includes(school.city)) {
        return res.status(403).json({ Error: "You can only update schools from your cities" })
      }
      
      // Also validate that the new city is within franchise's assigned cities
      if (!cityArr.includes(city)) {
        return res.status(403).json({ 
          Error: `You can only update schools to cities within your assigned cities: ${cityArr.join(", ")}` 
        })
      }
      console.log("Franchise update validation passed - new city:", city, "franchise cities:", cityArr)
    }
    // SuperAdmin and Admin can update any school
    
    await User.findByIdAndUpdate(_id, { name, gender, email, mobile, state, city }, { new: true, runValidators: true })
    res.status(201).json({ message: "School Details Updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating school" })
  }
})

router.delete("/schools", Authenticate, async (req, res) => {
  try {
    const { _id } = req.body
    
    if (!_id) {
      return res.status(422).json({ Error: "Please Provide Id" })
    }
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    
    const school = await User.findById(_id)
    if (!school) {
      return res.status(404).json({ Error: "School not found" })
    }
    
    if (school.role !== "SCHOOL") {
      return res.status(400).json({ Error: "User is not a school" })
    }
    
    // Role-based permission check
    if (req.userData.role === "FRANCHISE") {
      // Franchise can only delete schools from their cities
      const cityArr = req.userData.city.toString().split("-")
      if (!cityArr.includes(school.city)) {
        return res.status(403).json({ Error: "You can only delete schools from your cities" })
      }
    }
    // SuperAdmin and Admin can delete any school
    
    await User.findByIdAndDelete(_id)
    res.status(201).json({ message: "School Details Deleted successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error deleting school" })
  }
})

// Unified franchise CRUD endpoints for all roles
router.get("/franchises", Authenticate, async (req, res) => {
  try {
    console.log("Franchise request from role:", req.userData.role, "User:", req.userData.name)
    
    let query = { role: "FRANCHISE" }
    
    // Role-based filtering
    if (req.userData.role === "FRANCHISE") {
      // Franchise can only see their own data
      query._id = req.userData._id
      console.log("Franchise filter - showing own data only")
    }
    // SuperAdmin and Admin can see all franchises
    
    const franchises = await User.find(query)
    console.log(`Found ${franchises.length} franchises for role ${req.userData.role}`)
    
    const franchisesData = franchises.map((franchiseData) => {
      const { _id, name, gender, email, mobile, state, city, img } = franchiseData
      return { _id, name, gender, email, mobile, state, city, img }
    })
    
    res.status(200).send(franchisesData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching franchises" })
  }
})

router.post("/franchises", Authenticate, async (req, res) => {
  try {
    const { name, gender, email, mobile, state, city, password, cpassword } = req.body
    
    // Debug: Log the received data
    console.log("Received franchise data:", req.body)
    console.log("Field validation:", {
      name: !!name, gender: !!gender, email: !!email, mobile: !!mobile, 
      state: !!state, city: !!city, password: !!password, cpassword: !!cpassword
    })
    
    if (!name || !gender || !email || !mobile || !state || !city || !password || !cpassword) {
      return res.status(422).json({ Error: "Please Fill all the Fields" })
    }
    
    if (password !== cpassword) {
      return res.status(422).json({ Error: "Confirm password donot match" })
    }
    
    // Check if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(422).json({ Error: "User already exist with that email" })
    }
    
    const user = new User({ 
      name, 
      gender, 
      email, 
      password, 
      cpassword, 
      mobile, 
      state, 
      city,
      role: "FRANCHISE"
    })
    const userRegister = await user.save()
    
    if (userRegister) {
      res.status(201).json({ message: "Franchise Details added successfully!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error adding franchise" })
  }
})

router.post("/franchises/update", Authenticate, async (req, res) => {
  try {
    const { _id, name, gender, email, mobile, state, city } = req.body
    
    if (!_id || !name || !email || !mobile || !state || !city) {
      return res.status(422).json({ Error: "Please Provide all the Fields" })
    }
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    
    const franchise = await User.findById(_id)
    if (!franchise) {
      return res.status(404).json({ Error: "Franchise not found" })
    }
    
    if (franchise.role !== "FRANCHISE") {
      return res.status(400).json({ Error: "User is not a franchise" })
    }
    
    // Role-based permission check
    if (req.userData.role === "FRANCHISE") {
      // Franchise can only update their own data
      if (franchise._id.toString() !== req.userData._id.toString()) {
        return res.status(403).json({ Error: "You can only update your own franchise data" })
      }
    }
    // SuperAdmin and Admin can update any franchise
    
    await User.findByIdAndUpdate(_id, { name, gender, email, mobile, state, city }, { new: true, runValidators: true })
    res.status(201).json({ message: "Franchise Details Updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating franchise" })
  }
})

router.delete("/franchises", Authenticate, async (req, res) => {
  try {
    const { _id } = req.body
    
    if (!_id) {
      return res.status(422).json({ Error: "Please Provide Id" })
    }
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(422).json({ Error: "Invalid Id Provided" })
    }
    
    const franchise = await User.findById(_id)
    if (!franchise) {
      return res.status(404).json({ Error: "Franchise not found" })
    }
    
    if (franchise.role !== "FRANCHISE") {
      return res.status(400).json({ Error: "User is not a franchise" })
    }
    
    // Role-based permission check
    if (req.userData.role === "FRANCHISE") {
      // Franchise can only delete their own data
      if (franchise._id.toString() !== req.userData._id.toString()) {
        return res.status(403).json({ Error: "You can only delete your own franchise data" })
      }
    }
    // SuperAdmin and Admin can delete any franchise
    
    await User.findByIdAndDelete(_id)
    res.status(201).json({ message: "Franchise Details Deleted successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error deleting franchise" })
  }
})

module.exports = router
