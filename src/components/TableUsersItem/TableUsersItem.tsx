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
  number: number;
}

const TableUsersItem: FC<TableUsersItemProps> = ({ user, variant, number }) => {
  const { firstName, lastName, patronymic, email, department, post, userGroup } = user;

  const dispatch = useDispatch();

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
    </tr>
  );
};

export default TableUsersItem;
