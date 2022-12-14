import React, { useState } from "react";

function Search(props: {
    search: string;
    setSearch: any;
    searchFunction: any;
}) {
    const { search, setSearch } = props;
    const onSearchChange = (e: any) => {
        setSearch(e.target.value);
    };
    const onSubmit = (e: any) => {
        e.preventDefault();
        props.searchFunction();
        setSearch("");
    };
    return (
        <div>
            <form
                className="d-flex flex-column justify-content-center align-items-center"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    id="search"
                    className="col-md-8 col-lg-6 mt-1 mb-2"
                    placeholder="Search Recipe's"
                    onChange={onSearchChange}
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
