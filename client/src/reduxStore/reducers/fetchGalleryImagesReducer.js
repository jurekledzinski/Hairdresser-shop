import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  CLEAR_FETCH_IMAGES,
} from "../actions/actionFetchGalleryImages";

const initialState = {
  loading: false,
  images: [],
  error: "",
};

export const fetchImagesGalleryReducer = (state = initialState, action) => {
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
    case CLEAR_FETCH_IMAGES:
      return initialState;
    default:
      return state;
  }
};
