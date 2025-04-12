import { useState, useEffect } from "react";
import "./AddCandidate.css";

const EditCandidateModal = ({ candidate, onClose, onEditCandidate }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
    qualification: "",
    experience: "",
    skills: [],
  });

  const skillOptions = [
    "JavaScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "PHP",
    "HTML",
    "CSS",
  ];

  useEffect(() => {
    if (candidate) {
      setFormData({
        _id: candidate._id || "",
        name: candidate.name || "",
        phone: candidate.phone || "",
        email: candidate.email || "",
        gender: candidate.gender || "",
        qualification: candidate.qualification || "",
        experience: candidate.experience ? candidate.experience.toString() : "",
        skills: candidate.skills || [],
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];

    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditCandidate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Candidate</h2>
          <button className="close-button" onClick={onClose}>
            x
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="qualification">Higher Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience (Years)</label>
            <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required>
              <option value="">Select Experience</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5+ Years</option>
            </select>
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="skills-container">
              {skillOptions.map((skill) => (
                <div key={skill} className="skill-checkbox">
                  <input
                    type="checkbox"
                    id={`skill-${skill}`}
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  <label htmlFor={`skill-${skill}`}>{skill}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateModal;