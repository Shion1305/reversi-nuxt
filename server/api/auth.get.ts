import { AuthRequest } from '~/types/request/auth'
import { AccessTokenResponse } from '~/types/response/line/accessTokenResponse'
import { UserProfileResponse } from '~/types/response/line/userProfileResponse'
import admin from '~/server/firebase-admin'
import { User } from '~/types/user'
import { generateToken, verifyToken } from '~/server/jwt'
import { H3Event } from 'h3'
import axios from 'axios'
import cookie from 'cookie'

const db = admin.firestore()

async function getAccessToken(
  code: string
): Promise<AccessTokenResponse | any> {
  const config = useRuntimeConfig()
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: config.line.callbackURI,
    client_id: config.line.clientID,
    client_secret: config.line.clientSecret
  })
  // const response = await
  return axios.post(url, body, { headers: headers }).then((response) => {
    console.log(response.data)
    return response.data as AccessTokenResponse
  })
}

async function getLineUserInfo(token: string): Promise<UserProfileResponse> {
  const url: string = 'https://api.line.me/v2/profile'
  const response = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return response.data as UserProfileResponse
}

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  // Pass in the event object so we can parse out the body
  const code: string = getQuery(event).code as string
  console.log(code)
  // アクセストークンをLineから取得
  const tokenInfo: AccessTokenResponse = await getAccessToken(code)
  console.log('tokenInfo: ', tokenInfo)
  const profileInfo: UserProfileResponse = await getLineUserInfo(
    tokenInfo.access_token
  )
  console.log(profileInfo.userId)

  const userDoc = await db.collection('users').doc(profileInfo.userId).get()
  if (!userDoc.exists) {
    const user: User = {
      username: profileInfo.displayName,
      line_service_id: profileInfo.userId
    }
    await db.collection('users').doc(profileInfo.userId).set(user)
  }
  const token = generateToken(profileInfo.userId)

  const serializedCookie = cookie.serialize('authToken', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax'
  })

  event.res.setHeader('set-cookie', serializedCookie)
  return sendRedirect(event, '/', 302)
})
