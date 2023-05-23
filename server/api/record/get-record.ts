import admin from '~/server/firebase-admin'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const results = await db
    .collection('results')
    .where('users', 'array-contains', event.context.userID)
    .get()
    .then((snapshot) => {
      const results: any[] = []
      snapshot.forEach((doc) => {
        results.push(doc.data())
      })
      return {
        records: results
      }
    })
})
