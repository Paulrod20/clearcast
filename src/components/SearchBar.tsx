import { useState, useEffect, useRef } from "react"
import type { GeoLocation } from "../types/types"
import { fetchGeoSuggestions } from "../helpers/weatherHelper"

type SearchBarProps = {
    onSelect: (location: GeoLocation) => void
}

export default function SearchBar(props: SearchBarProps) {
    const { onSelect } = props

    const [query, setQuery] = useState<string>("")
    const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const selectedRef = useRef<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
    
        if (value.trim().length < 2) {
            setSuggestions([])
        }
    }

    useEffect(() => {
        if (selectedRef.current) { 
            selectedRef.current = false
            return
        }

        if (debounceRef.current) clearTimeout(debounceRef.current)
    
        if (query.trim().length < 2) return
    
        debounceRef.current = setTimeout(async () => {
            setLoading(true)
            const results = await fetchGeoSuggestions(query)
            setSuggestions(results)
            setLoading(false)
        }, 350)
    
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [query])

    const handleSelect = (location: GeoLocation) => {
        selectedRef.current = true
        setQuery(`${location.name}${location.state ? `, ${location.state}` : ""}, ${location.country}`)
        setSuggestions([])
        onSelect(location)
    }

    return (
        <div className="search-wrapper">
            <div className="search-input-row">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter a city..."
                    value={query}
                    onChange={handleChange}
                />
                {loading && <span className="search-spinner" />}
            </div>
            {suggestions.length > 0 && (
                <ul className="search-dropdown">
                    {suggestions.map((location, index) => (
                        <li
                            key={index}
                            className="search-dropdown-item"
                            onClick={() => handleSelect(location)}
                        >
                            {location.name}{location.state ? `, ${location.state}` : ""}, {location.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
