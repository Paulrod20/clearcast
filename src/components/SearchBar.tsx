
type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

export default function SearchBar(props: SearchBarProps) { 
    const { value, onChange, onSearch } = props;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }

    return (
        <div className="input-group mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={onSearch}>
                Search
            </button>

        </div>
    )
}