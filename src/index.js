const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    review: (parent, { id }, context) => {
      return context.prisma.review({ id });
    }
  },
  Mutation: {
    createUser: (parent, { email, name, fibauid }, context) => {
      return context.prisma.createUser({
        email,
        name,
        fibauid,
      })
    },
    createReview: (parent, { title, url, userId }, context) => {
      return context.prisma.createReview({
        title,
        url,
        author: { connect: { id: userId } },
      })
    }
  },
  Review: {
    author: ({ id }, args, context) => {
      return context.prisma.review({ id }).author()
    },
  },
  User: {
    reviews: ({ id }, args, context) => {
      return context.prisma.user({ id }).reviews()
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
