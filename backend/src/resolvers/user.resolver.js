import { users } from "../dummyData/data.js";
const userResolver = {
  Query: {
    users: async (_, args, context) => {
      try {
        // console.log("args", args);
        // console.log("context", context);
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default userResolver;
