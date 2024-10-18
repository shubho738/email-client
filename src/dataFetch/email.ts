
import { type EmailListResponse, type EmailBodyResponse } from "../types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL  || ''


export const fetchEmailList = async (): Promise<EmailListResponse> => {

    const res = await fetch(`${API_BASE_URL}`)

    if (!res.ok) {
      throw new Error(`Error fetching emails: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
} 


export const fetchEmailBody = async (id: string): Promise<EmailBodyResponse> => {

    const res = await fetch(`${API_BASE_URL}?id=${id}`)

    if (!res.ok) {
      throw new Error(`Error fetching email: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
} 