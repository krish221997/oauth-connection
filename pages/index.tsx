import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useOauthDestinationUx } from "../hooks/useOauthDestinationUx";


// This is what the client uses on the frontend to open the authorization window
export default function Home() {

  const { open } = useOauthDestinationUx();

  const [loading, setLoading] = useState(false);

  const [dataReceived, setDataReceived] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading) {
      let timeoutId;
      const checkLocalStorage = () => {
        const isDataReceived = localStorage.getItem("data-received");
        if (isDataReceived === "true") {
          setLoading(false);
          localStorage.removeItem("data-received");
          setDataReceived(true);
        } else if (isDataReceived === "false") {
          setLoading(false);
          localStorage.removeItem("data-received");
          setError(true);
        } else {
          timeoutId = setTimeout(checkLocalStorage, 500);
        }
      };

      checkLocalStorage();

      // Cleanup function
      return () => {
        clearTimeout(timeoutId); // Clear the timeout when the component unmounts
      };
    }
  }, [loading]);

  const handleXeroClick = () => {
    open();
    setLoading(true);
  };

  const handleSageClick = () => {
    window.open(
      `https://www.sageone.com/oauth2/auth/central?filter=apiv3.1&response_type=code&client_id=${process.env.NEXT_PUBLIC_SAGE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SAGE_REDIRECT_URI}&scope=full_access`,
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a>Oauth Connections</a>
        </h1>

        <p className={styles.description}>
          Get started by clicking on the following cards:
        </p>

        <div className={styles.grid}>
          {!loading && !dataReceived && !error && (
            <a onClick={handleXeroClick} className={styles.card}>
              <h3>Xero &rarr;</h3>
              <p>Connect your Xero account by clicking here.</p>
            </a>
          )}
          {loading && (
            <a
              className={styles.card}
              style={{ textAlign: "center", backgroundColor: "#d2d2d3" }}
            >
              {/* <h3>Loading...</h3> */}
              <Spinner
                w="65px"
                h="65px"
                mb="4"
                thickness="4px"
                color="#4c4d4f"
              />
              <p>Connecting...</p>
            </a>
          )}

          {!loading && dataReceived && (
            <a className={styles.card} style={{ textAlign: "center" }}>
              <CheckCircleIcon w="65px" h="65px" color="green" />
              {/* <h3>Loading...</h3> */}

              <p>Connected</p>
            </a>
          )}

          {!loading && error && (
            <a className={styles.card} style={{ textAlign: "center" }}>
              <WarningTwoIcon w="65px" h="65px" color="red" />
              {/* <h3>Loading...</h3> */}

              <p>Failed to connect</p>
            </a>
          )}

          <a onClick={handleSageClick} className={styles.card}>
            <h3>Sage &rarr;</h3>
            <p>Connect your Sage account by clicking here.</p>
          </a>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .loader {
          font-size: 10px;
          margin: 50px auto;
          text-indent: -9999em;
          width: 11em;
          height: 11em;
          border-radius: 50%;
          background: #ffffff;
          background: -moz-linear-gradient(
            left,
            #ffffff 10%,
            rgba(255, 255, 255, 0) 42%
          );
          background: -webkit-linear-gradient(
            left,
            #ffffff 10%,
            rgba(255, 255, 255, 0) 42%
          );
          background: -o-linear-gradient(
            left,
            #ffffff 10%,
            rgba(255, 255, 255, 0) 42%
          );
          background: -ms-linear-gradient(
            left,
            #ffffff 10%,
            rgba(255, 255, 255, 0) 42%
          );
          background: linear-gradient(
            to right,
            #ffffff 10%,
            rgba(255, 255, 255, 0) 42%
          );
          position: relative;
          -webkit-animation: load3 1.4s infinite linear;
          animation: load3 1.4s infinite linear;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
        }
        .loader:before {
          width: 50%;
          height: 50%;
          background: #ffffff;
          border-radius: 100% 0 0 0;
          position: absolute;
          top: 0;
          left: 0;
          content: "";
        }
        .loader:after {
          background: #0dc5c1;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          content: "";
          margin: auto;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        @-webkit-keyframes load3 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load3 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
