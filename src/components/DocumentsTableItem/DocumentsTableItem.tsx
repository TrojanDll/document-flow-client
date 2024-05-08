// import { FC, useState } from "react";
// import styles from "./TableUsersItem.module.css";
// import { Button } from "react-bootstrap";
// import { useDeleteUserByIdMutation } from "../../features/admin/adminApiSlice";
// import EditUserModal from "../EditUserModal/EditUserModal";

// export enum DocumentsTableItemVariants {
//   light = "light",
//   dark = "dark",
// }

// interface DocumentsTableItemProps {
//   document: IDocument;
//   variant: DocumentsTableItemVariants;
//   number: number;
//   handleUdateTable: () => void;
// }

// const DocumentsTableItem: FC<DocumentsTableItemProps> = ({ document, variant, number, handleUdateTable }) => {
//   const [modalUditUserShow, setModalUditUserShow] = useState(false);
//   // const [isUserChanged, setIsUserChanged] = useState(false);
//   const { id, name, url,  } =
//   document;
//   // const [getUserById] = useGetUserByIdMutation();
//   const [deleteUserById] = useDeleteUserByIdMutation();
//   // console.log(isUserChanged);

//   let updatedUser: any;
//   // let receivedContent = null;

//   // const handleEdit = async (userId: number) => {
//   //   updatedUser = await getUserById({ id: userId });
//   //   setIsUserChanged(true);
//   //   console.log(updatedUser.data);
//   // };

//   const handleDeleteUser = async (userId: number) => {
//     const resp = await deleteUserById(userId);
//     console.log("Удаление пользователя");
//     if (resp) {
//       handleUdateTable();
//     }
//   };

//   return (
//     <tr className={styles[variant]}>
//       <td>{number}</td>
//       <td>
//         {updatedUser ? updatedUser.data.firstName : firstName} <br />
//         {updatedUser ? updatedUser.data.lastName : lastName} <br />
//         {updatedUser ? updatedUser.data.lastName : patronymic} <br />
//       </td>
//       <td>{updatedUser ? updatedUser.data.lastName : email}</td>
//       <td>
//         {updatedUser
//           ? updatedUser.data.department
//             ? updatedUser.data.department
//             : "Отдел не задан"
//           : department
//           ? department
//           : "Отдел не задан"}
//       </td>
//       <td>{post}</td>
//       <td>
//         {updatedUser
//           ? updatedUser.data.userGroup
//             ? updatedUser.data.userGroup
//             : "Группа не задана"
//           : groupResponseDTO?.name
//           ? groupResponseDTO.name
//           : "Группа не задана"}
//       </td>
//       <td className={styles.editButtonСell}>
//         <div className={styles.editButtonWrapper}>
//           <Button
//             onClick={() => setModalUditUserShow(true)}
//             className={styles.editButton}
//             variant="outline-secondary">
//             Редактировать
//           </Button>

//           <EditUserModal
//             userData={user}
//             handleUdateTable={() => handleUdateTable()}
//             show={modalUditUserShow}
//             onHide={() => setModalUditUserShow(false)}
//           />

//           {role === "USER" ? (
//             <Button
//               onClick={() => handleDeleteUser(id)}
//               className={styles.editButton}
//               variant="outline-danger">
//               Удалить
//             </Button>
//           ) : (
//             ""
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default DocumentsTableItem;
