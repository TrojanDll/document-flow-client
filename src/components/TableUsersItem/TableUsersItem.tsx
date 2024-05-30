import { FC, useEffect, useState } from "react";
import styles from "./TableUsersItem.module.css";
import {
  useActivateUserByIdMutation,
  useDeleteUserByIdMutation,
  useDisableUserByIdMutation,
} from "../../features/admin/adminApiSlice";
import EditUserModal from "../EditUserModal/EditUserModal";
import { IUser } from "../../types/Types";
import DeleteModal from "../DeleteModal/DeleteModal";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  user: IUser;
  variant: TableUsersItemVariants;
  number: number;
  handleUdateTable: () => void;
}

const TableUsersItem: FC<TableUsersItemProps> = ({ user, variant, number, handleUdateTable }) => {
  const [modalEditUserShow, setModalEditUserShow] = useState(false);
  // const [isUserChanged, setIsUserChanged] = useState(false);
  const { id, firstName, lastName, patronymic, email, department, post, groupResponseDTOs, role, active } = user;
  // const [getUserById] = useGetUserByIdMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [disableUserById] = useDisableUserByIdMutation();
  const [activateUserById] = useActivateUserByIdMutation();

  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);
  const [handleHideDisableModal, setHandleHideDisableModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  // console.log(isUserChanged);

  let updatedUser: any;
  // let receivedContent = null;

  // const handleEdit = async (userId: number) => {
  //   updatedUser = await getUserById({ id: userId });
  //   setIsUserChanged(true);
  //   console.log(updatedUser.data);
  // };

  useEffect(() => {
    if (isDelete) {
      deleteUserById(id).then(() => {
        handleUdateTable();
      });
    }
  }, [isDelete]);

  const handleActivateUser = () => {
    activateUserById(id).then(() => {
      handleUdateTable();
    });
  };

  const handleDisableUser = (isDisable: boolean) => {
    if (isDisable) {
      disableUserById(id).then(() => {
        handleUdateTable();
      });
    }
  };

  const banSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={`${styles.buttonSvg} ${styles.deleteSvg}`}>
      <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
    </svg>
  );

  const activateSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.buttonSvg} ${styles.activateSvg}`} viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
    </svg>
  );

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>
        {updatedUser ? updatedUser.data.firstName : firstName} <br />
        {updatedUser ? updatedUser.data.lastName : lastName} <br />
        {updatedUser ? updatedUser.data.lastName : patronymic} <br />
      </td>
      <td>{updatedUser ? updatedUser.data.lastName : email}</td>
      <td>
        {updatedUser
          ? updatedUser.data.department
            ? updatedUser.data.department
            : "Отдел не задан"
          : department
          ? department
          : "Отдел не задан"}
      </td>
      <td>{post}</td>
      <td>
        {groupResponseDTOs
          ? groupResponseDTOs?.map((item) => (
              <span key={item.id} className={styles.groupItem}>
                {item.name}
              </span>
            ))
          : "Группа не задана"}
      </td>
      <td>{active ? "Активен" : "Не активен"}</td>
      <td className={styles.editButtonСell}>
        <div className={styles.editButtonWrapper}>
          <button onClick={() => setModalEditUserShow(true)} className={styles.editButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.buttonSvg} ${styles.editSvg}`}
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>

          <EditUserModal
            userData={user}
            handleUdateTable={() => handleUdateTable()}
            show={modalEditUserShow}
            onHide={() => setModalEditUserShow(false)}
          />

          {role === "USER" && active ? (
            <>
              <button onClick={() => setHandleHideDisableModal(true)} className={styles.editButton}>
                {banSvg}
              </button>
              <DeleteModal
                header="Подтверждение отключения"
                buttontext="Отключить"
                text={`Вы уверены, что хотите отключить пользователя ${user.firstName} ${user.lastName} ${user.patronymic}?`}
                onHide={() => setHandleHideDisableModal(false)}
                show={handleHideDisableModal}
                isDelete={handleDisableUser}
              />
            </>
          ) : (
            ""
          )}

          {role === "USER" && !active ? (
            <>
              <button onClick={() => handleActivateUser()} className={styles.editButton}>
                {activateSvg}
              </button>
            </>
          ) : (
            ""
          )}

          {role === "USER" ? (
            <>
              <button onClick={() => setHandleHideDeleteModal(true)} className={styles.editButton}>
                <svg
                  className={`${styles.buttonSvg} ${styles.deleteSvg}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <DeleteModal
                header="Подтверждение удаления"
                buttontext="Удалить"
                text={`Вы уверены, что хотите удалить пользователя ${user.firstName} ${user.lastName} ${user.patronymic}?`}
                onHide={() => setHandleHideDeleteModal(false)}
                show={handleHideDeleteModal}
                isDelete={setIsDelete}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableUsersItem;
