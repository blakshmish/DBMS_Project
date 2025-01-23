import React from 'react';

const IotLabExperiments: React.FC = () => {
  const experiments = Array.from({ length: 10 }, (_, index) => `Experiment ${index + 1}`);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#007BFF' }}>IoT Lab Experiments</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {experiments.map((experiment, index) => (
          <li
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? '#F8F9FA' : '#E9ECEF',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '5px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {experiment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IotLabExperiments;