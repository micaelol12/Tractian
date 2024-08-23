import "./App.css";
import Actives from "./Components/Actives/Actives";
import Header from "./Components/Header/Header";
import { CompanieProvider } from "./Contexts/CompanieContext";

function App() {
  return (
    <CompanieProvider>
      <div style={{ height: "100vh" }}>
        <Header />
        <main style={{ height: "calc(100% - 48px)", overflow: "auto" }}>
          <Actives />
        </main>
      </div>
    </CompanieProvider>
  );
}

export default App;
