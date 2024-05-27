import { FC } from "react";
import styles from "./TableUsers.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";
import { IUser } from "../../types/Types";
import TableUserItemReadonly from "../TableUserItemReadonly/TableUserItemReadonly";

interface ITableUsersProps {
  users: IUser[];
  handleUdateTable: () => void;
  isReadonly?: boolean;
}

const TableUsers: FC<ITableUsersProps> = ({ users, handleUdateTable, isReadonly }) => {
  const content = (
    <>
      {isReadonly ? (
        <>
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
              <TableUserItemReadonly
                variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
                key={user.id}
                user={user}
                number={i + 1}
              />
            ))}
          </tbody>
        </>
      ) : (
        <>
          <thead className={styles.tableHead}>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>email</th>
              <th>Отдел</th>
              <th>Должность</th>
              <th>Группа</th>
              <th>Активность</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <TableUsersItem
                variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
                key={user.id}
                user={user}
                number={i + 1}
                handleUdateTable={() => handleUdateTable()}
              />
            ))}
          </tbody>
        </>
      )}
    </>
  );

  return <Table bordered>{content}</Table>;
};

export default TableUsers;
