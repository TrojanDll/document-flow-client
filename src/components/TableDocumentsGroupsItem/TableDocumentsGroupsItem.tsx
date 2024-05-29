import { FC, useEffect, useState } from "react";
import styles from "./TableDocumentsGroupsItem.module.css";
import { IDocument, IDocumentGroupResponse } from "../../types/Types";
import {
  useDeleteDocumentGroupByIdMutation,
  useGetAllDocumentsQuery,
  useGetDocumentInfoByIdMutation,
} from "../../features/documents/documentsApiSlice";
import { Button } from "react-bootstrap";
import { useGetAllUsersGroupsQuery, useGetUsersGroupByIdMutation } from "../../features/admin/adminApiSlice";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditDocumentGroupModal from "../EditDocumentGroupModal/EditDocumentGroupModal";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  documentsGroup: IDocumentGroupResponse;
  variant: TableUsersItemVariants;
  number: number;
  handleUpdateTable: () => void;
}

const TableDocumentsGroupsItem: FC<TableUsersItemProps> = ({ documentsGroup, variant, number, handleUpdateTable }) => {
  const { id, name, documentIds, userGroupIds } = documentsGroup;

  // const [getDocumentInfoById, { isLoading: isGetDocumentByIdLoading, isSuccess: isGetDocumentByIdSuccess }] =
  //   useGetDocumentInfoByIdMutation();
  const [getUsersGroupById] = useGetUsersGroupByIdMutation();
  const [deleteDocumentGroupById] = useDeleteDocumentGroupByIdMutation();

  const [visibleDocumentsNames, setVisibleDocumentsNames] = useState<string[]>([]);
  const [visibleUsersGroupsNames, setVisibleUsersGroupsNames] = useState<string[]>([]);
  const [modalEditDocumentGroupShow, setModalEditDocumentGroupShow] = useState(false);
  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  // const countOfFirstVisibleDocuments = 5;

  useEffect(() => {
    // Есть проблема - стейт записывается до того как пройдут все запросы. Надо сделать Promise при запросее документов, и только потом записывать их в стейт

    // if (documentIds.length > 0) {
    //   console.log("documentIds");
    //   console.log(documentIds);
    //   const fetchingDocuments = new Promise(function (resolve) {
    //     let visibleDocumentsNamesToAdd: string[] = [];

    //     for (let i = 0; i < countOfFirstVisibleDocuments; i++) {
    //       console.log("documentIds[i]");
    //       console.log(documentIds[i]);
    //       getDocumentInfoById(documentIds[i]).then((responce) => {
    //         if (responce.data?.fileName) {
    //           visibleDocumentsNamesToAdd.push(responce.data.fileName);
    //         }
    //         if (i === countOfFirstVisibleDocuments - 1) {
    //           resolve(visibleDocumentsNamesToAdd);
    //         }
    //       });
    //     }
    //   });

    //   fetchingDocuments.then((resp) => {
    //     console.log("resp");
    //     console.log(resp);
    //     setVisibleDocumentsNames(resp as string[]);
    //   });

    const fetchingUsersGroups = new Promise(function (resolve) {
      let usersGroupsNamesToAdd: string[] = [];

      userGroupIds.forEach((userGroupId, i) => {
        getUsersGroupById(userGroupId)
          .then((responce) => {
            if (responce.data) {
              usersGroupsNamesToAdd.push(responce.data.name);
            }
          })
          .then(() => {
            if (userGroupIds.length - 1 >= i) {
              resolve(usersGroupsNamesToAdd);
            }
          });
      });
    });

    fetchingUsersGroups.then((resp) => {
      setVisibleUsersGroupsNames(resp as string[]);
    });
  }, []);

  // const getMoreDocuments = () => {
  //   for (let i = visibleDocumentsNames.length; i < visibleDocumentsNames.length + 10; i++) {
  //     if (documentIds[i]) {
  //       getDocumentInfoById(documentIds[i]).then((responce) => {
  //         if (isGetDocumentByIdSuccess && responce.data?.fileName) {
  //           setVisibleDocumentsNames([...visibleDocumentsNames, responce.data.fileName]);
  //         }
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    if (isDelete) {
      handleDocumentGroupById(id);
    }
  }, [isDelete]);

  const handleDocumentGroupById = async (docGroupId: number) => {
    const resp = await deleteDocumentGroupById(docGroupId);
    console.log("Удаление пользователя");
    if (resp) {
      console.log("resp");
      console.log(resp);
      handleUpdateTable();
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

  const deleteSvg = (
    <svg className={`${styles.buttonSvg} ${styles.deleteSvg}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>
  );

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>{name}</td>
      <td>
        {visibleUsersGroupsNames.map((usersGroupName) => (
          <div key={usersGroupName} className={styles.userGroupItem}>
            {usersGroupName}
          </div>
        ))}
      </td>
      {/* <td>
        {visibleDocumentsNames.map((documentName) => (
          <div key={documentName} className={styles.documentName}>
            {documentName}
          </div>
        ))}

        {documentIds.length > countOfFirstVisibleDocuments ? (
          <Button variant="link" onClick={getMoreDocuments}>
            Показать больше...
          </Button>
        ) : (
          ""
        )}
      </td> */}
      <td>{documentIds.length}</td>
      <td>
        <div className={styles.editButtonWrapper}>
          <button onClick={() => setModalEditDocumentGroupShow(true)} className={styles.actionButton}>
            {editSvg}
          </button>

          <EditDocumentGroupModal
            onHide={() => setModalEditDocumentGroupShow(false)}
            show={modalEditDocumentGroupShow}
            handleUpdateTable={handleUpdateTable}
            currientDocumentGroup={documentsGroup}
          />

          <button onClick={() => setHandleHideDeleteModal(true)} className={styles.actionButton}>
            {deleteSvg}
          </button>

          <DeleteModal
            text={`Вы уверены, что хотите удалить группу ${name}?`}
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

export default TableDocumentsGroupsItem;
