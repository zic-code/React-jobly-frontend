import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCard from "./JobCard";

/** Show list of jobs. */

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="JobList">
      <h1>Job Listings</h1>
      {jobs.length
        ? jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id} 
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
            />
          ))
        : <p>No jobs found.</p>}
    </div>
  );
}

export default JobList;