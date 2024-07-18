import './search.scss'

const Search = ({setOpenSearch, openSearch}) => {
    return ( 
        <div className="search">
            <label htmlFor="search"></label>
            <input className={`search__input ${openSearch ? 'open' : ''}`} type="search" name="search" id="search" placeholder="Search..."/>
        </div>
    );
}

export default Search;