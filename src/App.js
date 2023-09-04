import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Components/Navigation.js/Navigation";
import Page from "./Components/Page";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Navigation/>
      <Page/>
      <Footer/>
    </Router>
  );
}

export default App;
