import { fetchAllServices } from "../../utils/sessions";

export const FETCH_ALL_SERVICES_REQUEST = "FETCH_ALL_SERVICES_REQUEST";
export const FETCH_ALL_SERVICES_SUCCESS = "FETCH_ALL_SERVICES_SUCCESS";
export const FETCH_ALL_SERVICES_FAILURE = "FETCH_ALL_SERVICES_FAILURE";

export const fetchServicesRequestALL = () => ({
  type: FETCH_ALL_SERVICES_REQUEST,
});

const fetchServicesSuccessALL = (service) => ({
  type: FETCH_ALL_SERVICES_SUCCESS,
  payload: service,
});

const fetchServicesFailureALL = (error) => ({
  type: FETCH_ALL_SERVICES_FAILURE,
  payload: error,
});

export const fetchAllCurrentServices = () => {
  return async (dispatch) => {
    await dispatch(fetchServicesRequestALL());
    const { data, status } = await fetchAllServices();

    if (status === 200) {
      await dispatch(fetchServicesSuccessALL(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchServicesFailureALL(errorMessage));
    }
  };
};
