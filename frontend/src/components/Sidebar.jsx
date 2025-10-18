import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { language } = useLanguage();

  const menuItems = [
    { 
      name: language === 'en' ? 'Invoices' : 'Fakturor', 
      path: '/invoices', 
      icon: '📄',
      color: '#00bcd4'
    },
    { 
      name: language === 'en' ? 'Customers' : 'Kunder', 
      path: '/customers', 
      icon: '👤',
      color: '#00bcd4'
    },
    { 
      name: language === 'en' ? 'My Business' : 'Min Verksamhet', 
      path: '/business', 
      icon: '⚙️',
      color: '#00bcd4'
    },
    { 
      name: language === 'en' ? 'Invoice Journal' : 'Fakturajournal', 
      path: '/journal', 
      icon: '📊',
      color: '#00bcd4'
    },
    { 
      name: language === 'en' ? 'Price List' : 'Prislista', 
      path: '/pricelist', 
      icon: '🏷️',
      color: '#ff9800'
    },
    { 
      name: language === 'en' ? 'Multiple Invoicing' : 'Multipal Fakturering', 
      path: '/multiple', 
      icon: '📑',
      color: '#00bcd4'
    },
    { 
      name: language === 'en' ? 'Unpaid Invoices' : 'Obetalda Fakturor', 
      path: '/unpaid', 
      icon: '⭕',
      color: '#e91e63'
    },
    { 
      name: language === 'en' ? 'Offer' : 'Erbjudande', 
      path: '/offer', 
      icon: '💰',
      color: '#ffeb3b'
    },
    { 
      name: language === 'en' ? 'Inventory Control' : 'Lagerkontroll', 
      path: '/inventory', 
      icon: '📦',
      color: '#9e9e9e'
    },
    { 
      name: language === 'en' ? 'Member Invoicing' : 'Medlemsfakturering', 
      path: '/member', 
      icon: '👥',
      color: '#9e9e9e'
    },
    { 
      name: language === 'en' ? 'Import/Export' : 'Import/Export', 
      path: '/import-export', 
      icon: '☁️',
      color: '#2196f3'
    },
    { 
      name: language === 'en' ? 'Log out' : 'Logga ut', 
      path: '/logout', 
      icon: '🚪',
      color: '#00bcd4',
      onClick: logout
    }
  ];

  return (
    <div className="sidebar-menu">
      <div className="sidebar-header-menu">
        <h3 className="sidebar-title">Menu</h3>
      </div>
      
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li 
            key={index}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.onClick ? (
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                }}
                className="menu-link"
              >
                <span className="menu-icon" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <span className="menu-text">{item.name}</span>
              </a>
            ) : (
              <Link to={item.path} className="menu-link">
                <span className="menu-icon" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <span className="menu-text">{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;