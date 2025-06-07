import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import JoblyApi from "../api/api";

function JobCard({ id, title, salary, equity, companyName }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // ✅ 아직 currentUser가 null이면 로딩 중이거나 로그아웃 상태 → 렌더 막기
  if (!currentUser) return null;

  const hasApplied = currentUser.applications.includes(id);

  const apply = async () => {
    const rawToken = localStorage.getItem("jobly-token");
    if (rawToken) {
      JoblyApi.token = rawToken.replace(/"/g, "");
    }

    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setCurrentUser(c => ({
        ...c,
        applications: [...c.applications, id]
      }));
    } catch (err) {
      console.error("Apply failed:", err);
    }
  };

  return (
    <div className="JobCard">
      <h5>{title}</h5>
      <p>{companyName}</p>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
      <button disabled={hasApplied} onClick={apply}>
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;