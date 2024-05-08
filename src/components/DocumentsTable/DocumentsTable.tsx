// import { FC } from "react";
// import styles from "./TableUsers.module.css";
// import { Table } from "react-bootstrap";
// import TableUsersItem, { TableUsersItemVariants } from "../TableUsersItem/TableUsersItem";

// interface IDocumentsTableProps {
//   documents: IDocument[];
//   handleUdateTable: () => void;
// }

// const DocumentsTable: FC<IDocumentsTableProps> = ({ documents, handleUdateTable }) => {
//   return (
//     <Table bordered className={styles.table}>
//       <thead className={styles.tableHead}>
//         <tr>
//           <th>№</th>
//           <th>ФИО</th>
//           <th>email</th>
//           <th>Отдел</th>
//           <th>Должность</th>
//           <th>Группа</th>
//           <th></th>
//         </tr>
//       </thead>

//       <tbody>
//         {documents.map((document, i) => (
//           <TableUsersItem
//             variant={i % 2 === 0 ? TableUsersItemVariants.light : TableUsersItemVariants.dark}
//             key={document.id}
//             document={document}
//             number={i + 1}
//             handleUdateTable={() => handleUdateTable()}
//           />
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default DocumentsTable;
