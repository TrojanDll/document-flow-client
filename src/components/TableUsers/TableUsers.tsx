import React, { FC } from "react";
import styles from "./TableUsers.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem from "../TableUsersItem/TableUsersItem";

interface TableUsersProps {
  users: IUser[];
}

const TableUsers: FC<TableUsersProps> = ({ users }) => {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          <th>email</th>
          <th>Отдел</th>
          <th>Должность</th>
          <th>Группа</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <TableUsersItem key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
