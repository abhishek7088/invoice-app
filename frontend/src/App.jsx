import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import Login from './pages/Login';
import Terms from './pages/Terms';


import Pricelist from './pages/Pricelist';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import MyBusiness from './pages/MyBusiness';
import InvoiceJournal from './pages/InvoiceJournal';
import MultipleInvoicing from './pages/MultipleInvoicing';
import UnpaidInvoices from './pages/UnpaidInvoices';
import Offer from './pages/Offer';
import Inventory from './pages/Inventory';
import MemberInvoicing from './pages/MemberInvoicing';
import ImportExport from './pages/ImportExport';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/pricelist" replace /> : <Login />
        } 
      />
      
      <Route path="/terms" element={<Terms />} />

      <Route
        path="/pricelist"
        element={
          <ProtectedRoute>
            <Pricelist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/business"
        element={
          <ProtectedRoute>
            <MyBusiness />
          </ProtectedRoute>
        }
      />

      <Route
        path="/journal"
        element={
          <ProtectedRoute>
            <InvoiceJournal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/multiple"
        element={
          <ProtectedRoute>
            <MultipleInvoicing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/unpaid"
        element={
          <ProtectedRoute>
            <UnpaidInvoices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/offer"
        element={
          <ProtectedRoute>
            <Offer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/member"
        element={
          <ProtectedRoute>
            <MemberInvoicing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/import-export"
        element={
          <ProtectedRoute>
            <ImportExport />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/pricelist" : "/login"} replace />
        } 
      />

      
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
}

export default App;