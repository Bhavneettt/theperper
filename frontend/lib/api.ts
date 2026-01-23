import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Articles
export const getArticles = async (params?: {
  page?: number
  limit?: number
  category?: string
  beat?: string
  contentType?: string
  featured?: boolean
}) => {
  const response = await api.get('/articles', { params })
  return response.data
}

export const getArticle = async (slug: string) => {
  const response = await api.get(`/articles/${slug}`)
  return response.data
}

export const getFeaturedArticles = async () => {
  const response = await api.get('/articles/featured/latest')
  return response.data
}

// Interviews
export const getInterviews = async (params?: {
  page?: number
  limit?: number
  category?: string
}) => {
  const response = await api.get('/interviews', { params })
  return response.data
}

export const getInterview = async (slug: string) => {
  const response = await api.get(`/interviews/${slug}`)
  return response.data
}

// Podcasts
export const getPodcasts = async (params?: {
  page?: number
  limit?: number
  category?: string
  featured?: boolean
}) => {
  const response = await api.get('/podcasts', { params })
  return response.data
}

export const getPodcast = async (slug: string) => {
  const response = await api.get(`/podcasts/${slug}`)
  return response.data
}

// Events
export const getEvents = async (params?: {
  page?: number
  limit?: number
  category?: string
  type?: string
  upcoming?: boolean
}) => {
  const response = await api.get('/events', { params })
  return response.data
}

export const getEvent = async (slug: string) => {
  const response = await api.get(`/events/${slug}`)
  return response.data
}

// Newsletter
export const subscribeNewsletter = async (email: string) => {
  const response = await api.post('/newsletter/subscribe', { email })
  return response.data
}

// Polls
export const getActivePoll = async () => {
  const response = await api.get('/polls/active')
  return response.data
}

export const votePoll = async (pollId: string, optionId: string) => {
  const response = await api.post(`/polls/${pollId}/vote`, { optionId })
  return response.data
}

// Search
export const search = async (query: string, type?: string) => {
  const response = await api.get('/search', {
    params: { q: query, type, limit: 10 },
  })
  return response.data
}

// Categories
export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

// Debates
export const getActiveDebate = async () => {
  const response = await api.get('/debates/active')
  return response.data
}

// Authors
export const getAuthor = async (id: string) => {
  const response = await api.get(`/authors/${id}`)
  return response.data
}

export const getAuthorArticles = async (id: string, params?: { page?: number; limit?: number }) => {
  const response = await api.get(`/authors/${id}/articles`, { params })
  return response.data
}

export const getAuthors = async () => {
  const response = await api.get('/authors')
  return response.data
}

export default api
