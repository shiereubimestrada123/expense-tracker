import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");
      const userId = await context.getUser()._id;

      const transactions = await Transaction.find({ userId });
      return transactions;
    },
    transaction: async (_, { transactionId }, context) => {
      const transaction = await Transaction.findById(transactionId);

      if (!transaction) throw new Error("Transaction not found");

      return transaction;
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
      return {
        transaction: newTransaction,
        message: "Transaction created successfully",
      };
    },
    updateTransaction: async (_, { input }, context) => {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        input.transactionId,
        input,
        {
          new: true,
        }
      );

      return updatedTransaction;
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      const deletedTransaction = await Transaction.findByIdAndDelete(
        transactionId
      );

      if (!deletedTransaction) {
        throw new Error("Transaction not found");
      }

      return {
        transaction: deletedTransaction,
        message: "Transaction deleted successfully",
      };
    },
  },
};

export default transactionResolver;
