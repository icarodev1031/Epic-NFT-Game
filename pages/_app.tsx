import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { DappProvider } from "../contexts/DappContext";
import "../styles/globals.css";
import { ToastContainer, toast} from "react-toastify";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  var {route} = useRouter();
  if (route != "/" || route != "/how-to-play"){
    return (
      <DappProvider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />
          {/* Same as */}
          <ToastContainer />
        <Component {...pageProps} />
      </DappProvider>
    );
  }else return <Component {...pageProps}/>
}

export default MyApp;