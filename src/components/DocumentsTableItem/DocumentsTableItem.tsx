import { FC, useEffect, useState } from "react";
import styles from "./DocumentsTableItem.module.css";
import { Button } from "react-bootstrap";
import { useDeleteUserByIdMutation } from "../../features/admin/adminApiSlice";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useDeleteDocumentByIdMutation, useGetAllDocumentsQuery } from "../../features/documents/documentsApiSlice";
import EditDocumentModal from "../EditDocumentModal/EditDocumentModal";

export enum DocumentsTableItemVariants {
  light = "light",
  dark = "dark",
}

interface DocumentsTableItemProps {
  document: IDocument;
  variant: DocumentsTableItemVariants;
  number: number;
  handleUdateTable: () => void;
}

const DocumentsTableItem: FC<DocumentsTableItemProps> = ({ document, variant, number, handleUdateTable }) => {
  // const [isUserChanged, setIsUserChanged] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [modalEditDocumentShow, setModalEditDocumentShow] = useState(false);

  // const [getUserById] = useGetUserByIdMutation();
  const [deleteDocumentById] = useDeleteDocumentByIdMutation();
  // console.log(isUserChanged);

  let updatedDocument: any;
  // let receivedContent = null;

  // const handleEdit = async (userId: number) => {
  //   updatedUser = await getUserById({ id: userId });
  //   setIsUserChanged(true);
  //   console.log(updatedUser.data);
  // };

  const handleDeleteDocument = async (docId: string) => {
    const resp = await deleteDocumentById(docId);
    console.log("Удаление пользователя");
    if (resp) {
      handleUdateTable();
    }
  };
  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>{document.name}</td>
      <td>{document.owner}</td>
      <td>{document.createdDate?.slice(0, document.createdDate?.indexOf("T"))}</td>
      <td>{document.expirationDate?.slice(0, document.expirationDate?.indexOf("T"))}</td>
      <td>{document.status}</td>
      <td>{document.comment}</td>
      <td>
        <div className={styles.editButtonWrapper}>
          <Button
            onClick={() => setModalEditDocumentShow(true)}
            className={styles.editButton}
            variant="outline-secondary"
          >
            Редактировать
          </Button>

          <EditDocumentModal
            documentData={document}
            handleUdateTable={() => handleUdateTable()}
            show={modalEditDocumentShow}
            onHide={() => setModalEditDocumentShow(false)}
          />
          <Button
            onClick={() => handleDeleteDocument(document.id)}
            className={styles.editButton}
            variant="outline-danger"
          >
            Удалить
          </Button>
          <Button className={styles.editButton} variant="outline-primary" as="a" href={document.url}>
            Скачать
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentsTableItem;
