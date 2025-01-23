import React from "react";
import KitList from "./KitList";

const Labhome = () => {
  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleStaffList = () => {
    window.location.href = "/staff-list";
  };

  const handleAllotKits = () => {
    window.location.href = "/allot-kit";
  };

  return (
    <div className="labhome-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Lab Staff/Admin</h2>
        <div className="sidebar-actions">
          <button onClick={handleStaffList}>Staff List</button>
          <button onClick={handleAllotKits}>Allot Kits</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Welcome to Lab Staff/Admin Page</h2>
        <KitList />
        <br />
      </div>
    </div>
  );
};

export default Labhome;

// Inline CSS styles for layout
const styles = `
.labhome-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar h2 {
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.sidebar-actions button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.main-content h2, .main-content h3 {
  color: #2c3e50;
}

.main-content ul {
  list-style-type: none;
  padding: 0;
}

.main-content li {
  margin-bottom: 10px;
}

.main-content a {
  color: #3498db;
  text-decoration: none;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
