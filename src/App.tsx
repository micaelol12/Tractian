import "./App.css";
import Actives from "./Components/Actives/Actives";
import Header from "./Components/Header/Header";
import { CompanieProvider } from "./Contexts/CompanieContext";

function App() {
  return (
    <CompanieProvider>
      <div style={{ height: "100vh" }}>
        <Header />
        <Actives />
      </div>
    </CompanieProvider>
  );
}

export default App;
