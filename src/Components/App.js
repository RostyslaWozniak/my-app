import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "../Context/AppContext";
import Header from "./Header/Header";
import Navigation from "./Navigation.js/Navigation";
import Pages from "./Pages";
import Footer from "./Footer/Footer";
import '../App.css'
import '../MediaScrin.css'
import Modal from "./elements/Modal/Modal";

function App() {
  return (
    <Router>
      <AppProvider>
        <Header/>
        <div className="body">
          <Navigation/>
          <div className="page">
            <Pages/>
          </div>
          <Modal/>
        </div>
        <Footer/>
      </AppProvider>
    </Router>
  );
}

export default App;