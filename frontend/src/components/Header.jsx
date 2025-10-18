import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ showMenu = true }) => {
  const { language } = useLanguage();

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>123 Fakturera</span>
        </div>
        {showMenu && <LanguageSwitcher />}
      </div>
    </div>
  );
};

export default Header;