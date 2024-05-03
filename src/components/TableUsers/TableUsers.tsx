import React, { FC } from "react";
import styles from "./TableUsers.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";

interface TableUsersProps {
  users: IUser[];
}

const TableUsers: FC<TableUsersProps> = ({ users }) => {
  return (
    <Table bordered className={styles.table}>
      <thead className={styles.tableHead}>
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
        {users.map((user, i) => (
          <TableUsersItem
            variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
            key={user.id}
            user={user}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
