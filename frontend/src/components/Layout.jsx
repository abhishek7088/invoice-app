import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/constants';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-layout">
      
      <div className="app-header">
        <div className="header-left">
         
          <button className="hamburger-toggle" onClick={toggleSidebar}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className="user-info">
            <div className="user-avatar">
              <span>{user?.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-details">
              <span className="user-name">John Andre</span>
              <span className="user-company">Storfjord AS</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="language-switcher-header" onClick={toggleLanguage}>
            <span className="language-text">
              {language === 'en' ? 'English' : 'Norsk Bokmål'}
            </span>
            <img 
              src={IMAGES.flags[language]} 
              alt={language === 'en' ? 'English' : 'Norwegian'} 
              className="flag-icon"
            />
          </div>
        </div>
      </div>

      
      <div className="app-body">
        
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
          onClick={toggleSidebar}
        ></div>

        
        <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>

       
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;