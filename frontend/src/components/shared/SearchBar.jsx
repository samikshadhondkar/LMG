const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Search...'}
      className="w-full max-w-sm border rounded-md px-3 py-2 text-sm mt-4 outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;