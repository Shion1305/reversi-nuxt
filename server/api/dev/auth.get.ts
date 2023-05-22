import { AccessTokenResponse } from '~/types/response/line/accessTokenResponse'
import { UserProfileResponse } from '~/types/response/line/userProfileResponse'
import admin from '~/server/firebase-admin'
import { User } from '~/server/model/user'
import { generateToken } from '~/server/jwt'
import { H3Event } from 'h3'
import axios from 'axios'
import cookie from 'cookie'

const db = admin.firestore()

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const testUser = {
    userId: 'Uf0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b',
    displayName: 'testUser'
  }
  const userDoc = await db.collection('users').doc(testUser.userId).get()
  if (!userDoc.exists) {
    const user: User = {
      name: testUser.displayName,
      line_id: testUser.userId,
      in_game: false,
      game_id: ''
    }
    await db.collection('users').doc(testUser.userId).set(user)
  }
  const token = generateToken(testUser.userId)

  const serializedCookie = cookie.serialize('authToken', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax'
  })

  event.res.setHeader('set-cookie', serializedCookie)
  return sendRedirect(event, '/', 302)
})
