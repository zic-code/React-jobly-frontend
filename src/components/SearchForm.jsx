import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ initialValue = "", onSearch }) {
  const [term, setTerm] = useState(initialValue);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(term.trim()); // 빈칸 제거 후 검색 요청
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        name="searchTerm"
        className="form-control"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="btn btn-primary mt-2">Search</button>
    </form>
  );
}

export default SearchForm;