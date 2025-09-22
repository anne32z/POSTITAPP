import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
const App = () => {
  return (
    <>
      <Home />
      <About/>
      <Login/>
      <Footer/>
    </>
  );
};

export default App;
