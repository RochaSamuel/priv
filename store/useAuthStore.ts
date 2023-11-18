// Importing create function from the Zustand library
import { create } from 'zustand'

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void // a function to set the authentication status
  accessToken: string // an object that stores user information
  setAccessToken: (at: string) => void // a function to set user information
}

// create our store
export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false, // initial value of authenticated property
  accessToken: '', // initial value of user property
  setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
  setAccessToken: (at) => set((state) => ({ accessToken: at })), // function to set user information
}))