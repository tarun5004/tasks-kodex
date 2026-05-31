// src/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);


// Hash password before saving >>>>>> 
// ismodified() checks if the password field has been modified. If it hasn't, we skip hashing to avoid unnecessary work and potential issues with already hashed passwords.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return ;
    }

    // If the password has been modified (or it's a new user), we hash it before saving.
    this.password = await bcrypt.hash(this.password, 10);
});


// method to compare password 
// isPasswordMatch() is an instance method that compares a plain text password with the hashed password stored in the database. It uses bcrypt's compare function to perform this comparison and returns a boolean indicating whether the passwords match.
userSchema.methods.isPasswordCorrect = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}

// jwt token generation method
userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ 
    _id: this._id,
    email: this.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
  );
  return token;
}

const User = mongoose.model("User", userSchema);
export default User;
