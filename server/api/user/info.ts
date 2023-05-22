import admin from '~/server/firebase-admin'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const userID = event.context.userID
  if (!userID) {
    return sendError(event, new Error('not authorized'))
  }
  const user: string | null = await db
    .collection('users')
    .doc(event.context.userID)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such user!')
        return null
      } else {
        const user = doc.data()
        if (!user) {
          return null
        }
        return user.name
      }
    })
    .catch((err) => {
      console.log('Error getting user', err)
      return null
    })
  if (!user) {
    return sendError(event, new Error('not authorized'))
  }
  return {
    userID: event.context.userID,
    name: user
  }
})
