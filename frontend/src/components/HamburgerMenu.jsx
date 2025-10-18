import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <div className="hamburger-icon">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>

      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      ></div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Menu</h3>
          <button className="close-sidebar" onClick={closeMenu}>×</button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/login" onClick={closeMenu}>
              <span className="menu-icon">🏠</span>
              <span>{language === 'en' ? 'Home' : 'Hem'}</span>
            </Link>
          </li>
          <li>
            <Link to="/terms" onClick={closeMenu}>
              <span className="menu-icon">📄</span>
              <span>{language === 'en' ? 'Terms' : 'Villkor'}</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); }}>
              <span className="menu-icon">📧</span>
              <span>{language === 'en' ? 'Contact' : 'Kontakt'}</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;