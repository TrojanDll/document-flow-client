import { FC, useState } from "react";
import styles from "./TableUsersItem.module.css";
import { Button } from "react-bootstrap";
import { useGetUserByIdMutation } from "../../features/admin/adminApiSlice";
import CreateUserModal from "../EditUserModal/CreateUserModal";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  user: IUser;
  variant: TableUsersItemVariants;
  number: number;
}

const TableUsersItem: FC<TableUsersItemProps> = ({ user, variant, number }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isUserChanged, setIsUserChanged] = useState(false);
  const { id, firstName, lastName, patronymic, email, department, post, userGroup } = user;
  const [getUserById] = useGetUserByIdMutation();
  console.log(isUserChanged);

  let updatedUser: any;
  let receivedContent = null;

  const handleEdit = async (userId: number) => {
    updatedUser = await getUserById({ id: userId });
    setIsUserChanged(true);
    console.log(updatedUser.data);
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
            onClick={() => setModalShow(true)}
            className={styles.editButton}
            variant="outline-secondary">
            Редактировать
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TableUsersItem;
