const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, APP_SECRET } = require('../utils')

async function signup(root, args, context) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login(root, args, context) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No user found')
  }

  const correct = await bcrypt.compare(args.password, user.password)
  if (correct) {
    return { token: jwt.sign({ userId: user.id }, APP_SECRET), user }
  } else {
    throw new Error('Invalid password')
  }
}

async function post(root, args, context) {
  const userId = getUserId(context)
  return await context.prisma.createLink({
    ...args,
    postedBy: { connect: { id: userId } }
  })
}

async function vote(root, args, context) {
  const userId = getUserId(context)

  const userVoted = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  })

  if (userVoted) throw new Error('You have already voted')

  return await context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  })
}

module.exports = {
  signup,
  login,
  post,
  vote
}
