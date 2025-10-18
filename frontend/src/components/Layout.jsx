import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/constants';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="app-layout">
     
      <div className="app-header">
        <div className="user-info">
          <div className="user-avatar">
            <span>{user?.email?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <span className="user-name">John Andre</span>
            <span className="user-company">Storfjord AS</span>
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
        
        <Sidebar />

       
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;