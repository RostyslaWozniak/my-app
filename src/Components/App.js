import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header/Header";
import Navigation from "./Navigation.js/Navigation";
import Page from "./Page";
import Footer from "./Footer";
import '../App.css'

function App() {
  return (
    <Router>
      <Header/>
      <div className="body">
        <Navigation/>
        <div className="page">
          <Page/>
        </div>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
