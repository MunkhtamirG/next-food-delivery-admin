import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return (
    <div>
      {user ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <LoginPage setUser={setUser} />
      )}
    </div>
  );
}

export default MyApp;
