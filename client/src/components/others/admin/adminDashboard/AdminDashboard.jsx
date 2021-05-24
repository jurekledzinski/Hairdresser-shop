import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AdminDashboard.scss";

import {
  clearAdminLogOut,
  fetchUsers,
} from "../../../../reduxStore/actions/actionFetchAdmin";
import {
  addAdminData,
  clearAdminData,
} from "../../../../reduxStore/actions/actionAdminData";
import {
  clearFetchedOrdersBooked,
  fetchAllBookedOrders,
} from "../../../../reduxStore/actions/actionFetchBookedOrders";
import {
  clearFetchCanceledOrders,
  fetchAllCanceledOrders,
} from "../../../../reduxStore/actions/actionFetchCanceledOrders";
import {
  addBookedOrder,
  clearBookedOrder,
} from "../../../../reduxStore/actions/actionBookedOrders";
import {
  addCanceledOrder,
  clearCanceledOrder,
} from "../../../../reduxStore/actions/actionCanceledOrders";
import {
  clearFetchBookingAmountMonthShop,
  fetchBookingsMadeAtShop,
} from "../../../../reduxStore/actions/actionFetchAmountBookingsPerMonthInShop";
import {
  addBookingMonthShop,
  clearBookingMonthShop,
} from "../../../../reduxStore/actions/actionBookingsMadeAtShop";
import {
  clearFetchBookingsMonthWebsite,
  fetchBookingsMadeAtWebsite,
} from "../../../../reduxStore/actions/actionFetchAmountBookingsPerMonthInWebsite";
import {
  addBookingMonthWebsite,
  clearBookingMonthWebsite,
} from "../../../../reduxStore/actions/actionBookingsMadeAtWebsite";
import {
  clearFetchPaymentsMonthShop,
  fetchPaymentsMadeAtShop,
} from "../../../../reduxStore/actions/actionFetchPaymentsMonthShop";
import {
  fetchPaymentsMadeAtWebsite,
  clearFetchPaymentsMonthWebsite,
} from "../../../../reduxStore/actions/actionFetchPaymentsMonthWebsite";
import {
  addPaymentsMonthShop,
  clearPaymentsMonthShop,
} from "../../../../reduxStore/actions/actionPaymentsMonthShop";
import {
  addPaymentsMonthWebsite,
  clearPaymentsMonthWebsite,
} from "../../../../reduxStore/actions/actionPaymentsMonthWebsite";
import {
  clearFetchEmails,
  fetchEmails,
} from "../../../../reduxStore/actions/actionFetchEmails";
import {
  addEmail,
  clearEmailData,
} from "../../../../reduxStore/actions/actionEmailsData";
import {
  clearFetchOpinions,
  fetchOpinions,
} from "../../../../reduxStore/actions/actionFetchOpinions";
import {
  addOpinion,
  clearOpinionData,
} from "../../../../reduxStore/actions/actionOpinionsData";
import { clearFetchImagesGallery } from "../../../../reduxStore/actions/actionFetchGalleryImages";
import { clearImageFile } from "../../../../reduxStore/actions/actionFile";
import { clearFetchPermissionRegister } from "../../../../reduxStore/actions/actionFetchPermissionRegister";
import { clearFetchRegisterAdmins } from "../../../../reduxStore/actions/actionFetchRegisteredAdmins";
import { clearFetchServices } from "../../../../reduxStore/actions/actionFetchServices";
import { clearFetchShopOpen } from "../../../../reduxStore/actions/actionFetchOpenShop";

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
  const { users } = dataUser;
  const bookingsMadeAtShop = useSelector(
    (store) => store.amountBookingsDataShop
  );
  const { bookingsShop } = bookingsMadeAtShop;
  const bookingsMadeAtWebsite = useSelector(
    (store) => store.amountBookingsDataWebsite
  );
  const { bookingsWebsite } = bookingsMadeAtWebsite;
  const paymentsFetchedShop = useSelector(
    (store) => store.paymentsDataFetchShop
  );
  const { paymentsShop } = paymentsFetchedShop;
  const paymentsFetchedWebsite = useSelector(
    (store) => store.paymentsDataFetchWebsite
  );
  const { paymentsWebsite } = paymentsFetchedWebsite;
  const dataEmails = useSelector((store) => store.emailsData);
  const { emails } = dataEmails;
  const dataOpinions = useSelector((store) => store.opinionsData);
  const { opinions } = dataOpinions;

  const [isLogOut, setIsLogOut] = useState(false);
  const [isLogOutMsg, setIsLogOutMsg] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loadImg, setLoadImg] = useState(true);

  const idTimeOutLogout = useRef(null);
  const idTimeOut = useRef(null);
  const history = useHistory();

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
    dispatch(fetchBookingsMadeAtShop());
    dispatch(fetchBookingsMadeAtWebsite());
    dispatch(fetchPaymentsMadeAtShop());
    dispatch(fetchPaymentsMadeAtWebsite());
    dispatch(fetchEmails());
    dispatch(fetchOpinions());
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
        dispatch(clearAdminData());
        dispatch(clearFetchedOrdersBooked());
        dispatch(clearFetchCanceledOrders());
        dispatch(clearBookedOrder());
        dispatch(clearCanceledOrder());
        dispatch(clearFetchBookingAmountMonthShop());
        dispatch(clearBookingMonthShop());
        dispatch(clearFetchBookingsMonthWebsite());
        dispatch(clearBookingMonthWebsite());
        dispatch(clearFetchPaymentsMonthShop());
        dispatch(clearFetchPaymentsMonthWebsite());
        dispatch(clearPaymentsMonthShop());
        dispatch(clearPaymentsMonthWebsite());
        dispatch(clearFetchEmails());
        dispatch(clearEmailData());
        dispatch(clearFetchOpinions());
        dispatch(clearOpinionData());
        dispatch(clearFetchImagesGallery());
        dispatch(clearImageFile());
        dispatch(clearFetchPermissionRegister());
        dispatch(clearFetchRegisterAdmins());
        dispatch(clearFetchServices());
        dispatch(clearFetchShopOpen());
        history.push("/"), 1000;
      }, 1000);
    }
    return () => clearTimeout(idTimeOutLogout.current);
  }, [isLogOut]);

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  useEffect(() => {
    if (bookingsShop.length > 0) {
      const bookedMonthsShop = bookingsShop.map((item) => item.month);
      const amountBookedShop = bookingsShop.map((item) => item.count);

      const dataBookings = {
        months: bookedMonthsShop,
        amount: amountBookedShop,
      };

      dispatch(addBookingMonthShop(dataBookings));
    }
  }, [bookingsShop]);

  useEffect(() => {
    if (bookingsWebsite.length > 0) {
      const bookedMonthsShop = bookingsWebsite.map((item) => item.month);
      const amountBookedShop = bookingsWebsite.map((item) => item.count);

      const dataBookings = {
        months: bookedMonthsShop,
        amount: amountBookedShop,
      };

      dispatch(addBookingMonthWebsite(dataBookings));
    }
  }, [bookingsWebsite]);

  useEffect(() => {
    if (paymentsShop.length > 0) {
      const totalPaymentMonthsShop = paymentsShop.map((item) => item.total);
      const paymentsMonthsShop = paymentsShop.map((item) => item.month);

      const dataShop = {
        months: paymentsMonthsShop,
        total: totalPaymentMonthsShop,
      };

      dispatch(addPaymentsMonthShop(dataShop));
    }
  }, [paymentsShop]);

  useEffect(() => {
    if (paymentsWebsite.length > 0) {
      const totalPaymentMonthsWebsite = paymentsWebsite.map(
        (item) => item.total
      );
      const paymentsMonthsWebsite = paymentsWebsite.map((item) => item.month);

      const dataWebsite = {
        months: paymentsMonthsWebsite,
        total: totalPaymentMonthsWebsite,
      };

      dispatch(addPaymentsMonthWebsite(dataWebsite));
    }
  }, [paymentsWebsite]);

  useEffect(() => {
    if (emails.length > 0) {
      emails.forEach((item) => {
        dispatch(addEmail(item));
      });
    }
  }, [emails]);

  useEffect(() => {
    if (opinions.length > 0) {
      opinions.forEach((item) => {
        dispatch(addOpinion(item));
      });
    }
  }, [opinions]);

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
