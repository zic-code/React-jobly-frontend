import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "../api/api";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await JoblyApi.getCompany(handle);
        setCompany(data);
      } catch (err) {
        console.error("Error fetching company detail:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>

      <h3>Jobs at {company.name}</h3>
      <ul>
        {company.jobs.map(job => (
          <li key={job.id}>
            {job.title} — {job.salary ? `$${job.salary}` : "Salary not listed"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;