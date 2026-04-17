type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    onSearch: () => void
}

export default function SearchBar(props: SearchBarProps) {
    const { value, onChange, onSearch } = props

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch()
        }
    }

    return (
        <div className="search-wrapper">
            <input
                type="text"
                className="search-input"
                placeholder="Enter a city..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={onSearch}>
                Search
            </button>
        </div>
    )
}
