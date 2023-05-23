import admin from '~/server/firebase-admin'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const userID = event.context.userID
  if (!userID) {
    return createError({
      statusCode: 401,
      message: 'not authorized'
    })
  }
  const body = await readBody(event)
  const name = body.name
  if (!name) {
    return createError({
      statusCode: 400,
      message: 'invalid request, name is required...'
    })
  }
  await db.collection('users').doc(userID).update({
    name: name
  })
  return {
    statusCode: 200
  }
})
