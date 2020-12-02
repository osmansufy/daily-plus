import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Sidebar from './container/Sidebar'
import Header from './container/Header'
import Footer from './container/Footer';
function App() {
  return (
    <>
    <Sidebar />
    <Header />
    
 <Home />
 <Footer />
 </>
  );
}

export default App;