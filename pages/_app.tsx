import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Provider session={session}>
      <Component {...pageProps}></Component>
    </Provider>
  );
};

export default App;
