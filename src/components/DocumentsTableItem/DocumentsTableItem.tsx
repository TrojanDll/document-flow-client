import { FC, useEffect, useState } from "react";
import styles from "./DocumentsTableItem.module.css";
import { useDeleteDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import EditDocumentModal from "../EditDocumentModal/EditDocumentModal";
import { IDocument } from "../../types/Types";
import DeleteModal from "../DeleteModal/DeleteModal";
import { EDocumentStatus } from "../../types/Enums";

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
  // const [fileUrl, setFileUrl] = useState("");
  const [modalEditDocumentShow, setModalEditDocumentShow] = useState(false);

  // const [getUserById] = useGetUserByIdMutation();
  const [deleteDocumentById] = useDeleteDocumentByIdMutation();
  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  // console.log(isUserChanged);

  // let updatedDocument: any;
  // let receivedContent = null;

  // const handleEdit = async (userId: number) => {
  //   updatedUser = await getUserById({ id: userId });
  //   setIsUserChanged(true);
  //   console.log(updatedUser.data);
  // };

  useEffect(() => {
    if (isDelete) {
      handleDeleteDocument(document.id);
    }
  }, [isDelete]);

  const handleDeleteDocument = async (docId: string) => {
    const resp = await deleteDocumentById(docId);
    console.log("Удаление пользователя");
    if (resp) {
      handleUdateTable();
    }
  };

  const statusComparison = (status: EDocumentStatus | undefined) => {
    switch (status) {
      case EDocumentStatus.APPROVED:
        return "Подтвержден";
        break;
      case EDocumentStatus.DECLINED:
        return "Отклонен";
        break;
      case EDocumentStatus.INPROGRESS:
        return "В работе";
        break;
      case EDocumentStatus.SEEN:
        return "Просмотрен";
        break;
    }
  };

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>{document.fileName}</td>
      <td>{document.owner}</td>
      <td>{document.createdDate?.slice(0, document.createdDate?.indexOf("T"))}</td>
      <td>{document.expirationDate?.slice(0, document.expirationDate?.indexOf("T"))}</td>
      <td>{statusComparison(document.status)}</td>
      <td>{document.comment}</td>
      <td>
        <div className={styles.editButtonWrapper}>
          <button onClick={() => setModalEditDocumentShow(true)} className={styles.actionButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.buttonSvg} ${styles.editSvg}`}
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>

          <EditDocumentModal
            documentData={document}
            handleUdateTable={() => handleUdateTable()}
            show={modalEditDocumentShow}
            onHide={() => setModalEditDocumentShow(false)}
          />
          <a className={styles.actionButton} href={document.url}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.buttonSvg} ${styles.downloadSvg}`}
              viewBox="0 0 16 16"
            >
              <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
          </a>
          <button className={styles.actionButton} onClick={() => setHandleHideDeleteModal(true)}>
            <svg
              className={`${styles.buttonSvg} ${styles.deleteSvg}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
          <DeleteModal
            text={`Вы уверены, что хотите удалить документ ${document.fileName}?`}
            onHide={() => setHandleHideDeleteModal(false)}
            show={handleHideDeleteModal}
            isDelete={setIsDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default DocumentsTableItem;
