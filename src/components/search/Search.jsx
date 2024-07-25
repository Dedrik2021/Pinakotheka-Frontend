import './search.scss'

const Search = ({ openSearch, searchRef}) => {
    return ( 
        <div className="search" ref={searchRef} >
            <label htmlFor="search"></label>
            <input className={`search__input ${openSearch ? 'open' : ''}`} type="search" name="search" id="search" placeholder="Search..."/>
        </div>
    );
}

export default Search;