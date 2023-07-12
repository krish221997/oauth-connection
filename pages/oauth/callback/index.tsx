import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useOauthDestinationUx } from "../../../hooks/useOauthDestinationUx";

const CallbackComponent = () => {
  const { create } = useOauthDestinationUx();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Get the code from the URL
    const code = urlParams.get("code");

    console.log(code, "code")

    // Get the state from the URL
    const state = urlParams.get("state");

    // Get the error from the URL
    const error = urlParams.get("error");

    if (error) {
      localStorage.setItem("data-received", "false");
      setTimeout(() => {
        window.close();
      }, 2000);
    }

    const fetchData = async () => {
      // Set loading to true
      setLoading(true);

      // Make a request to the server to get the data
      const response = await create({
        code,
        endpoint: "http://localhost:9000/oauth",
        headers: {
          Hello: "World",
        },
        group: "test-oauth-53",
        label: "test-oauth-53",
      });

      // If there is an error
      if (response?.error?.status === "error") {
        // Set the data in local storage
        localStorage.setItem("data-received", "false");
      } else {
        // Set the data in local storage
        localStorage.setItem("data-received", "true");
      }

      // Set loading to false
      setLoading(false);

      // Close the window
      setTimeout(() => {
        window.close();
      }, 2000);
    };

    // If there is a code, fetch the data
    code && fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!loading && (
        <h4>
          All done! Please close window if it does not close automatically!
        </h4>
      )}
      {loading && <Spinner w="50px" h="50px" thickness="4px" />}
    </div>
  );
};

export default CallbackComponent;
