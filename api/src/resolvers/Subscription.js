async function newLinkSubscribe(parent, args, context, info) {
  return await context.prisma.$subscribe
    .link({ mutation_in: ['CREATED'] })
    .node()
}

async function newVoteSubscribe(parent, args, context, info) {
  return await context.prisma.$subscribe
    .vote({ mutation_in: ['CREATED'] })
    .node()
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload
  }
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
}

module.exports = {
  newLink,
  newVote
}
