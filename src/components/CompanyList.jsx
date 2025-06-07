import React, { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCompanies(term) {
    try {
      const companies = await JoblyApi.getCompanies(term);
      setCompanies(companies);
    } catch (err) {
      console.error("Error Loading Companies:", err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm onSearch={fetchCompanies} />
      {companies.length ? (
        companies.map((c) => (
          <CompanyCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            description={c.description}
          />
        ))
      ) : (
        <p className="lead">Sorry, no results were found.</p>
      )}
    </div>
  );
}

export default CompanyList;
