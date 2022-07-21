import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Footer from "./component/Footer/Footer";
import Cart from "./component/Cart/Cart";
import ScrollToTop from "./component/Router/ScrollToTop";
import HomePage from "./pages/HomePage";
function App() {
  

  return (
    <div className="App">
      <Navigation />
      <ScrollToTop>
        <HomePage />
      </ScrollToTop>
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
