import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProgressBar.scss";

import { removeImageFile } from "../../../reduxStore/actions/actionFile";

import useFirebaseStorage from "../../../customHooks/useFirebaseStorage";

const ProgressBar = ({ imgLink }) => {
  const dispatch = useDispatch();
  const dataFile = useSelector((store) => store.fileDate);

  const { imgUrl, progressBar } = useFirebaseStorage(
    dataFile.fileImageTestimonial || dataFile.fileImageRegister
  );

  useEffect(() => {
    if (imgUrl) {
      imgLink.current = imgUrl;
      dispatch(removeImageFile(null, null));
    }
  }, [imgUrl]);

  return (
    <div className="progressBar" style={{ width: progressBar + "%" }}></div>
  );
};

export default ProgressBar;
