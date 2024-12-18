import React from 'react';
import LogoutButton from '../../auth/LogoutButton';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
