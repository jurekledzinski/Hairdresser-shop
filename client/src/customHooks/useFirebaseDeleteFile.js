import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { removeImageFile } from "../reduxStore/actions/actionFile";

import { projectStorage } from "../firebase/config";

const useFirebseDeleteFile = (imgLink) => {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      const fireBaseUrlStorage = "firebasestorage";
      if (
        (history.location.pathname !== "/register-admin" &&
          Boolean(imgLink.current)) ||
        (history.location.pathname !== "/" && Boolean(imgLink.current))
      ) {
        if (
          Boolean(imgLink.current) &&
          imgLink.current.indexOf(fireBaseUrlStorage) !== -1
        ) {
          const image = projectStorage.refFromURL(imgLink.current);
          imgLink.current = null;
          dispatch(removeImageFile(null, null, null, null, null));
          image
            .delete()
            .then((responese) => responese)
            .catch((err) => {
              console.warn(err);
            });
        }
      }
    });
  }, [imgLink.current]);
};

export default useFirebseDeleteFile;
