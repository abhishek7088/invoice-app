import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const ImportExport = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>{language === 'en' ? 'Import/Export' : 'Import/Export'}</h1>
        <p style={{ marginTop: '20px', color: '#666' }}>
          {language === 'en' ? 'This page is under construction.' : 'Denna sida är under uppbyggnad.'}
        </p>
      </div>
    </Layout>
  );
};

export default ImportExport;