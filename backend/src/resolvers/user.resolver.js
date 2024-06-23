import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    // users: async (parent, args, context) => {
    //   try {
    //     return users;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    user: async (_, { userId }, { req, res }) => {
      try {
        return users.find((user) => user._id === userId);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default userResolver;
