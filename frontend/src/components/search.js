const Search = ({ search, handleSearch }) => {
    return(
        <div>
        Search: <input
                  value={search}
                  onChange={handleSearch}
                />
      </div>
    )

}

export default Search