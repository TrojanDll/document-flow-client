import { FC, useEffect, useState } from "react";
import styles from "./TableDocumentsGroupsItem.module.css";
import { IDocument, IDocumentGroupResponse } from "../../types/Types";
import { useGetAllDocumentsQuery, useGetDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import { Button } from "react-bootstrap";
import { useGetAllUsersGroupsQuery, useGetUsersGroupByIdMutation } from "../../features/admin/adminApiSlice";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  documentsGroup: IDocumentGroupResponse;
  variant: TableUsersItemVariants;
  number: number;
}

const TableDocumentsGroupsItem: FC<TableUsersItemProps> = ({ documentsGroup, variant, number }) => {
  const { id, name, documentIds, userGroupIds } = documentsGroup;
  console.log("documentsGroup");
  console.log(documentsGroup);

  const [getDocumentById, { isLoading: isGetDocumentByIdLoading, isSuccess: isGetDocumentByIdSuccess }] =
    useGetDocumentByIdMutation();
  // const { data: usersGroups, isSuccess: isUsersGroupsSuccess } = useGetAllUsersGroupsQuery();
  const [getUsersGroupById, { isSuccess: isGetUsersGroupByIdSuccess }] = useGetUsersGroupByIdMutation();

  const [visibleDocumentsNames, setVisibleDocumentsNames] = useState<string[]>([]);
  const [visibleUsersGroupsNames, setVisibleUsersGroupsNames] = useState<string[]>([]);

  const countOfFirstVisibleDocuments = 3;

  useEffect(() => {
    let i = 0;
    documentIds.forEach((documentId) => {
      if (i < countOfFirstVisibleDocuments) {
        getDocumentById(documentId).then((responce) => {
          console.log("responce");
          console.log(responce);
          if (isGetDocumentByIdSuccess && responce.data?.fileName) {
            setVisibleDocumentsNames([...visibleDocumentsNames, responce.data.fileName]);
          }
        });
      }
      i++;
    });

    userGroupIds.forEach((userGroupIds) => {
      getUsersGroupById(userGroupIds).then((responce) => {
        if (isGetUsersGroupByIdSuccess && responce.data) {
          setVisibleUsersGroupsNames(responce.data.map((usersGroup) => usersGroup.name));
        }
      });
    });
  }, []);

  const getMoreDocuments = () => {
    for (let i = visibleDocumentsNames.length; i < visibleDocumentsNames.length + 10; i++) {
      if (documentIds[i]) {
        getDocumentById(documentIds[i]).then((responce) => {
          if (isGetDocumentByIdSuccess && responce.data?.fileName) {
            setVisibleDocumentsNames([...visibleDocumentsNames, responce.data.fileName]);
          }
        });
      }
    }
  };

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>{name}</td>
      <td>
        {visibleUsersGroupsNames.map((usersGroupName) => (
          <div className={styles.userGroupItem}>{usersGroupName}</div>
        ))}
      </td>
      <td>
        {visibleDocumentsNames.map((documentName) => (
          <div className={styles.documentName}>{documentName}</div>
        ))}

        {visibleDocumentsNames.length > countOfFirstVisibleDocuments ? (
          <Button variant="link" onClick={getMoreDocuments}>
            Показать больше...
          </Button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default TableDocumentsGroupsItem;
