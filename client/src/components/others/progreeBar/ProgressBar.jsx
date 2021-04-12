import React, { useEffect, useState } from "react";

import "./ProgressBar.scss";

import useFirebaseStorage from "../../../customHooks/useFirebaseStorage";

const ProgressBar = ({ fileImage, setFileImage, imgLink }) => {
  const { imgUrl, progressBar } = useFirebaseStorage(fileImage);

  useEffect(() => {
    if (imgUrl) {
      imgLink.current = imgUrl;
      setFileImage(null);
    }
  }, [imgUrl, setFileImage]);

  return (
    <div className="progressBar" style={{ width: progressBar + "%" }}></div>
  );
};

export default ProgressBar;
