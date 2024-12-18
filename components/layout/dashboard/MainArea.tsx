import React from 'react';

const MainArea: React.FC = ({ children }) => {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      {children}
    </main>
  );
};

export default MainArea;
