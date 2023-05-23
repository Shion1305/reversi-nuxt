import { useLogin } from '~/composables/useLogin'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!useRuntimeConfig().public.enableRouting) return
  const { isSignedIn } = useLogin()
  const isSigned = await isSignedIn()
  console.log(isSigned)
  if (to.path.startsWith('/login')) {
    if (!isSigned) return
    return navigateTo('/')
  }
  if (!isSigned) return navigateTo('/login')
})
