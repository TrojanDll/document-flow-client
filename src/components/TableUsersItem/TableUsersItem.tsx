import React, { FC } from "react";
import styles from "./TableUsersItem.module.css";
import { useDispatch } from "react-redux";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  user: IUser;
  variant: TableUsersItemVariants;
}

const TableUsersItem: FC<TableUsersItemProps> = ({ user, variant }) => {
  const { id, first_name, last_name, patronymic, email, department, post, user_group } = user;

  const dispatch = useDispatch();

  return (
    <tr className={styles[variant]}>
      <td>{id}</td>
      <td>
        {first_name} <br />
        {last_name} <br />
        {patronymic} <br />
      </td>
      <td>{email}</td>
      <td>{department}</td>
      <td>{post}</td>
      <td>{user_group}</td>
    </tr>
  );
};

export default TableUsersItem;
