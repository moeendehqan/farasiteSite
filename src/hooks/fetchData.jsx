import axios from "axios";
import { useState, useEffect } from "react";

export const useGetFetchApi = (url, setData) => {
  //   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, [setData, url]);

  return { loading, error };
};

export const usePostFetchApi = (url, data) => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      // setLoading(true);
      // setError(null);
      try {
        const response = await axios.post(url, data);
        console.log( "data iisss",response.data);
      } catch (error) {
        // setError(error);
      }

      // setLoading(false);
    };
    postData();
  }, [url, data]);

  // return {   };
};
