import React from "react";
import { useDispatch } from "react-redux";

import {
  addImageFile,
  removeImageFile,
} from "../../../../reduxStore/actions/actionFile";

const FILE_SIZE = 120 * 100;
const FILE_FORMATS = ["image/png", "image/jpeg"];

const useHandleFile = () => {
  const dispatch = useDispatch();

  const handleFile = (e, callbackFile, callbackTouch) => {
    callbackTouch("fileImg");
    let selectFile = e.target.files[0];
    callbackFile("fileImg", selectFile);

    if (
      Boolean(selectFile) &&
      FILE_FORMATS.includes(selectFile.type) &&
      selectFile.size <= FILE_SIZE
    ) {
      dispatch(addImageFile(selectFile, null, null, null));
    } else {
      dispatch(removeImageFile(null, null, null, null));
    }
  };

  return { handleFile };
};

export default useHandleFile;
