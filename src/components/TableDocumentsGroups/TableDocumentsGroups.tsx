import { FC } from "react";
import styles from "./TableDocumentsGroups.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";
import { IDocumentGroupResponse, IUser } from "../../types/Types";
import TableUserItemReadonly from "../TableUserItemReadonly/TableUserItemReadonly";
import TableDocumentsGroupsItem from "../TableDocumentsGroupsItem/TableDocumentsGroupsItem";

interface ITableDocumentsGroupsProps {
  documentsGroups: IDocumentGroupResponse[];
}

const TableDocumentsGroups: FC<ITableDocumentsGroupsProps> = ({ documentsGroups }) => {
  return (
    <Table bordered className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Группы пользователей</th>
          <th>Документы в группе</th>
          <th>Кол-во документов</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {documentsGroups.map((documentsGroup, i) => (
          // <TableUserItemReadonly
          //   variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
          //   key={user.id}
          //   user={user}
          //   number={i + 1}
          // />
          <TableDocumentsGroupsItem
            variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
            key={documentsGroup.id}
            documentsGroup={documentsGroup}
            number={i + 1}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TableDocumentsGroups;
