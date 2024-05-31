import { FC, useEffect, useState } from "react";
import styles from "./DocumentsTableItem.module.css";

import { IDocument } from "../../types/Types";
import { EDocumentStatus } from "../../types/Enums";

import DeleteModal from "../DeleteModal/DeleteModal";
import EditDocumentModal from "../EditDocumentModal/EditDocumentModal";
import DocumentHistoryModal from "../DocumentHistoryModal/DocumentHistoryModal";

import { useDeleteDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocumentToSend,
  deleteDocumentToSend,
  getAllDocumentsToSend,
} from "../../features/email/documentsToSendSlice";

import { RootState } from "../../app/store";

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
  const [modalEditDocumentShow, setModalEditDocumentShow] = useState(false);
  const [modalDocumentHistoryShow, setModalDocumentHistoryShow] = useState(false);
  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCurrientUserOwner, setIsCurrientUserOwner] = useState(false);
  const [isAddedToSend, setIsAddedToSend] = useState(false);

  const dispatch = useDispatch();
  const documentsToSendInState = useSelector((state: RootState) => getAllDocumentsToSend(state));

  const { data: currientUser, isSuccess: isSuccessCurrientUser } = useGetCurrientUserQuery();
  const [deleteDocumentById] = useDeleteDocumentByIdMutation();

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

  useEffect(() => {
    let flagIsToSend = false;
    documentsToSendInState.forEach((documentToSendInState) => {
      if (documentToSendInState.id === document.id) {
        flagIsToSend = true;
      }
    });
    setIsAddedToSend(flagIsToSend);
  }, [documentsToSendInState]);

  const handleDeleteDocument = async (docId: string) => {
    deleteDocumentById(docId).then(() => {
      handleUdateTable();
    });
  };

  const statusComparison = (status: EDocumentStatus | undefined) => {
    switch (status) {
      case EDocumentStatus.APPROVED:
        return "Подтвержден";
      case EDocumentStatus.DECLINED:
        return "Отклонен";
      case EDocumentStatus.INPROGRESS:
        return "В работе";
      case EDocumentStatus.SEEN:
        return "Просмотрен";
    }
  };

  const handleToggleToSendDocument = () => {
    if (isAddedToSend) {
      dispatch(deleteDocumentToSend({ docToSendId: document.id }));
      setIsAddedToSend(false);
    } else {
      dispatch(addDocumentToSend({ docToSend: document }));
      setIsAddedToSend(true);
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

  const downloadSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.buttonSvg} ${styles.downloadSvg}`} viewBox="0 0 16 16">
      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
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

  const addToSendSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#89898a"
      viewBox="0 0 16 16"
      className={`${styles.buttonSvg} ${styles.historySvg}`}
    >
      <path
        fillRule="evenodd"
        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
      />
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
    </svg>
  );

  const successSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonSvg} viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
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
            {downloadSvg}
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

          <button onClick={handleToggleToSendDocument} className={styles.actionButton}>
            {isAddedToSend ? successSvg : addToSendSvg}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentsTableItem;
