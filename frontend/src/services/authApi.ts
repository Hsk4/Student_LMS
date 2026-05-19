import type { AuthRole } from '@/types/components'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

if (import.meta.env.DEV) {
  console.log('[authApi] API base URL:', API_BASE_URL)
}

export interface LoginRequest {
  roleId: string
  password: string
}

export interface LoginUser {
  _id: string
  FullName: string
  Email: string
  role: AuthRole
  role_id: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: LoginUser
  }
}

async function parseError(response: Response) {
  const payload = await response.json().catch(() => null)
  return payload?.message || `Request failed with status ${response.status}`
}

export async function loginRequest(payload: LoginRequest): Promise<LoginResponse> {
  if (import.meta.env.DEV) {
    console.log('[authApi] sending login request', {
      url: `${API_BASE_URL}/auth/login`,
      roleId: payload.roleId,
    })
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role_id: payload.roleId, Password: payload.password }),
  })

  if (!response.ok) {
    const message = await parseError(response)

    if (import.meta.env.DEV) {
      console.error('[authApi] login request failed', {
        status: response.status,
        message,
      })
    }

    throw new Error(message)
  }

  if (import.meta.env.DEV) {
    console.log('[authApi] login request succeeded', {
      status: response.status,
    })
  }

  return response.json() as Promise<LoginResponse>
}
