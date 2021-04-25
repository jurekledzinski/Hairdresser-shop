import { fetchAdminService } from "../../utils/sessions";

export const FETCH_SERVICES_REQUEST = "FETCH_SERVICES_REQUEST";
export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";
export const FETCH_SERVICES_FAILURE = "FETCH_SERVICES_FAILURE";

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

const fetchServicesSuccess = (service) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: service,
});

const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: error,
});

export const fetchServices = (type) => {
  return async (dispatch) => {
    await dispatch(fetchServicesRequest());
    const { data, status } = await fetchAdminService(type);

    console.log(data, status, "services react");
    if (status === 200) {
      await dispatch(fetchServicesSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchServicesFailure(errorMessage));
    }
  };
};
