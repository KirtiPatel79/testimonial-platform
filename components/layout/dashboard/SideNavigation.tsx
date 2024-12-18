import React from 'react';
import Link from 'next/link';

const SideNavigation = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        <li className="mb-4">
          <Link href="/dashboard">
            <a className="text-lg font-semibold">Dashboard</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/testimonials">
            <a className="text-lg font-semibold">Testimonials</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
