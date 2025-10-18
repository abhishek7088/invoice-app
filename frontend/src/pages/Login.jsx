import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import textService from '../services/textService';
import HamburgerMenu from '../components/HamburgerMenu';
import { IMAGES } from '../utils/constants';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [texts, setTexts] = useState({});
  
  const { login } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTexts = async () => {
      try {
        const data = await textService.getPageTexts('login', language);
        setTexts(data.data);
      } catch (err) {
        console.error('Failed to load texts:', err);
        setTexts({
          login_title: language === 'en' ? 'Log in' : 'Logga in',
          email_label: language === 'en' ? 'Enter your email address' : 'Skriv in din epost adress',
          password_label: language === 'en' ? 'Enter your password' : 'Skriv in ditt lösenord',
          login_button: language === 'en' ? 'Log in' : 'Logga in',
          register_link: language === 'en' ? 'Register' : 'Registrera dig',
          forgot_password: language === 'en' ? 'Forgot password?' : 'Glömt lösenord?',
          invalid_email: language === 'en' ? 'Please enter a valid email address' : 'Vänligen skriv in en giltig epost adress'
        });
      }
    };

    loadTexts();
  }, [language]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationError('');

    if (!validateEmail(email)) {
      setValidationError(texts.invalid_email || 'Invalid email address');
      return;
    }

    if (password.length < 6) {
      setValidationError(language === 'en' ? 'Password must be at least 6 characters' : 'Lösenordet måste vara minst 6 tecken');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/pricelist');
    } catch (err) {
      setError(err.response?.data?.error || (language === 'en' ? 'Login failed. Please check your credentials.' : 'Inloggningen misslyckades. Kontrollera dina uppgifter.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img 
        src={IMAGES.background} 
        alt="Background" 
        className="login-background"
      />

      <HamburgerMenu />

      <div className="login-header">
        <div className="login-logo">
          <img src={IMAGES.logo} alt="Logo" className="logo-image" />
          <span className="logo-text">123 Fakturera</span>
        </div>
        
        <div className="language-switcher" onClick={toggleLanguage}>
          <span className="language-text">
            {language === 'en' ? 'English' : 'Svenska'}
          </span>
          <img 
            src={IMAGES.flags[language]} 
            alt={language === 'en' ? 'English' : 'Swedish'} 
            className="flag-icon"
          />
        </div>
      </div>

      <div className="login-card">
        <h1 className="login-title">{texts.login_title || 'Log in'}</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              {texts.email_label || 'Enter your email address'}
            </label>
            <input
              type="email"
              className={`form-input ${validationError ? 'error' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError('');
                setError('');
              }}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {texts.password_label || 'Enter your password'}
            </label>
            <input
              type="password"
              className={`form-input ${validationError ? 'error' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationError('');
                setError('');
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {validationError && (
            <div className="validation-error">{validationError}</div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (language === 'en' ? 'Logging in...' : 'Loggar in...') : (texts.login_button || 'Log in')}
          </button>
        </form>

        <div className="login-footer">
          <span className="login-link">
            {texts.register_link || 'Register'}
          </span>
          <span className="login-link">
            {texts.forgot_password || 'Forgot password?'}
          </span>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f0f8ff', 
          borderRadius: '8px',
          fontSize: '0.85rem',
          textAlign: 'center'
        }}>
          <strong>{language === 'en' ? 'Test Credentials:' : 'Test inloggning:'}</strong><br />
          Email: test@example.com<br />
          Password: password123
        </div>
      </div>
    </div>
  );
};

export default Login;