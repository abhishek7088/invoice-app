import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const MemberInvoicing = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>{language === 'en' ? 'Member Invoicing' : 'Medlemsfakturering'}</h1>
        <p style={{ marginTop: '20px', color: '#666' }}>
          {language === 'en' ? 'This page is under construction.' : 'Denna sida är under uppbyggnad.'}
        </p>
      </div>
    </Layout>
  );
};

export default MemberInvoicing;