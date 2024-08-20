import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
