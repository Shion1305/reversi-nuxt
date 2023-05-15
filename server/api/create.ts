import authMiddleware from 'server/middleware/auth'

export default defineEventHandler((event) => {
  return {
    api: event.context.userID
  }
})
