// src/types/mapbox.ts

export interface MapboxSuggestion {
  name: string
  mapbox_id: string
  feature_type: string
  full_address?: string
  place_formatted: string
  context: Record<string, unknown>
  distance?: number
}

export interface MapboxRetrieveResponse {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    geometry: {
      coordinates: [number, number] // [longitude, latitude]
    }
    properties: MapboxSuggestion & {
      coordinates: { latitude: number; longitude: number }
    }
  }>
}

export interface MapboxSuggestResponse {
  suggestions: MapboxSuggestion[]
}
