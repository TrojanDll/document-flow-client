import { FC } from "react";
import styles from "./TableDocumentsGroups.module.css";
import { Table } from "react-bootstrap";
import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";
import { IDocumentGroupResponse, IUser } from "../../types/Types";
import TableUserItemReadonly from "../TableUserItemReadonly/TableUserItemReadonly";
import TableDocumentsGroupsItem from "../TableDocumentsGroupsItem/TableDocumentsGroupsItem";

interface ITableDocumentsGroupsProps {
  documentsGroups: IDocumentGroupResponse[];
  handleUpdateTable: () => void;
}

const TableDocumentsGroups: FC<ITableDocumentsGroupsProps> = ({ documentsGroups, handleUpdateTable }) => {
  return (
    <Table bordered className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Группы пользователей</th>
          <th>Кол-во документов</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {documentsGroups &&
          documentsGroups.map((documentsGroup, i) => (
            <TableDocumentsGroupsItem
              handleUpdateTable={handleUpdateTable}
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
