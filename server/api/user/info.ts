export default defineEventHandler((event) => {
  return {
    api: event.context.userID
  }
})
