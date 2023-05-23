import admin from '~/server/firebase-admin'
import { User } from '~/server/model/user'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const q = await getQuery(event)
  if (!q) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }
  if (!q.targetUser) {
    return createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  return db
    .collection('users')
    .doc(q.targetUser as string)
    .get()
    .then((doc) => {
      const user = doc.data() as User
      if (!doc.exists || !doc) {
        return createError({
          statusCode: 404,
          statusMessage: 'Not Found'
        })
      }
      return {
        name: user.name
      }
    })
    .catch((err) => {
      console.log('Error getting user', err)
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error'
      })
    })
})
