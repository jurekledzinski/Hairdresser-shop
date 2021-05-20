import React, { useEffect, useRef, useState } from "react";

const useLoadBgImg = (src) => {
  const [isLoad, setIsLoad] = useState(false);
  const idTimeOut = useRef(null);
  const isMount = useRef(null);

  useEffect(() => {
    isMount.current = true;

    if (isMount.current) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        idTimeOut.current = setTimeout(() => setIsLoad(true), 500);
      };
    }

    return () => {
      isMount.current = false;
      clearTimeout(idTimeOut.current);
    };
  }, [src]);

  return isLoad;
};

export default useLoadBgImg;
