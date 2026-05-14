// src/services/mapboxService.ts
import axios from 'axios'
import type { MapboxSuggestion, MapboxRetrieveResponse } from '@/types/mapbox'

const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1'
const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

interface SuggestResponse {
  suggestions: MapboxSuggestion[]
}

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const mapboxService = {
  // Tìm kiếm gợi ý (Billed per Session)
  suggest: async (
    q: string,
    sessionToken: string,
  ): Promise<SuggestResponse> => {
    const response = await client.get<SuggestResponse>('/suggest', {
      params: {
        q,
        session_token: sessionToken,
        access_token: ACCESS_TOKEN,
        language: 'vi',
        limit: '10',
      },
    })

    return response.data
  },

  // Lấy tọa độ chi tiết (Ends a Session)
  retrieve: async (
    id: string,
    sessionToken: string,
  ): Promise<MapboxRetrieveResponse> => {
    const response = await client.get<MapboxRetrieveResponse>(
      `/retrieve/${id}`,
      {
        params: {
          session_token: sessionToken,
          access_token: ACCESS_TOKEN,
        },
      },
    )

    return response.data
  },
}
