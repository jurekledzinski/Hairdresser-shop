import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./AdminProfileUsers.scss";

import { fetchAllAdmins } from "../../../../reduxStore/actions/actionFetchRegisteredAdmins";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { updateAdmin } from "../../../../utils/sessions";

import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import MessagePopup from "../adminPopUpMessage/MessagePopup";

import useProfileInputs from "../adminCustomHooks/useProfileInputs";

import useRemoveAdmin from "../adminCustomHooks/useRemoveAdmin";

const AdminProfileUsers = () => {
  const dispatch = useDispatch();
  const dataAdmin = useSelector((store) => store.adminsData);
  const { admins } = dataAdmin;
  const [adminsAllData, setAdminsAllData] = useState([]);
  const [currentIdAdmin, setCurrentIdAdmin] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { handleRemoveItem } = useRemoveAdmin(
    adminsAllData,
    currentIdAdmin,
    setAdminsAllData,
    setIsOpenModal
  );
  useDeleteErrorMessage();

  const [checkBook1, setCheckBook1] = useState(false);
  const [checkBook2, setCheckBook2] = useState(false);
  const [checkBook3, setCheckBook3] = useState(false);
  const [checkCancel1, setCheckCancel1] = useState(false);
  const [checkCancel2, setCheckCancel2] = useState(false);
  const [checkCancel3, setCheckCancel3] = useState(false);
  const [checkEmails1, setCheckEmail1] = useState(false);
  const [checkEmails2, setCheckEmail2] = useState(false);
  const [checkEmails3, setCheckEmail3] = useState(false);
  const [checkGallery1, setCheckGallery1] = useState(false);
  const [checkGallery2, setCheckGallery2] = useState(false);
  const [checkGallery3, setCheckGallery3] = useState(false);
  const [checkOpinions1, setCheckOpinions1] = useState(false);
  const [checkOpinions2, setCheckOpinions2] = useState(false);
  const [checkOpinions3, setCheckOpinions3] = useState(false);
  const [checkOpenShop1, setCheckOpenShop1] = useState(false);
  const [checkOpenShop2, setCheckOpenShop2] = useState(false);
  const [checkOpenShop3, setCheckOpenShop3] = useState(false);
  const [checkServices1, setCheckServices1] = useState(false);
  const [checkServices2, setCheckServices2] = useState(false);
  const [checkServices3, setCheckServices3] = useState(false);
  const [checkPermissions1, setCheckPermissions1] = useState(false);
  const [checkPermissions2, setCheckPermissions2] = useState(false);
  const [checkPermissions3, setCheckPermissions3] = useState(false);

  const idAdmin1 = useRef();
  const idAdmin2 = useRef();
  const idAdmin3 = useRef();

  const { inputsPermissions } = useProfileInputs(
    checkBook1,
    checkBook2,
    checkBook3,
    checkCancel1,
    checkCancel2,
    checkCancel3,
    checkEmails1,
    checkEmails2,
    checkEmails3,
    checkGallery1,
    checkGallery2,
    checkGallery3,
    checkOpinions1,
    checkOpinions2,
    checkOpinions3,
    checkOpenShop1,
    checkOpenShop2,
    checkOpenShop3,
    checkServices1,
    checkServices2,
    checkServices3,
    checkPermissions1,
    checkPermissions2,
    checkPermissions3,
    setCheckBook1,
    setCheckBook2,
    setCheckBook3,
    setCheckCancel1,
    setCheckCancel2,
    setCheckCancel3,
    setCheckEmail1,
    setCheckEmail2,
    setCheckEmail3,
    setCheckGallery1,
    setCheckGallery2,
    setCheckGallery3,
    setCheckOpinions1,
    setCheckOpinions2,
    setCheckOpinions3,
    setCheckOpenShop1,
    setCheckOpenShop2,
    setCheckOpenShop3,
    setCheckServices1,
    setCheckServices2,
    setCheckServices3,
    setCheckPermissions1,
    setCheckPermissions2,
    setCheckPermissions3
  );

  const handleSubmitPermissions = async (e, adminId) => {
    e.preventDefault();

    let permissions1 = {
      id: idAdmin1.current,
      checkBook: checkBook1,
      checkCancel: checkCancel1,
      checkEmails: checkEmails1,
      checkGallery: checkGallery1,
      checkOpinions: checkOpinions1,
      checkOpenShop: checkOpenShop1,
      checkServices: checkServices1,
      checkPermissions: checkPermissions1,
    };
    let permissions2 = {
      id: idAdmin2.current,
      checkBook: checkBook2,
      checkCancel: checkCancel2,
      checkEmails: checkEmails2,
      checkGallery: checkGallery2,
      checkOpinions: checkOpinions2,
      checkOpenShop: checkOpenShop2,
      checkServices: checkServices2,
      checkPermissions: checkPermissions2,
    };
    let permissions3 = {
      id: idAdmin3.current,
      checkBook: checkBook3,
      checkCancel: checkCancel3,
      checkEmails: checkEmails3,
      checkGallery: checkGallery3,
      checkOpinions: checkOpinions3,
      checkOpenShop: checkOpenShop3,
      checkServices: checkServices3,
      checkPermissions: checkPermissions3,
    };

    const { data, status } = await updateAdmin(
      idAdmin1.current === adminId
        ? permissions1
        : idAdmin2.current === adminId
        ? permissions2
        : idAdmin3.current === adminId
        ? permissions3
        : permissions3
    );

    const { permissions } = data;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "permissionAdmin"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "permissionAdmin"));
      const updatedAdmin = adminsAllData.map((item) => {
        if (item._id === adminId) {
          return {
            ...item,
            enableBook: permissions.enableBook,
            enableCancel: permissions.enableCancel,
            enableEmails: permissions.enableEmails,
            enableGallery: permissions.enableGallery,
            enableOpenShop: permissions.enableOpenShop,
            enableOpinions: permissions.enableOpinions,
            enableServices: permissions.enableServices,
            enablePermission: permissions.enablePermission,
          };
        }
        return item;
      });

      setAdminsAllData(updatedAdmin);
    }
  };

  const handleNotRemoveItem = () => {
    setIsOpenModal(false);
  };

  const handleDeleteAdmin = async (id) => {
    setCurrentIdAdmin(id);
    setIsOpenModal(true);
  };

  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, []);

  useEffect(() => {
    if (admins.length > 0) {
      setAdminsAllData(admins);
      const [one, two, three] = admins;
      if (Boolean(one)) {
        idAdmin1.current = one._id;
        setCheckBook1(one.enableBook);
        setCheckCancel1(one.enableCancel);
        setCheckEmail1(one.enableEmails);
        setCheckGallery1(one.enableGallery);
        setCheckOpenShop1(one.enableOpenShop);
        setCheckOpinions1(one.enableOpinions);
        setCheckServices1(one.enableServices);
        setCheckPermissions1(one.enablePermission);
      }

      if (Boolean(two)) {
        idAdmin2.current = two._id;
        setCheckBook2(two.enableBook);
        setCheckCancel2(two.enableCancel);
        setCheckEmail2(two.enableEmails);
        setCheckGallery2(two.enableGallery);
        setCheckOpenShop2(two.enableOpenShop);
        setCheckOpinions2(two.enableOpinions);
        setCheckServices2(two.enableServices);
        setCheckPermissions2(two.enablePermission);
      }

      if (Boolean(three)) {
        idAdmin3.current = three._id;
        setCheckBook3(three.enableBook);
        setCheckCancel3(three.enableCancel);
        setCheckEmail3(three.enableEmails);
        setCheckGallery3(three.enableGallery);
        setCheckOpenShop3(three.enableOpenShop);
        setCheckOpinions3(three.enableOpinions);
        setCheckServices3(three.enableServices);
        setCheckPermissions3(three.enablePermission);
      }
    }
  }, [admins.length]);

  return (
    <Fragment>
      {adminsAllData.map((item) => (
        <div className="admin-profile__users" key={item._id}>
          <div className="admin-profile__left-users">
            <p className="admin-profile__title-registered">Register Admin</p>
            <div className="admin-profile__user-wrapper">
              <p className="admin-profile__name-user">Name: {item.name}</p>
              <p className="admin-profile__email-user">Email: {item.email}</p>
              <button
                className="admin-profile__delete-user"
                onClick={() => handleDeleteAdmin(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="admin-profile__right-users">
            <p className="admin-profile__title-permissions">Permissions</p>
            <form
              className="admin-profile__form-permission"
              onSubmit={(e) => handleSubmitPermissions(e, item._id)}
            >
              <div className="admin-profile__inputs-wrapper">
                {inputsPermissions.map((item1) => (
                  <label
                    htmlFor={
                      idAdmin1.current === item._id
                        ? item1.id1
                        : idAdmin2.current === item._id
                        ? item1.id2
                        : idAdmin3.current === item._id
                        ? item1.id3
                        : item1.id3
                    }
                    className="admin-profile__label-user"
                    key={uuidv4()}
                  >
                    <input
                      type="checkbox"
                      className="admin-profile__input-permission"
                      id={
                        idAdmin1.current === item._id
                          ? item1.id1
                          : idAdmin2.current === item._id
                          ? item1.id2
                          : idAdmin3.current === item._id
                          ? item1.id3
                          : item1.id3
                      }
                      checked={
                        (idAdmin1.current === item._id && item1.enable1) ||
                        (idAdmin2.current === item._id && item1.enable2) ||
                        (idAdmin3.current === item._id && item1.enable3)
                      }
                      onChange={
                        idAdmin1.current === item._id
                          ? item1.callback1
                          : idAdmin2.current === item._id
                          ? item1.callback2
                          : idAdmin3.current === item._id
                          ? item1.callback3
                          : item1.callback3
                      }
                    />
                    {item1.labelName}
                  </label>
                ))}
              </div>
              <button className="admin-profile__button-permission-confirm">
                Confirm
              </button>
            </form>
          </div>
        </div>
      ))}
      <MessagePopup
        isOpenModal={isOpenModal}
        handleRemoveItem={handleRemoveItem}
        handleNotRemoveItem={handleNotRemoveItem}
        purpose="admin"
      />
    </Fragment>
  );
};

export default AdminProfileUsers;
