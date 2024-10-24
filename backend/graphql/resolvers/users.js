const User = require("../../models/User");
const { ApolloError } = require("apollo-server"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { username, email, tel, password, id_no } }
    ) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });

      // Throw error if user exists
      if (existingUser) {
        throw new ApolloError(
          "A user with email " + email + " already exists",
          "USER_EXISTS"
        );
      }

      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Build user model
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        tel: tel,
        id_no: id_no,
        password: hashedPassword,
        role: "user", // Default role is user
      });

      // Create JWT object
      const token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      // Add token to new user
      newUser.token = token;

      // Save user
      const result = await newUser.save();

      // Return user with token
      return {
        id: result._id,
        ...result._doc,
        password: undefined, // Ensure password is not returned
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      // Check if email and password are provided
      if (!email) {
        throw new ApolloError("Email must be provided", "EMAIL_NOT_PROVIDED");
      }

      if (!password) {
        throw new ApolloError("Password must be provided", "PASSWORD_NOT_PROVIDED");
      }

      // Check if user exists
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create JWT object
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
        // Add the token to the user object
        user.token = token;

        // Return user with token
        return {
          id: user._id,
          ...user._doc,
          password: undefined, // Ensure password is not returned
        };
      } else {
        // Throw error if user does not exist or password is incorrect
        throw new ApolloError("Invalid email or password", "INVALID_CREDENTIALS");
      }
    }
  },
  Query: {
    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }
      return user;
    },
    
    users: async () => {
      return await User.find(); // Ensure this is a new query each time
    },
  },
};
