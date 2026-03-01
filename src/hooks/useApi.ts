import { useCallback, useState } from 'react'
import api from '../services/api'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  const get = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(url)
      setData(res.data)
      return res.data
    } catch (e) {
      setError(e)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const post = useCallback(async (url: string, payload?: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post(url, payload)
      setData(res.data)
      return res.data
    } catch (e) {
      setError(e)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return { get, post, loading, error, data }
}
