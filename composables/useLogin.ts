import { User } from '~/types/user'
import axios from 'axios'

// ユーザーのログイン状態管理、基本データ管理を行う
export const useLogin = () => {
  const currentUser = ref<User | null>(null)
  const signIn = async (username: string) => {
    currentUser.value = {
      username
    }
  }
  const signOut = () => {
    currentUser.value = null
  }
  const isSignedIn = async () => {
    axios.get('/api/auth-check').then((res) => {
      return res.data.status === 200
    })
  }
  const getCurrentUser = async () => {
    if (currentUser.value == null) {
      await fetchUserInfo()
    }
    return currentUser.value
  }
  const fetchUserInfo = async () => {
    const { data: userInfo } = await axios.get('/api/user/info')
    currentUser.value = userInfo.value.username
    console.log(currentUser.value)
  }
  return { signIn, signOut, isSignedIn, getCurrentUser }
}
