import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const userResolver = {
  Query: {
    user: async (_, { userId }) => {
      const user = await User.findById(userId);
      return user;
    },
    authUser: async (_, __, context) => {
      const user = await context.getUser();
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

    login: async (_, { input }, context) => {
      const { username, password } = input;
      if (!username || !password) throw new Error("All fields are required");

      const { user } = await context.authenticate("graphql-local", {
        username,
        password,
      });

      await context.login(user);
      return {
        user,
        message: "Login successful!",
      };
    },

    logout: async (_, __, context) => {
      await context.logout();
      context.req.session.destroy((err) => {
        if (err) throw err;
      });
      context.res.clearCookie("connect.sid");
      return {
        message: "Logout successful!",
      };
    },
  },
};

export default userResolver;
