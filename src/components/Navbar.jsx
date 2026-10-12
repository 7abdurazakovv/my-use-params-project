import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>JSONPlaceholder Users</h2>
      <Link to="/">Bosh sahifa</Link>
    </nav>
  );
}