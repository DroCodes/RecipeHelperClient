import React from "react";

function Search() {
    return (
        <div>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input
                    type="text"
                    id="search"
                    className="col-md-8 col-lg-6 mt-1 mb-2"
                    placeholder="Search Recipe's"
                />
                <button
                    type="submit"
                    className="btn btn-dark col-md-3 col-lg-2"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
