const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('../generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')

const resolvers = {
    Query,
    Mutation,
    Link,
    User
}

// const resolvers = {
//     Query: {
//         info: () => `This is the API of a Hackernews Clone`,

//         feed: (root, args, context, info) => {
//             return context.prisma.links()
//         }
//     },

//     Mutation: {
//         post: (root, args, context) => {
//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description
//             })
//         },

//         updateLink: (parent, args) => {
//             let updatedLink = null

//             links = links.map(link => {
//                 if (link.id === args.id) {
//                     updatedLink = link
//                     if (args.description) updatedLink.description = args.description
//                     if (args.url) updatedLink.url = args.url

//                     return updatedLink
//                 } else {
//                     return link
//                 }
//             })

//             return updatedLink
//         },

//         deleteLink: (parent, args) => {
//             let deletedLink = null

//             links = links.filter(link => {
//                 if (!(link.id === args.id)) {
//                     return true
//                 } else {
//                     deletedLink = link
//                     return false
//                 }
//             })

//             return deletedLink
//         }
//     },

//     Link: {
//         id: (parent) => parent.id,
//         description: (parent) => parent.description,
//         url: (parent) => parent.url
//     }
// }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
        prisma
    })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
