import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AdminDashboard.scss";

import {
  clearAdminLogOut,
  fetchUsers,
} from "../../../../reduxStore/actions/actionFetchAdmin";
import { addAdminData } from "../../../../reduxStore/actions/actionAdminData";
import { fetchAllBookedOrders } from "../../../../reduxStore/actions/actionFetchBookedOrders";
import { fetchAllCanceledOrders } from "../../../../reduxStore/actions/actionFetchCanceledOrders";
import { addBookedOrder } from "../../../../reduxStore/actions/actionBookedOrders";
import { addCanceledOrder } from "../../../../reduxStore/actions/actionCanceledOrders";

import { logoutAdmin } from "../../../../utils/sessions";

import AdminAside from "../adminAside/AdminAside";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminContent from "../AdminContent";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const dataBookedOrders = useSelector((store) => store.allBookedOrdersData);
  const { allBookedOrders } = dataBookedOrders;
  const dataCanceledOrders = useSelector(
    (store) => store.allCanceledOrdersData
  );
  const { allCanceledOrders } = dataCanceledOrders;
  const dataUser = useSelector((store) => store.userData);
  const adminDateUse = useSelector((store) => store.useAdminData);
  const { users } = dataUser;

  const [isLogOut, setIsLogOut] = useState(false);
  const [isLogOutMsg, setIsLogOutMsg] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loadImg, setLoadImg] = useState(true);

  const idTimeOutLogout = useRef(null);
  const idTimeOut = useRef(null);
  const history = useHistory();

  //   console.log(allBookedOrders, " dataBookedOrders admin dashboard");
  //   console.log(
  //     allCanceledOrders,
  //     " dataCanceledOrders admin dashboard pobranie all canceled orders"
  //   );

  const [checkSizeWindow, setCheckSizeWindow] = useState(
    window.innerWidth >= 1200 ? true : false
  );

  const handleCloseOpenMenu = () => {
    setIsOpenMenu((prevValue) => !prevValue);
  };

  const checkWindowSize = () => {
    setCheckSizeWindow(window.innerWidth >= 1200 ? true : false);
  };

  const handleLogout = async () => {
    const { data, status } = await logoutAdmin();

    if (status === 200) {
      setIsLogOutMsg(data.success);
      setIsLogOut(true);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllBookedOrders());
    dispatch(fetchAllCanceledOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(users) && typeof users === "object") {
      dispatch(addAdminData(users));
    }
  }, [users]);

  useEffect(() => {
    if (allBookedOrders.length > 0) {
      allBookedOrders.forEach((item) => {
        dispatch(addBookedOrder(item));
      });
    }
  }, [allBookedOrders]);

  useEffect(() => {
    if (allCanceledOrders.length > 0) {
      allCanceledOrders.forEach((item) => {
        dispatch(addCanceledOrder(item));
      });
    }
  }, [allCanceledOrders]);

  useEffect(() => {
    idTimeOut.current = setTimeout(() => setLoadImg(false), 700);
    return () => clearTimeout(idTimeOut.current);
  }, []);

  useEffect(() => {
    if (isLogOut) {
      idTimeOutLogout.current = setTimeout(() => {
        dispatch(clearAdminLogOut());
        history.push("/"), 1000;
      });
    }
    return () => clearTimeout(idTimeOutLogout.current);
  }, [isLogOut]);

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <section className="admin">
      <div className="admin__wrapper">
        <div
          className={
            isOpenMenu ? "admin__left admin__left--active" : "admin__left"
          }
        >
          <header className="admin__header">
            <AdminAside
              checkSizeWindow={checkSizeWindow}
              isOpenMenu={isOpenMenu}
            />
          </header>
        </div>
        <div
          className={
            isOpenMenu ? "admin__right admin__right--active" : "admin__right"
          }
        >
          <AdminHeader
            handleCloseOpenMenu={handleCloseOpenMenu}
            handleLogout={handleLogout}
            isOpenMenu={isOpenMenu}
            isLogOutMsg={isLogOutMsg}
            loadImg={loadImg}
            users={users}
          />
          <AdminContent isLogOutMsg={isLogOutMsg} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
