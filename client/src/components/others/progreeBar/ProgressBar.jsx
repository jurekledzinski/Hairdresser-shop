import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProgressBar.scss";

import { removeImageFile } from "../../../reduxStore/actions/actionFile";
import { addFirebaseUrl } from "../../../reduxStore/actions/actionUrlFirebase";

import useFirebaseStorage from "../../../customHooks/useFirebaseStorage";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const dataFile = useSelector((store) => store.fileDate);
  const isMount = useRef(null);

  const { imgUrl, progressBar } = useFirebaseStorage(
    dataFile.fileImageTestimonial ||
      dataFile.fileImageRegister ||
      dataFile.fileImageGallery ||
      dataFile.fileImageGalleryEdit
  );

  useEffect(() => {
    isMount.current = true;
    if (imgUrl && isMount.current) {
      //   imgLink.current = imgUrl;
      dispatch(addFirebaseUrl(imgUrl));
      dispatch(removeImageFile(null, null, null, null));
    }
    return () => (isMount.current = false);
  }, [imgUrl]);

  return (
    <div className="progressBar" style={{ width: progressBar + "%" }}></div>
  );
};

export default ProgressBar;
