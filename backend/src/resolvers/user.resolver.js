import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const userResolver = {
  Query: {
    user: async (_, { userId }) => {
      const user = await User.findById(userId);
      return user;
    },
  },

  Mutation: {
    signUp: async (_, { input }, context) => {
      const { username, name, password, gender } = input;

      if (!username || !name || !password || !gender) {
        throw new Error("All fields are required");
      }

      if (username.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        name,
        password: hashedPassword,
        gender,
      });

      await newUser.save();
      await context.login(newUser);

      return {
        user: newUser,
        message: "Sign up successful!",
      };
    },
  },
};

export default userResolver;
