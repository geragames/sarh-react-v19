


import { Header } from "./Header";
import Main from "./Main";
// import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";



const Layout = () => {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full max-w-1200">
        <Header />
        <Main />
      </div>


    </div>





  );
}

export default Layout;