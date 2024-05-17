import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditDocumentModal.module.css";
import {
  useGetDocumentsByMyGroupQuery,
  useUpdateDocumentByIdMutation,
} from "../../features/documents/documentsApiSlice";
import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";
import { IDocument } from "./../../types/Types";
import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import { EDocumentStatus } from "../../types/Enums";

interface EditDocumentModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
  documentData: IDocument;
  isCurrientUserOwner?: boolean;
}

const EditDocumentModal: FC<EditDocumentModalProps> = (props) => {
  const { show, documentData, onHide, handleUdateTable, isCurrientUserOwner } = props;
  // const [editUserById] = useEditD();
  const [editDocument] = useUpdateDocumentByIdMutation();
  const { data: fetchedDocuments } = useGetDocumentsByMyGroupQuery();
  // const fetchedUsersGroups: IUserGroup[] = [
  //   {
  //     id: 1,
  //     name: "sdv",
  //     members: [
  //       {
  //         id: 1,
  //       },
  //     ],
  //   },
  // ];

  // const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();

  const [expirationDate, setExpirationDate] = useState(documentData.expirationDate);
  const [selectedExpirationDate, setSelectedExpirationDate] = useState(
    documentData.expirationDate?.slice(0, documentData.expirationDate.indexOf("T"))
  );
  // const [currientRelatedDocId, setCurrientRelatedDocId] = useState("");
  const [relatedDocIdList, setRelatedDocIdList] = useState<string[]>([]);
  const [parentDocId, setParentDocId] = useState(documentData.parentDocId);
  const [comment, setComment] = useState(documentData.comment);
  // const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  // const [selectedUsersGroupsIds, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<number[]>([]);
  const [status, setStatus] = useState<EDocumentStatus>(documentData.status as EDocumentStatus);

  // useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     setNotSelectedUsersGroups(fetchedUsersGroups);
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   console.log(notSelectedUsersGroups);
  // }, [notSelectedUsersGroups]);

  const handleEditDocumentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const stringifiedUsersGroupsIds = await usersGroupsIds.map((item) => item.toString());
      editDocument({
        id: documentData.id,
        status: status ? status : EDocumentStatus.APPROVED,
        relatedDocIds: relatedDocIdList,
        parentDocId: parentDocId,
        relatedUserGroupIds: stringifiedUsersGroupsIds,
        expirationDate: expirationDate,
        comment: comment,
      }).then((udatedDocumentData) => {
        onHide();
        handleUdateTable();
        console.log("Ответ от сервера при обновленнии документов: ");
        console.log(udatedDocumentData);
      });
      console.log("Запрос на сервер на обновоение документов: ");
      console.log({
        id: documentData.id,
        status: status,
        relatedDocIds: relatedDocIdList,
        parentDocId: parentDocId,
        relatedUserGroupIds: stringifiedUsersGroupsIds,
        expirationDate: expirationDate,
        comment: comment,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefuseButton = () => {
    onHide();
  };

  // let fetchedUsersGroups;
  // useEffect(() => {
  //   console.log(userGroup);
  // }, [userGroup]);

  // const handleSelectUsersGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   notSelectedUsersGroups.forEach((item) => {
  //     if (item.id === +e.target.value) {
  //       selectedUsersGroups.push(item);
  //     }
  //   });

  //   setNotSelectedUsersGroups(
  //     notSelectedUsersGroups.filter((item) => {
  //       if (item.id !== +e.target.value) {
  //         return item;
  //       }
  //     }),
  //   );
  // };

  const handleUpdateUsersGroups = (groups: number[]) => {
    setUsersGroupsIds(groups);
  };

  const handleUpdateDocuments = (documents: string[]) => {
    setRelatedDocIdList(documents);
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toISOString();
    console.log(date);

    setSelectedExpirationDate(e.target.value);
    setExpirationDate(date);
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактирование документа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditDocumentSubmit}>
          <div className={styles.inputsRow}>
            <MultiselectGroup
              isDisabled={!isCurrientUserOwner}
              currientDocumentInfo={documentData}
              handleUpdateUsersGroups={handleUpdateUsersGroups}
            />
          </div>

          <div className={styles.inputsRow}>
            <MultiselectRelatedDocs
              isDisabled={!isCurrientUserOwner}
              isCurrientUserOwner={isCurrientUserOwner}
              currientDocumentInfo={documentData}
              documents={fetchedDocuments ? fetchedDocuments : []}
              handleUpdateDocuments={handleUpdateDocuments}
            />
          </div>

          <div className={styles.inputsRow}>
            <Form.Group controlId="department">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                disabled={!isCurrientUserOwner}
                value={status || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as EDocumentStatus)}
                aria-label="Выберите документы"
              >
                <option>Статус</option>
                <option value={EDocumentStatus.APPROVED}>Подтвержден</option>
                <option value={EDocumentStatus.SEEN}>Просмотрен</option>
                <option value={EDocumentStatus.INPROGRESS}>В работе</option>
                <option value={EDocumentStatus.DECLINED}>Отклонен</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Group controlId="department">
              <Form.Label>Родительский документ</Form.Label>
              <Form.Select
                disabled={!isCurrientUserOwner}
                value={parentDocId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setParentDocId(e.target.value)}
                aria-label="Выберите документы"
              >
                <option>Список документов</option>
                {fetchedDocuments &&
                  fetchedDocuments.map((document) => (
                    <option key={document.id} value={document.id}>
                      {document.fileName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Label htmlFor="inputPassword5">Дата завершения</Form.Label>
            <Form.Control
              disabled={!isCurrientUserOwner}
              value={selectedExpirationDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleDate(e)}
              type="date"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </div>

          <div className={styles.inputsRow}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                disabled={!isCurrientUserOwner}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </div>

          {isCurrientUserOwner ? (
            <div className={styles.buttonsWrapper}>
              <Button className={styles.loginButton} variant="primary" type="submit">
                Сохранить
              </Button>
            </div>
          ) : (
            ""
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRefuseButton}>{isCurrientUserOwner ? "Отмена" : "Закрыть"} </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDocumentModal;
