import React from 'react';
import { useNavigate } from "react-router-dom";
import rvLogo from '../assets/rv_logo.jpg';
import iot_tech from '../assets/iot_tech.jpg';
import iot_device from '../assets/iot_device.jpg';
import iot_lab from '../assets/iot_lab.jpg';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login")
  };

  return (
    <div className="home-container">
      <header className="college-header">
        <img 
          src={rvLogo}  
          alt="RV College of Engineering Logo" 
          className="rv_logo"
          
        />
        <div className="header-text">
          <h1>RV College of Engineering</h1>
          <h2>Department of Information Science and Engineering</h2>
        </div>
      </header>

      <main className="content-section">
        <section className="intro-text">
          <h3>IoT Kit Management System</h3>
          <p>
            Streamline and manage IoT kits for innovative laboratory research 
            and practical learning experiences.
          </p>
        </section>

        <div className="login-section">
          <button 
            onClick={handleLogin} 
            className="login-button"
          >
            Login to System
          </button>
        </div>
        
        <br></br>
        <br></br>

        <section className="iot-images">
          <div className="image-grid">
            <img src={iot_tech} alt="IoT Technology" />
            <img src={iot_device} alt="IoT Devices" />
            <img src={iot_lab} alt="IoT Laboratory" />
          </div>
        </section>

        
      </main>

      <footer className="page-footer">
        <p>© 2025 RV College of Engineering - IoT Lab</p>
      </footer>
    </div>
  );
};

export default HomePage;

// CSS Styles
const styles = `
.home-container {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
}

.college-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.rv_logo {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  padding:10px;
}

.header-text {
  text-align: center;
}

.header-text h1 {
  color: #1a5f7a;
  margin-bottom: 10px;
}

.header-text h2 {
  color: #2c3e50;
  font-size: 1.2rem;
}

.content-section {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
}

.intro-text {
  text-align: center;
  margin-bottom: 30px;
}

.intro-text h3 {
  color: #2980b9;
  margin-bottom: 15px;
}

.iot-images {
  margin-bottom: 30px;
}

.image-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.image-grid img {
  width: 30%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.image-grid img:hover {
  transform: scale(1.05);
}

.login-section {
  display: flex;
  justify-content: center;
}

.login-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 350px; 
  text-align: center;
}

.login-button:hover {
  background-color: #2980b9;
}

.page-footer {
  text-align: center;
  margin-top: 30px;
  padding: 15px;
  background-color: #f1f1f1;
  color: #666;
}

@media (max-width: 768px) {
  .college-header {
    flex-direction: column;
    text-align: center;
  }

  .college-logo {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .image-grid {
    flex-direction: column;
  }

  .image-grid img {
    width: 100%;
  }
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);