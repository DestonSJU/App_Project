// Initial Imports
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {useNavigate, useSearchParams} from "react-router-dom";

function SearchBar(){
    // Initialize Variables
    const[searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search")) || "";
    const navigate = useNavigate();

    // Sets the search parameter to the search field
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    },[searchParams])
    // Routes to the results page with the text entered in the search field
    const handleSearchPage = async () => {
        navigate("/results?search=" + search);
    }

    return (
        <div className=" d-flex align-items-center">
            <input id="search box" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control w-100" style={{maxWidth: "1340px", marginLeft: "100px"}}/>
            <Button variant="warning" onClick={handleSearchPage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </Button>
        </div>
    )
}
export default SearchBar