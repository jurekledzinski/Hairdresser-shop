import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { removeImageFile } from "../reduxStore/actions/actionFile";

import { projectStorage } from "../firebase/config";

const useFirebseDeleteFile = (imageLink) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      const fireBaseUrlStorage = "firebasestorage";
      if (
        (history.location.pathname !== "/register-admin" &&
          Boolean(imageLink.current)) ||
        (history.location.pathname !== "/" && Boolean(imageLink.current))
      ) {
        if (
          Boolean(imageLink.current) &&
          imageLink.current?.indexOf(fireBaseUrlStorage) !== -1
        ) {
          const image = projectStorage.refFromURL(imageLink.current);
          imageLink.current = null;
          dispatch(removeImageFile(null, null, null, null, null, null));
          image
            .delete()
            .then((responese) => responese)
            .catch((err) => {
              setErrorMsg(err);
            });
        }
      }
    });
  }, [imageLink.current]);
};

export default useFirebseDeleteFile;
