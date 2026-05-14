import { useState } from 'react'
import { Search, X, Loader } from 'lucide-react'
import type { MapboxSuggestion } from '@/types/mapbox'

// Định nghĩa interface cho Props
interface SearchLocationProps {
  searchQuery: string
  onSearch: (query: string) => void
  suggestions?: MapboxSuggestion[]
  loading?: boolean
  error?: string | null
  onSelectSuggestion?: (suggestion: MapboxSuggestion) => void
}

// Khai báo component dạng function truyền thống, định nghĩa type trực tiếp cho props
export default function SearchLocation({
  searchQuery,
  onSearch,
  suggestions = [],
  loading = false,
  error = null,
  onSelectSuggestion,
}: Readonly<SearchLocationProps>) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleClear = () => {
    onSearch('')
    setShowSuggestions(false)
  }

  const handleSelectSuggestion = (suggestion: MapboxSuggestion) => {
    onSelectSuggestion?.(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="pointer-events-auto w-full max-w-md">
      <div className="group relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
        {/* Icon Search - Sử dụng Lucide */}
        <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          {loading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Search size={18} strokeWidth={2.5} />
          )}
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Tìm kiếm địa điểm..."
          value={searchQuery}
          onChange={(e) => {
            onSearch(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 py-3.5 pr-2 outline-none text-sm text-slate-700 placeholder-slate-400 bg-transparent"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all active:scale-95"
            aria-label="Xóa tìm kiếm"
          >
            <X size={16} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (searchQuery.trim() || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden z-50">
          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-sm text-slate-500 flex items-center gap-2">
              <Loader size={16} className="animate-spin" />
              Đang tìm kiếm...
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          {/* Suggestions List */}
          {suggestions.length > 0 && !loading && (
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li key={suggestion.mapbox_id}>
                  <button
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {/* Location Icon */}
                      <div className="mt-1 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 truncate">
                          {suggestion.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {suggestion.place_formatted}
                        </div>
                        {suggestion.full_address && (
                          <div className="text-xs text-slate-400 truncate mt-0.5">
                            {suggestion.full_address}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* No Results State */}
          {!loading &&
            !error &&
            suggestions.length === 0 &&
            searchQuery.trim() && (
              <div className="px-4 py-3 text-sm text-slate-500">
                Không tìm thấy địa điểm nào
              </div>
            )}
        </div>
      )}

      {/* Backdrop to close suggestions */}
      {showSuggestions && (
        <button
          type="button"
          className="fixed inset-0 -z-10 cursor-default"
          onClick={() => setShowSuggestions(false)}
          aria-label="Close suggestions"
        />
      )}
    </div>
  )
}
