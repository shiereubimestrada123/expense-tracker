import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    user: async (_, { userId }, { req, res }) => {
      try {
        return users.find((user) => user._id === userId);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (username.length < 3) {
          throw new Error("Username must be at least 3 characters long");
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
        return newUser;

        // if (users.some((user) => user.username === username)) {
        //   throw new Error("Username already taken");
        // }

        // const newUser = {
        //   _id: String(users.length + 1),
        //   username,
        //   name,
        //   password,
        //   gender,
        // };
        // users.push(newUser);

        // return newUser;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
  },
};

export default userResolver;
