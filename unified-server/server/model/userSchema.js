const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const { roles } = require("../utils/constants")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true, default: "NA" },
  Class: {
    type: String,
    required: true,
    default: "9",
    validate(value) {
      const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'UG', 'PG'];
      if (!validClasses.includes(value)) {
        throw new Error("Class must be from 1 to 12, UG, or PG")
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid")
      }
    },
  },
  password: { type: String, required: true, trim: true, minlength: 7 },
  cpassword: { type: String, required: true, trim: true, minlength: 7 },
  school: { type: String, trim: true, required: true, default: "NA" },
  mobile: { type: String, trim: true, required: true },
  state: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  role: {
    type: String,
    enum: [
      roles.superAdmin,
      roles.admin,
      roles.user,
      roles.franchise,
      roles.school,
    ],
    default: roles.user,
  },
  tests: {
    test1: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Realistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Investigative: {
          type: Number,
          required: false,
          default: 0,
        },
        Artistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Social: {
          type: Number,
          required: false,
          default: 0,
        },
        Enterprising: {
          type: Number,
          required: false,
          default: 0,
        },
        Conventional: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test2: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        E: {
          type: Number,
          required: false,
          default: 0,
        },
        I: {
          type: Number,
          required: false,
          default: 0,
        },
        S: {
          type: Number,
          required: false,
          default: 0,
        },
        N: {
          type: Number,
          required: false,
          default: 0,
        },
        T: {
          type: Number,
          required: false,
          default: 0,
        },
        F: {
          type: Number,
          required: false,
          default: 0,
        },
        J: {
          type: Number,
          required: false,
          default: 0,
        },
        P: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test3: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Linguistics: {
          type: Number,
          required: false,
          default: 0,
        },
        LogicalMathematical: {
          type: Number,
          required: false,
          default: 0,
        },
        Spatial: {
          type: Number,
          required: false,
          default: 0,
        },
        BodilyKinesthetic: {
          type: Number,
          required: false,
          default: 0,
        },
        Musical: {
          type: Number,
          required: false,
          default: 0,
        },
        Interpersonal: {
          type: Number,
          required: false,
          default: 0,
        },
        Intrapersonal: {
          type: Number,
          required: false,
          default: 0,
        },
        Nature: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test4: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Extroversion: {
          type: Number,
          required: false,
          default: 0,
        },
        Agreeableness: {
          type: Number,
          required: false,
          default: 0,
        },
        Conscientiousness: {
          type: Number,
          required: false,
          default: 0,
        },
        Neuroticism: {
          type: Number,
          required: false,
          default: 0,
        },
        OpennessToExperience: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test5: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Realistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Investigative: {
          type: Number,
          required: false,
          default: 0,
        },
        Artistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Social: {
          type: Number,
          required: false,
          default: 0,
        },
        Enterprising: {
          type: Number,
          required: false,
          default: 0,
        },
        Conventional: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test6: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Realistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Investigative: {
          type: Number,
          required: false,
          default: 0,
        },
        Artistic: {
          type: Number,
          required: false,
          default: 0,
        },
        Social: {
          type: Number,
          required: false,
          default: 0,
        },
        Enterprising: {
          type: Number,
          required: false,
          default: 0,
        },
        Conventional: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
    test7: {
      attempt: {
        type: Boolean,
        required: false,
        default: false,
      },
      traits: {
        Linguistics: {
          type: Number,
          required: false,
          default: 0,
        },
        LogicalMathematical: {
          type: Number,
          required: false,
          default: 0,
        },
        Spatial: {
          type: Number,
          required: false,
          default: 0,
        },
        BodilyKinesthetic: {
          type: Number,
          required: false,
          default: 0,
        },
        Musical: {
          type: Number,
          required: false,
          default: 0,
        },
        Interpersonal: {
          type: Number,
          required: false,
          default: 0,
        },
        Intrapersonal: {
          type: Number,
          required: false,
          default: 0,
        },
        Nature: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    },
  },
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
})

userSchema.methods.getPublicProfile = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.cpassword
  delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  } catch (error) {
    console.log(error)
  }
}

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = await bcrypt.hash(this.cpassword, 12)
    if (this.email === process.env.SUPER_ADMIN_EMAIL) {
      this.role = roles.superAdmin
    }
  }
  next()
})

const User = mongoose.model("USER", userSchema)
module.exports = User



