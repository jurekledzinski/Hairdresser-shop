import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AdminDashboard.scss";

import { fetchUsers } from "../../../../reduxStore/actions/actionFetchAdmin";

import { logoutAdmin } from "../../../../utils/sessions";

import AdminAside from "../adminAside/AdminAside";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminDashboardPanel from "./AdminDashboardPanel";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((store) => store.userData);
  const { users } = dataUser;

  const [isLogOut, setIsLogOut] = useState(false);
  const [isLogOutMsg, setIsLogOutMsg] = useState(false);
  const [loadImg, setLoadImg] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const idTimeOutLogout = useRef(null);
  const idTimeOut = useRef(null);
  const history = useHistory();
  console.log(dataUser);

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
    console.log("click");
    const { data, status } = await logoutAdmin();

    console.log(data, status);

    if (status === 200) {
      setIsLogOutMsg(data.success);
      setIsLogOut(true);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    idTimeOut.current = setTimeout(() => setLoadImg(false), 700);
    return () => clearTimeout(idTimeOut.current);
  }, []);

  useEffect(() => {
    console.log(isLogOut);
    if (isLogOut) {
      idTimeOutLogout.current = setTimeout(() => history.push("/"), 1000);
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
        <div className={isOpenMenu ? "admin__left--active" : "admin__left"}>
          <header className="admin__header">
            <AdminAside
              checkSizeWindow={checkSizeWindow}
              isOpenMenu={isOpenMenu}
            />
          </header>
        </div>
        <div className={isOpenMenu ? "admin__right--active" : "admin__right"}>
          <AdminHeader
            handleCloseOpenMenu={handleCloseOpenMenu}
            handleLogout={handleLogout}
            isOpenMenu={isOpenMenu}
            isLogOutMsg={isLogOutMsg}
            loadImg={loadImg}
            users={users}
          />
          <AdminDashboardPanel isLogOutMsg={isLogOutMsg} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
