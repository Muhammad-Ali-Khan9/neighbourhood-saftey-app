import React from 'react';

interface HapticTabProps {
  label?: string;
  onClick?: () => void;
}

const HapticTab: React.FC<HapticTabProps> = ({ label = "Tap me", onClick }) => {
  const handleClick = () => {
    // Trigger haptic feedback if the Vibration API is available
    if (navigator.vibrate) {
      navigator.vibrate(50); // vibrate for 50ms
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {label}
    </button>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#0070f3',
  color: '#fff',
  cursor: 'pointer',
};

export default HapticTab;