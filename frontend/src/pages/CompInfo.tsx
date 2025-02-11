import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IotKitComponents: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const components = [
    { name: 'Arduino Uno', image: '/components/arduino.jpg', url: 'https://www.arduino.cc/' },
    { name: 'Raspberry Pi', image: '/components/raspberrypi.jpg', url: 'https://www.raspberrypi.org/' },
    { name: 'DHT11 Sensor', image: '/components/DTH.jpg', url: 'https://en.wikipedia.org/wiki/DHT11' },
    { name: 'IR Sensor', image: '/components/IR.jpg', url: 'https://en.wikipedia.org/wiki/Infrared_sensor' },
    { name: 'Door Sensor', image: '/components/Door.jpg', url: 'https://arduinogetstarted.com/tutorials/arduino-door-sensor' },
    { name: 'LDR Sensor', image: '/components/LDR.jpg', url: 'https://www.electronicsforu.com/technology-trends/learn-electronics/ldr-light-dependent-resistors-basics' },
    { name: 'Heartbeat Sensor', image: '/components/heartbeat.jpg', url: 'https://lastminuteengineers.com/pulse-sensor-arduino-tutorial/' },
    { name: 'Water Sensor', image: '/components/water.jpg', url: 'https://robocraze.com/blogs/post/what-is-a-water-sensor?srsltid=AfmBOorVKpHJfM0YgRuewKnD8UkmWCldaXoAvbagy4mQEvjiPZvhhLOF' },
  ];

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#3498db' }}>IoT Kit Components</h1>
      <button onClick={() => navigate('/student/:id')} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
        Back
      </button>
      <input
        type="text"
        placeholder="Search components..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Component Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Image</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Learn More</th>
          </tr>
        </thead>
        <tbody>
          {filteredComponents.map((component, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : '#E9ECEF' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{component.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', cursor: 'pointer' }}>
                <img
                  src={component.image}
                  alt={component.name}
                  width="50"
                  onClick={() => setSelectedImage(component.image)}
                  style={{ borderRadius: '5px' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <a href={component.url} target="_blank" rel="noopener noreferrer">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <img src={selectedImage} alt="Enlarged View" style={{ maxWidth: '80%', maxHeight: '80%', borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default IotKitComponents;
