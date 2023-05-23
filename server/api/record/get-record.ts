import admin from '~/server/firebase-admin'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  console.log(event.context.userID)
  const results: Result[] = await db
    .collection('results')
    .where('users', 'array-contains', event.context.userID)
    .get()
    .then((snapshot) => {
      console.log(snapshot.size)
      const results: any[] = []
      snapshot.forEach((doc) => {
        results.push(doc.data() as Result)
      })
      return results
    })
  const wins = results.filter((result) => {
    return result.winner === event.context.userID
  }).length
  const loses = results.filter((result) => {
    return result.winner !== event.context.userID
  }).length
  const draws = results.filter((result) => {
    return result.winner === 'draw'
  }).length
  // for (const result of results) {
  //   const blackUser = await db
  //     .collection('users')
  //     .where('userID', '==', result.black_user)
  //     .get()
  //   const whiteUser = await db
  //     .collection('users')
  //     .where('userID', '==', result.white_user)
  //     .get()
  //   result.black_user = blackUser.docs[0].data().name
  //   result.white_user = whiteUser.docs[0].data().name
  // }
  return {
    records: results,
    wins: wins,
    loses: loses,
    draws: draws
  }
})
