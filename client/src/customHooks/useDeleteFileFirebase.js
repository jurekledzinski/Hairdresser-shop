import React from "react";

import { useDispatch } from "react-redux";

import { removeImageFile } from "../reduxStore/actions/actionFile";

import { projectStorage } from "../firebase/config";

const useDeleteFileFirebase = () => {
  const dispatch = useDispatch();

  const deleteImgFirebase = (imgLink) => {
    console.log(imgLink, " imgLink w usun zdjecie po klik delete");
    const fireBaseUrlStorage = "firebasestorage";
    if (Boolean(imgLink) && imgLink.indexOf(fireBaseUrlStorage) !== -1) {
      const image = projectStorage.refFromURL(imgLink);
      imgLink = null;
      dispatch(removeImageFile(null, null, null, null, null, null));
      image
        .delete()
        .then((responese) => responese)
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return { deleteImgFirebase };
};

export default useDeleteFileFirebase;
