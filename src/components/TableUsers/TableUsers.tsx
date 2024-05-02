import React, { FC } from "react";
import styles from "./TableUsers.module.css";
import { Table } from "react-bootstrap";

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
    </Table>
  );
};

export default TableUsers;
