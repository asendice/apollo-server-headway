const { UserInputError } = require("apollo-server");
const { generateRandomSlug } = require("./helpers");

const resolvers = {
  Query: {
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    }
  },

  Mutation: {
    async createLink(root, { url, slug }, { models }) {
      const theSlug = slug ? slug : generateRandomSlug(4);
      const allLinks = await models.Link.findAll();
      const slugs = allLinks.map((link) => link.dataValues.slug);
      if (slugs.includes(theSlug)) {
        throw new UserInputError("Slug Name Already Exists");
      }
      return models.Link.create({
        url,
        slug: theSlug
      });
    }
  }
};

module.exports = resolvers;
