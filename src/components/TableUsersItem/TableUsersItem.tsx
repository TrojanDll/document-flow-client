import { FC, useState } from "react";
import styles from "./TableUsersItem.module.css";
import { Button } from "react-bootstrap";
import {
  useDeleteUserByIdMutation,
  useGetUserByIdMutation,
} from "../../features/admin/adminApiSlice";
import EditUserModal from "../EditUserModal/EditUserModal";

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
  const [modalUditUserShow, setModalUditUserShow] = useState(false);
  const [isUserChanged, setIsUserChanged] = useState(false);
  const { id, firstName, lastName, patronymic, email, department, post, userGroup } = user;
  const [getUserById] = useGetUserByIdMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();
  // console.log(isUserChanged);

  let updatedUser: any;
  let receivedContent = null;

  const handleEdit = async (userId: number) => {
    updatedUser = await getUserById({ id: userId });
    setIsUserChanged(true);
    console.log(updatedUser.data);
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserById(userId);
  };

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
        {updatedUser
          ? updatedUser.data.userGroup
            ? updatedUser.data.userGroup
            : "Отдел не задан"
          : userGroup
          ? userGroup
          : "Отдел не задан"}
      </td>
      <td className={styles.editButtonСell}>
        <div className={styles.editButtonWrapper}>
          <Button
            onClick={() => setModalUditUserShow(true)}
            className={styles.editButton}
            variant="outline-secondary">
            Редактировать
          </Button>

          <EditUserModal
            userData={user}
            handleUdateTable={() => handleUdateTable()} // Передача пропа handleUdateTable в компонент EditUserModal
            show={modalUditUserShow}
            onHide={() => setModalUditUserShow(false)}
          />
          <Button
            onClick={() => handleDeleteUser(id)}
            className={styles.editButton}
            variant="outline-danger">
            Удалить
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TableUsersItem;
