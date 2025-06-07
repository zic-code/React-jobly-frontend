import { Link } from "react-router-dom";
import "./CompanyCard.css"; 





function CompanyCard({ name, description, handle }) {
  return (
    <div className="CompanyCard card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/companies/${handle}`} className="text-decoration-none text-dark">
            {name}
          </Link>
        </h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;