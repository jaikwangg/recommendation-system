import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './button';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define your navigation items here
  const navItems = [
    { title: 'Home', to: '/' },
    { title: 'Upload', to: '/upload' },
    { title: 'Recommendation', to: '/recommendation' },
    { title: 'Contact', to: '/contact' },
  ];

  return (
    <div className="mobile-menu">
      <Button onClick={toggleMenu} className="btn mobile-only">
        {isOpen ? <X /> : <Menu />}
      </Button>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 40
        }} className="mobile-only">
          <nav style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '75%',
            maxWidth: '20rem',
            backgroundColor: 'var(--background)',
            boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Fashion Recommender</h2>
              <Button onClick={toggleMenu} className="btn">
                <X />
              </Button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {navItems.map(({ title, to }) => (
                <li key={to} style={{ marginBottom: '1rem' }}>
                  <Link
                    to={to}
                    style={{
                      fontSize: '1.125rem',
                      color: 'var(--foreground)',
                      textDecoration: 'none'
                    }}
                    onClick={toggleMenu}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
