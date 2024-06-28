import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");
      const userId = await context.getUser()._id;

      const transactions = await Transaction.find({ userId });
      return transactions;
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      const { description, paymentType, category, amount, date } = input;

      if (!description || !paymentType || !category || !amount || !date) {
        throw new Error("All fields are required");
      }

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
