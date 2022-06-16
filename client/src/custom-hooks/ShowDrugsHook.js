import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const useShowDrugs = () => {
  const [drugsArray, setDrugsArray] = useState([]);
  let source = axios.CancelToken.source();
  let unmounted = useRef();
  unmounted.current = false;
  // callback function to fetch the list of drugs from the database
  const showDrugs = useCallback(() => {
    axios
      .get("http://localhost:5000/drug", { cancelToken: source.token })
      .then((res) => {
        if (!unmounted.current) {
          const sortedDrugs = res.data.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          setDrugsArray(sortedDrugs);
        }
      })
      .catch((err) => {
        if (!unmounted.current) {
          if (axios.isCancel(err)) {
            console.log(err.message);
          } else {
            console.log(err.message);
          }
        }
      });
  }, []);

  useEffect(() => {
    showDrugs();
    return () => {
      //clean up subscription
      unmounted.current = true;
      source.cancel("cancelling in cleanup");
    };
  }, []);

  return { drugsArray, setDrugsArray, showDrugs };
};

export default useShowDrugs;
