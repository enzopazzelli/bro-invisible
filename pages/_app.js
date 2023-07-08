// Importa el Auth0Provider
import { Auth0Provider } from "@auth0/auth0-react";
// import '../styles/globals.css' // o cualquier otro archivo de estilos globales que tengas

function MyApp({ Component, pageProps }) {
  return (
    // Envuelve tu aplicación en el Auth0Provider
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_BASE_URL}
    >
      {/* Aquí es donde tu aplicación realmente comienza */}
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
