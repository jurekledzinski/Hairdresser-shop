import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "../actions/actionFetchGalleryImages";

const initialState = {
  loading: false,
  images: [],
  error: "",
};

export const fetchImagesGalleryReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IMAGES_SUCCESS:
      return {
        loading: false,
        images: action.payload,
        error: "",
      };
    case FETCH_IMAGES_FAILURE:
      return {
        loading: false,
        images: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
