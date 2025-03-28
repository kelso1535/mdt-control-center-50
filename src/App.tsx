
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToasterProvider } from '@/components/ui/toaster';
import CustomIndex from '@/pages/CustomIndex';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <ToasterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CustomIndex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ToasterProvider>
  );
}

export default App;
