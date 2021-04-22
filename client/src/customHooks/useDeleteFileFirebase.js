import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { removeImageFile } from "../reduxStore/actions/actionFile";

import { projectStorage } from "../firebase/config";

const useDeleteFileFirebase = () => {
  const dispatch = useDispatch();

  const deleteImgFirebase = (imgLink) => {
    console.log(imgLink, " w useDelete file firebase");
    const fireBaseUrlStorage = "firebasestorage";
    if (Boolean(imgLink) && imgLink.indexOf(fireBaseUrlStorage) !== -1) {
      const image = projectStorage.refFromURL(imgLink);
      imgLink = null;
      dispatch(removeImageFile(null, null, null, null));
      image
        .delete()
        .then((responese) => responese)
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  //   useEffect(() => {
  //     const fireBaseUrlStorage = "firebasestorage";
  //     if (
  //       Boolean(imgLink.current) &&
  //       imgLink.current.indexOf(fireBaseUrlStorage) !== -1
  //     ) {
  //       const image = projectStorage.refFromURL(imgLink.current);
  //       imgLink.current = null;
  //       dispatch(removeImageFile(null, null));
  //       image
  //         .delete()
  //         .then((responese) => responese)
  //         .catch((err) => {
  //           console.warn(err);
  //         });
  //     }
  //   }, [imgLink]);

  return { deleteImgFirebase };
};

export default useDeleteFileFirebase;
