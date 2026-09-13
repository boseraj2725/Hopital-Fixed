import "./SearchBox.css";

function SearchBox({

    value,

    onChange,

    placeholder = "Search..."

}) {

    return (

        <div className="search-box-container">

            <input
                type="text"
                className="search-box"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

        </div>

    );

}

export default SearchBox;