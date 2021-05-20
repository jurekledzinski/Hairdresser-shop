import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProgressBar.scss";

import { addFirebaseUrl } from "../../../reduxStore/actions/actionFirebseUrl";

import { removeImageFile } from "../../../reduxStore/actions/actionFile";

import useFirebaseStorage from "../../../customHooks/useFirebaseStorage";

const ProgressBar = ({ imgLink, imamgeNewEditLink }) => {
  const dispatch = useDispatch();
  const dataFile = useSelector((store) => store.fileDate);
  const isMount = useRef(null);

  const { imgUrl, progressBar } = useFirebaseStorage(
    dataFile.fileImageTestimonial ||
      dataFile.fileImageRegister ||
      dataFile.fileImageGallery ||
      dataFile.fileImageGalleryEdit ||
      dataFile.fileImageEditProfile ||
      dataFile.fileImageService ||
      dataFile.fileEditImageService
  );

  useEffect(() => {
    isMount.current = true;
    if (imgUrl && isMount.current) {
      imgLink ? (imgLink.current = imgUrl) : null;
      imamgeNewEditLink ? (imamgeNewEditLink.current = imgUrl) : null;
      //   dispatch(addFirebaseUrl(imgUrl));
      dispatch(removeImageFile(null, null, null, null, null, null, null));
    }
    return () => (isMount.current = false);
  }, [imgUrl]);

  return (
    <div className="progressBar" style={{ width: progressBar + "%" }}></div>
  );
};

export default ProgressBar;
