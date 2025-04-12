import { useState, useEffect } from "react";
import CandidateTable from "./components/CandidateTable";
import AddCandidateModal from "./components/AddCandidate";
import EditCandidateModal from "./components/EditCandidate";
import FilterPanel from "./components/FilterPanel";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    skills: [],
  });

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchCandidates();
  }, [currentPage]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [candidates, searchTerm, filters]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/candidates?page=${currentPage}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setCandidates(data.candidates || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
  };

  const applyFiltersAndSearch = () => {
    if (!candidates || candidates.length === 0) {
      setFilteredCandidates([]);
      return;
    }
    
    let filtered = [...candidates];

    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.phone?.includes(searchTerm)
      );
    }

    if (filters.gender) {
      filtered = filtered.filter((candidate) => candidate.gender === filters.gender);
    }

    if (filters.experience) {
      filtered = filtered.filter((candidate) => 
        candidate.experience === parseInt(filters.experience, 10));
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter((candidate) => 
        filters.skills.some((skill) => candidate.skills?.includes(skill)));
    }

    setFilteredCandidates(filtered);
  };

  const handleAddCandidate = async (newCandidate) => {
    try {
      newCandidate.experience = parseInt(newCandidate.experience, 10);
      
      const response = await fetch(`${API_BASE_URL}/api/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCandidate),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedCandidate = await response.json();
      console.log("Candidate added successfully:", addedCandidate);
      setIsModalOpen(false);
      fetchCandidates();
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. Please try again.");
    }
  };

  const handleEditCandidate = async (updatedCandidate) => {
    try {
      updatedCandidate.experience = parseInt(updatedCandidate.experience, 10);
      
      const response = await fetch(`${API_BASE_URL}/api/candidates/${updatedCandidate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCandidate),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const editedCandidate = await response.json();
      console.log("Candidate updated successfully:", editedCandidate);
      setIsEditModalOpen(false);
      setCurrentCandidate(null);
      fetchCandidates();
    } catch (error) {
      console.error("Error updating candidate:", error);
      alert("Failed to update candidate. Please try again.");
    }
  };

  const handleOpenEditModal = (candidate) => {
    setCurrentCandidate(candidate);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  
const handleDeleteCandidate = async (candidateId) => {
  if (!window.confirm("Are you sure you want to delete this candidate?")) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/candidates/${candidateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from server:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Candidate deleted successfully");
    fetchCandidates(); // Refresh the candidates list
  } catch (error) {
    console.error("Error deleting candidate:", error);
    alert("Failed to delete candidate. Please try again.");
  }
};

  return (
    <div className="app-container">
      <div className="candidates-header">
        <h2>Candidates</h2>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Add
        </button>
      </div>

      <div className="controls">
        <div className="view-controls">
          <button className="list-view active">
            <i className="fas fa-list"></i>
          </button>
          <button className="grid-view">
            <i className="fas fa-th"></i>
          </button>
        </div>

        <div className="search-pagination">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Candidate, Email, Phone..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="pagination">
            <span>
              {currentPage}/{totalPages}
            </span>
            <button
              className="prev-page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="next-page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>
      </div>

      <CandidateTable 
        candidates={filteredCandidates.length > 0 ? filteredCandidates : candidates} 
        onEditCandidate={handleOpenEditModal} 
        onDeleteCandidate={handleDeleteCandidate}
      />

      {isModalOpen && <AddCandidateModal onClose={() => setIsModalOpen(false)} onAddCandidate={handleAddCandidate} />}

      {isEditModalOpen && (
        <EditCandidateModal 
          candidate={currentCandidate} 
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentCandidate(null);
          }} 
          onEditCandidate={handleEditCandidate} 
        />
      )}

      {isFilterOpen && (
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} onClose={() => setIsFilterOpen(false)} />
      )}
    </div>
  );
}

export default App;