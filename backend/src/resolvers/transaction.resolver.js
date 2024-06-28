import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {},
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      const newTransaction = new Transaction({
        ...input,
        userId: context.getUser()._id,
      });
      await newTransaction.save();
      return newTransaction;
    },
  },
};

export default transactionResolver;
