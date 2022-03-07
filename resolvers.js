const { UserInputError } = require("apollo-server");

function generateRandomSlug(num) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const length = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * length));
  }
  return result;
}

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
