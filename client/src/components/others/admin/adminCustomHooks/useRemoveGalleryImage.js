import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteImagesGallery } from "../../../../utils/sessions";

import useDeleteFileFirebase from "../../../../customHooks/useDeleteFileFirebase";

const useRemoveGalleryImage = (
  currentImages,
  idImage,
  imgUrl,
  setCurrentImages,
  setIsOpenModal
) => {
  const { deleteImgFirebase } = useDeleteFileFirebase();
  const dispatch = useDispatch();

  const deepCopyCurrentImages = () => {
    let copy = [];
    currentImages.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteImagesGallery(idImage);

    if (status === 200) {
      deleteImgFirebase(imgUrl.current);
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      let newCopy = deepCopyCurrentImages();
      const updatedImages = newCopy.filter((item) => item._id !== idImage);
      console.log(updatedImages);
      setCurrentImages(updatedImages);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveGalleryImage;
