import React from "react";
import { useDispatch } from "react-redux";

import {
  addImageFile,
  removeImageFile,
} from "../../../../reduxStore/actions/actionFile";

const FILE_SIZE = 640 * 480;
const FILE_FORMATS = ["image/png", "image/jpeg"];

const useHandleGalleryEditImage = () => {
  const dispatch = useDispatch();

  const handleFileEdit = (e, callbackFile, callbackTouch) => {
    callbackTouch("fileImg");

    let currentEditTime = new Date();
    let timeEditMilliseconds = currentEditTime.getTime().toString();

    let selectFile = e.target.files[0];

    Object.defineProperty(selectFile, "name", {
      value: selectFile.name,
      writable: true,
    });

    selectFile.name = `${selectFile.name}-${timeEditMilliseconds}`;

    callbackFile("fileImg", selectFile);

    if (
      Boolean(selectFile) &&
      FILE_FORMATS.includes(selectFile.type) &&
      selectFile.size <= FILE_SIZE
    ) {
      dispatch(addImageFile(null, null, null, selectFile, null, null, null));
    } else {
      dispatch(removeImageFile(null, null, null, null, null, null, null));
    }
  };

  return { handleFileEdit };
};

export default useHandleGalleryEditImage;
