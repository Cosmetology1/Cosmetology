import Layout from "../pages/components/layout/Layout";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import "../styles/customStyles.css";
import { redirectUser } from "../server/util/auth";
import { destroyCookie, parseCookies } from "nookies";
import axios from "axios";

const baseURL = `http://localhost:3001/`;

function MyApp({ Component, pageProps }) {
  return (
    <Layout stylist={pageProps.stylist}>
      <Component {...pageProps} />
    </Layout>
  );
}


// import { Router } from 'react-router-dom';
// import { render } from 'react-dom';
// import { history } from '../pages/_helpers/history';
// import { accountService } from "./_services/account.service";
// import { configureFakeBackend } from '../pages/_helpers/fake-backend';
// configureFakeBackend();

// attempt silent token refresh before startup
// accountService.refreshToken().finally(startApp);

// function startApp() { 
//   render(
//       <Router history={history}>
//           <Layout />
//       </Router>,
//       document.getElementById('app')
//   );
// }

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const protectedRoutes = [
    "/",
    "/UserProfile",
    "/clientProfile",
    "/clientCreator",
    "/List",
    "/[userId]",
    "/profilePage",
  ];
  const isProtectedRoute = protectedRoutes.includes(ctx.pathname);
  if (!token) {
    isProtectedRoute && redirectUser(ctx, "/login");
  } else {
    try {
      const res = await axios.get(`${baseURL}/api/v1/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { stylist } = res.data;

      if (stylist) !isProtectedRoute && redirectUser(ctx, "/");
      pageProps.stylist = stylist;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps };
};

export default MyApp;
