import { FC } from "react";
import styles from "./DocumentsTable.module.css";
import { Table } from "react-bootstrap";
import { DocumentsTableItemVariants } from "../DocumentsTableItem/DocumentsTableItem";
import DocumentsTableItem from "../DocumentsTableItem/DocumentsTableItem";
import { IDocument } from "../../types/Types";

interface IDocumentsTableProps {
  documents: IDocument[];
  handleUdateTable: () => void;
}

const DocumentsTable: FC<IDocumentsTableProps> = ({ documents, handleUdateTable }) => {
  console.log("Документы, которые получил компонент DocumentsTable: ");
  console.log(documents);
  return (
    <Table bordered className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Email</th>
          <th>Дата</th>
          <th>Действует до</th>
          <th>Статус</th>
          <th>Описание</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {documents.map((document, i) => (
          <DocumentsTableItem
            variant={i % 2 === 0 ? DocumentsTableItemVariants.light : DocumentsTableItemVariants.dark}
            key={document.id}
            document={document}
            number={i + 1}
            handleUdateTable={() => handleUdateTable()}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default DocumentsTable;
