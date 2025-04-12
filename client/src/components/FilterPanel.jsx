import { useState } from "react"
import "./FilterPanel.css"

const FilterPanel = ({ filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState({
    gender: filters.gender || "",
    experience: filters.experience || "",
    skills: filters.skills || [],
  })

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
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters({
      ...localFilters,
      [name]: value,
    })
  }

  const handleSkillChange = (skill) => {
    const updatedSkills = localFilters.skills.includes(skill)
      ? localFilters.skills.filter((s) => s !== skill)
      : [...localFilters.skills, skill]

    setLocalFilters({
      ...localFilters,
      skills: updatedSkills,
    })
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const clearFilters = () => {
    const emptyFilters = {
      gender: "",
      experience: "",
      skills: [],
    }
    setLocalFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filter</h3>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label>Higher Qualification</label>
          <select name="qualification" value={localFilters.qualification} onChange={handleChange}>
            <option value="">All Qualifications</option>
            <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
            <option value="Master of Commerce (MCom)">Master of Commerce (MCom)</option>
            <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
            <option value="Master of Science (MSc)">Master of Science (MSc)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Experience</label>
          <div className="experience-range">
            <input type="number" placeholder="Min" min="0" name="experienceMin" className="experience-input" />
            <span>to</span>
            <input type="number" placeholder="Max" min="0" name="experienceMax" className="experience-input" />
          </div>
        </div>

        <div className="filter-group">
          <label>Skill/Technology</label>
          <select name="skills" className="skills-dropdown">
            <option value="">Select Skills</option>
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <div className="skills-list">
            {skillOptions.map((skill) => (
              <div key={skill} className="skill-checkbox">
                <input
                  type="checkbox"
                  id={`filter-skill-${skill}`}
                  checked={localFilters.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                <label htmlFor={`filter-skill-${skill}`}>{skill}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-actions">
        <button className="clear-button" onClick={clearFilters}>
          Clear
        </button>
        <button className="apply-button" onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
