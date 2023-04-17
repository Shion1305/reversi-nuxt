import { User } from '~/types/user'

// ユーザーのログイン状態管理、基本データ管理を行う
export const useLogin = () => {
  const currentUser = ref<User | null>(null)
  const signIn = async (username: string) => {
    currentUser.value = {
      username,
      profile_icon_url: '',
      line_service_id: ''
    }
  }
  const signOut = () => {
    currentUser.value = null
  }
  const isSignedIn = () => currentUser.value != null
  return { signIn, signOut, isSignedIn }
}
