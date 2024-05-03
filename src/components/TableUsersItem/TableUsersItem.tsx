import React, { FC } from "react";
import styles from "./TableUsersItem.module.css";

interface TableUsersItemProps {
  user: IUser;
  variant: string;
}

const TableUsersItem: FC<TableUsersItemProps> = ({ user }) => {
  const { id, first_name, last_name, patronymic, email, department, post, user_group } = user;
  return (
    <tr className={styles.tableRow}>
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
