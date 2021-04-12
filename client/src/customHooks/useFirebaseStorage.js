import React, { useEffect, useRef, useState } from "react";

import { projectStorage } from "../firebase/config";

const useFirebaseStorage = (fileImage) => {
  const [progressBar, setProgressBar] = useState(0);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    const storageRef = projectStorage.ref(fileImage.name);

    storageRef.put(fileImage).on(
      "state_changed",
      (snapshot) => {
        let precentUpload =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(precentUpload);
        setProgressBar(precentUpload);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        if (isMounted.current) {
          setImgUrl(url);
        }
      }
    );
    return () => {
      isMounted.current = false;
    };
  }, [fileImage]);

  return { error, imgUrl, progressBar };
};

export default useFirebaseStorage;
