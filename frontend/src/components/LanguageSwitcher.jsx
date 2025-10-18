import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="language-switcher" onClick={toggleLanguage}>
      <span className="language-text">
        {language === 'en' ? 'English' : 'Svenska'}
      </span>
      <img 
        src={language === 'en' ? '/uk-flag.png' : '/sweden-flag.png'} 
        alt={language === 'en' ? 'English' : 'Swedish'} 
        className="flag-icon"
      />
    </div>
  );
};

export default LanguageSwitcher;