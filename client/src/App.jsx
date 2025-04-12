import { useState, useEffect } from "react";
import CandidateTable from "./components/CandidateTable";
import AddCandidateModal from "./components/AddCandidate";
import EditCandidateModal from "./components/EditCandidate"; // New import
import FilterPanel from "./components/FilterPanel";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state
  const [currentCandidate, setCurrentCandidate] = useState(null); // New state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    skills: [],
  });

  // API base URL - change this to match your backend server
  const API_BASE_URL = "http://localhost:5000"; // Update this to your actual backend URL

  // Fetch candidates on component mount and page change
  useEffect(() => {
    fetchCandidates();
  }, [currentPage]);

  // Apply search and filters
  useEffect(() => {
    applyFiltersAndSearch();
  }, [candidates, searchTerm, filters]);

  // Fetch candidates from the API
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
      // Set empty array to prevent errors if fetch fails
      setCandidates([]);
    }
  };

  const applyFiltersAndSearch = () => {
    if (!candidates || candidates.length === 0) {
      setFilteredCandidates([]);
      return;
    }
    
    let filtered = [...candidates];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.phone?.includes(searchTerm)
      );
    }

    // Apply filters
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

  // Add a new candidate
  const handleAddCandidate = async (newCandidate) => {
    try {
      // Convert experience to a number
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
      fetchCandidates(); // Refresh the candidates list
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. Please try again.");
    }
  };

  // Edit an existing candidate
  const handleEditCandidate = async (updatedCandidate) => {
    try {
      // Convert experience to a number
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
      fetchCandidates(); // Refresh the candidates list
    } catch (error) {
      console.error("Error updating candidate:", error);
      alert("Failed to update candidate. Please try again.");
    }
  };

  // Open edit modal with candidate data
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