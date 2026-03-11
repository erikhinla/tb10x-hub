import React from 'react';
import DigitalFogDiagnosticWidget from '../components/DigitalFogDiagnosticWidget';

const DrDroolPage = () => (
  <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tool Drool Campaign: Dr. Drool Backstory</h1>
    <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem' }}>Dr. Drool: Human form for subtle fog induction, villain for amplified chaos.</p>

    <DigitalFogDiagnosticWidget />

    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <img src="dr-drool-human.jpg" alt="Human Dr. Drool" style={{ maxWidth: '300px', borderRadius: '8px' }} />
      <img src="dr-drool-villain.jpg" alt="Villain Dr. Drool" style={{ maxWidth: '300px', borderRadius: '8px' }} />
    </div>
  </div>
);

export default DrDroolPage;
