import { fetchAdminOpenShop } from "../../utils/sessions";

export const FETCH_OPEN_SHOP_REQUEST = "FETCH_OPEN_SHOP_REQUEST";
export const FETCH_OPEN_SHOP_SUCCESS = "FETCH_OPEN_SHOP_SUCCESS";
export const FETCH_OPEN_SHOP_FAILURE = "FETCH_OPEN_SHOP_FAILURE";

export const fetchOpenShopRequest = () => ({
  type: FETCH_OPEN_SHOP_REQUEST,
});

const fetchOpenShopSuccess = (shop) => ({
  type: FETCH_OPEN_SHOP_SUCCESS,
  payload: shop,
});

const fetchOpenShopFailure = (error) => ({
  type: FETCH_OPEN_SHOP_FAILURE,
  payload: error,
});

export const fetchOpenShop = () => {
  return async (dispatch) => {
    await dispatch(fetchOpenShopRequest());
    const { data, status } = await fetchAdminOpenShop();

    console.log(data, status, "shop react");
    if (status === 200) {
      await dispatch(fetchOpenShopSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchOpenShopFailure(errorMessage));
    }
  };
};
