import "./CandidateTable.css";

const CandidateTable = ({ candidates, onEditCandidate }) => {
  if (!candidates || candidates.length === 0) {
    return <div className="no-candidates">No candidates found.</div>;
  }

  return (
    <div className="table-container">
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.gender}</td>
              <td className="skills-cell">
                {candidate.skills?.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </td>
              <td>{candidate.experience} {candidate.experience === 1 ? 'Year' : 'Years'}</td>
              <td>
                <button 
                  className="edit-button" 
                  onClick={() => onEditCandidate(candidate)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;