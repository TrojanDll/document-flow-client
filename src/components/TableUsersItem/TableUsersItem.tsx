import React, { FC, useEffect, useState } from "react";
import styles from "./TableUsersItem.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import {
  useGetUserByIdMutation,
  useUpdateUserByIdMutation,
} from "../../features/admin/adminApiSlice";
import axios from "axios";
import { BASE_URL } from "../../app/api/apiSlice";

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
  const [isUserChanged, setIsUserChanged] = useState(false);
  const { id, firstName, lastName, patronymic, email, department, post, userGroup } = user;
  const [getUserById, { isLoading }] = useGetUserByIdMutation();

  let updatedUser: any;
  let content;

  const handleEdit = async (userId: number) => {
    updatedUser = await getUserById({ id: userId });
    setIsUserChanged(true);
    console.log(updatedUser.data);
    content = (
      <tr className={styles[variant]}>
        <td>{number}</td>
        <td>
          {updatedUser.data.firstName} <br />
          {updatedUser.data.lastName} <br />
          {updatedUser.data.patronymic} <br />
        </td>
        <td>{updatedUser.data.email}</td>
        <td>{updatedUser.data.department}</td>
        <td>{updatedUser.data.post}</td>
        <td>{updatedUser.data.userGroup}</td>
        <td className={styles.editButtonСell}>
          <div className={styles.editButtonWrapper}>
            <Button
              onClick={() => handleEdit(id)}
              className={styles.editButton}
              variant="outline-secondary">
              Редактировать
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>
        {firstName} <br />
        {lastName} <br />
        {patronymic} <br />
      </td>
      <td>{email}</td>
      <td>{department}</td>
      <td>{post}</td>
      <td>{userGroup}</td>
      <td className={styles.editButtonСell}>
        <div className={styles.editButtonWrapper}>
          <Button
            onClick={() => handleEdit(id)}
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
