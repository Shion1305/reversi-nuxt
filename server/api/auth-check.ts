export default defineEventHandler((event) => {
  if (event.context.userID) {
    return {
      userID: event.context.userID
    }
  }
  return createError({
    statusCode: 401,
    statusMessage: 'Unauthorized'
  })
})