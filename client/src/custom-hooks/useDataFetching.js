import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchData = (dataURL) => {
  const [data, setData] = useState([]);
  const getData = useCallback(() => {
    axios
      .get(dataURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataURL]);

  useEffect(() => {
    getData();
  }, []);

  return [data, setData];
};

export default useFetchData;
