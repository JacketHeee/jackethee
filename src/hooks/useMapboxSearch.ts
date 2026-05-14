import { useCallback, useRef, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { mapboxService } from '@/services/mapbox.service'
import { useDebounce } from './useDebounce'
import type { MapboxSuggestion, MapboxRetrieveResponse } from '@/types/mapbox'

interface UseMapboxSearchReturn {
  query: string
  setQuery: (query: string) => void
  suggestions: MapboxSuggestion[]
  loading: boolean
  error: string | null
  selectedLocation: MapboxRetrieveResponse | null
  selectSuggestion: (suggestion: MapboxSuggestion) => Promise<void>
  clearSuggestions: () => void
}

export function useMapboxSearch(): UseMapboxSearchReturn {
  const sessionTokenRef = useRef<string>(uuidv4())
  const [queryValue, setQueryValue] = useState<string>('')
  const debouncedQuery = useDebounce(queryValue, 500) // Debounce 500ms

  // Query for suggestions - triggered by debounced query
  const {
    data: suggestData,
    isLoading: isSuggestLoading,
    error: suggestError,
  } = useQuery({
    queryKey: ['mapbox-suggestions', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) {
        return { suggestions: [] }
      }
      return mapboxService.suggest(debouncedQuery, sessionTokenRef.current)
    },
    enabled: debouncedQuery.length > 0,
    staleTime: 60000,
    retry: 1,
  })

  // Mutation for retrieve location
  const {
    data: retrieveData,
    isPending: isRetrievePending,
    error: retrieveError,
    mutateAsync: mutateRetrieve,
  } = useMutation({
    mutationFn: ({
      mapboxId,
      sessionToken,
    }: {
      mapboxId: string
      sessionToken: string
    }) => mapboxService.retrieve(mapboxId, sessionToken),
    onSuccess: () => {
      // Reset session token after successful retrieve
      sessionTokenRef.current = uuidv4()
    },
  })

  const handleSearch = useCallback((searchQuery: string) => {
    setQueryValue(searchQuery)
  }, [])

  const selectSuggestion = useCallback(
    async (suggestion: MapboxSuggestion) => {
      await mutateRetrieve({
        mapboxId: suggestion.mapbox_id,
        sessionToken: sessionTokenRef.current,
      })
      setQueryValue(suggestion.name)
    },
    [mutateRetrieve],
  )

  const clearSuggestions = useCallback(() => {
    setQueryValue('')
  }, [])

  const errorMessage =
    suggestError instanceof Error ? suggestError.message : null
  const retrieveErrorMessage =
    retrieveError instanceof Error ? retrieveError.message : null
  const finalError = errorMessage || retrieveErrorMessage

  return {
    query: queryValue,
    setQuery: handleSearch,
    suggestions: suggestData?.suggestions || [],
    loading: isSuggestLoading || isRetrievePending,
    error: finalError ? 'Lỗi khi tìm kiếm địa điểm' : null,
    selectedLocation: retrieveData || null,
    selectSuggestion,
    clearSuggestions,
  }
}
