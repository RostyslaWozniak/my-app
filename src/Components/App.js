import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { LoginProvider } from "./LoginContext";
import { DataProvider } from "../Context/GetDataContext";
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
        <LoginProvider>
          <DataProvider>
            <Header/>
            <div className="body">
              <Navigation/>
              <div className="page">
                <Pages/>
              </div>
              <Modal/>
            </div>
            <Footer/>
          </DataProvider>
        </LoginProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
