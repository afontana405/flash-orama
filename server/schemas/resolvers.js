const { User, Category, Card } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return await User.find().populate('cards');
      },
      user: async (parent, { username }) => {
        return await User.findOne({ username }).populate('cards');
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id }).populate('cards');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      cards: async (parent, { categoryName }) => {
        const category = await Category.findOne({ categoryName });
        return await Card.find({ category: category?._id }).populate('category');
      },
      categories: async () => {
        return await Category.find();
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addCard: async (parent, { front, back }, context) => {
        if (context.user) {
          const card = await Card.create({ front, back });
          await User.findByIdAndUpdate(context.user._id, { $push: { cards: card._id } });
          return card;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      addCategory: async (parent, { categoryName }) => {
        return await Category.create({ categoryName });
      },
    },
  };
  
  module.exports = resolvers;
  