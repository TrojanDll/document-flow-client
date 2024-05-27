import { FC, useEffect, useState } from "react";
import styles from "./DocumentsTableItem.module.css";
import { useDeleteDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import EditDocumentModal from "../EditDocumentModal/EditDocumentModal";
import { IDocument } from "../../types/Types";
import DeleteModal from "../DeleteModal/DeleteModal";
import { EDocumentStatus } from "../../types/Enums";
import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";
import DocumentHistoryModal from "../DocumentHistoryModal/DocumentHistoryModal";

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
  const { data: currientUser, isSuccess: isSuccessCurrientUser } = useGetCurrientUserQuery();
  const [deleteDocumentById] = useDeleteDocumentByIdMutation();

  const [modalEditDocumentShow, setModalEditDocumentShow] = useState(false);
  const [modalDocumentHistoryShow, setModalDocumentHistoryShow] = useState(false);

  // const [getUserById] = useGetUserByIdMutation();
  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [isCurrientUserOwner, setIsCurrientUserOwner] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("role") === "ADMIN") {
      setIsCurrientUserOwner(true);
    } else if (isSuccessCurrientUser && currientUser && currientUser.email) {
      setIsCurrientUserOwner(currientUser?.email === document.owner);
    }
  }, [isSuccessCurrientUser]);

  const handleDeleteDocument = async (docId: string) => {
    const resp = await deleteDocumentById(docId);
    console.log("Удаление пользователя");
    if (resp) {
      console.log("resp");
      console.log(resp);
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

  const editSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.buttonSvg} ${styles.editSvg}`} viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path
        fillRule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
      />
    </svg>
  );

  const infoSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={`${styles.buttonSvg} ${styles.editSvg}`}>
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
    </svg>
  );

  const deleteSvg = (
    <svg className={`${styles.buttonSvg} ${styles.deleteSvg}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>
  );

  const historySvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.buttonSvg} ${styles.historySvg}`} viewBox="0 0 16 16">
      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
    </svg>
  );

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
            {isCurrientUserOwner ? editSvg : infoSvg}
          </button>

          <EditDocumentModal
            documentData={document}
            handleUdateTable={() => handleUdateTable()}
            show={modalEditDocumentShow}
            onHide={() => setModalEditDocumentShow(false)}
            isCurrientUserOwner={isCurrientUserOwner}
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

          <button onClick={() => setModalDocumentHistoryShow(true)} className={styles.actionButton}>
            {historySvg}
          </button>
          <DocumentHistoryModal
            documentData={document}
            show={modalDocumentHistoryShow}
            onHide={() => setModalDocumentHistoryShow(false)}
            isCurrientUserOwner={isCurrientUserOwner}
          />

          {isCurrientUserOwner ? (
            <button className={styles.actionButton} onClick={() => setHandleHideDeleteModal(true)}>
              {deleteSvg}
            </button>
          ) : (
            ""
          )}

          <DeleteModal
            text={`Вы уверены, что хотите удалить документ ${document.fileName}?`}
            header="Подтверждение удаления"
            buttontext="Удалить"
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
