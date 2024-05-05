import React, { FC } from "react";
import styles from "./TableUsers.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";

interface ITableUsersProps {
  users: IUser[];
}

const TableUsers: FC<ITableUsersProps> = ({ users }) => {
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
            number={i + 1}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
