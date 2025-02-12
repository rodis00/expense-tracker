import { useState, useEffect } from "react";

const useLoader = (isFetching) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeElapsed(true), 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isFetching && timeElapsed) {
      setIsLoading(false);
    }
  }, [isFetching, timeElapsed]);

  return isLoading;
};

export default useLoader;
