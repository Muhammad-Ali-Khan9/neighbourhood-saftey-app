import React from 'react';

interface TabBarBackgroungProps {
  /** Optional additional CSS class names */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Content to be rendered inside the tab bar background */
  children?: React.ReactNode;
}

const TabBarBackgroung: React.FC<TabBarBackgroungProps> = ({
  className = '',
  style,
  children,
}) => {
  return (
    <div
      className={`tab-bar-backgroung ${className}`}
      style={{
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // sample gradient background
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default TabBarBackgroung;