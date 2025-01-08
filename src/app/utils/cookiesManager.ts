"use server"


import { cookies } from 'next/headers'

// Method 1: Clearing a Single Cookie
export async function clearAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
}