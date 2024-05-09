import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditDocumentModal.module.css";
import { useGetAllUsersGroupsQuery, useUpdateUserByIdMutation } from "../../features/admin/adminApiSlice";
import { useGetAllDocumentsQuery, useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";
import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";

interface EditDocumentModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
  documentData: IDocument;
}

const EditDocumentModal: FC<EditDocumentModalProps> = (props) => {
  const { show, documentData, onHide, handleUdateTable } = props;
  // const [editUserById] = useEditD();
  const [editDocument] = useUpdateDocumentByIdMutation();
  const { data: fetchedDocuments, isLoading, isSuccess } = useGetAllDocumentsQuery();
  const { data: fetchedUsersGroups } = useGetAllUsersGroupsQuery();

  // const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();

  const [expirationDate, setExpirationDate] = useState("");
  const [currientRelatedDocId, setCurrientRelatedDocId] = useState("");
  const [relatedDocIdList, setRelatedDocIdList] = useState<string[]>([]);
  const [parentDocId, setParentDocId] = useState("");
  const [comment, setComment] = useState("");
  // const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  // const [selectedUsersGroupsIds, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<string[]>([]);
  const [status, setStatus] = useState("INPROGRESS");

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
      const udatedDocumentData = await editDocument({
        id: documentData.id,
        status: status,
        relatedDocs: relatedDocIdList,
        parentDocId: parentDocId,
        relatedUserGroupIds: usersGroupsIds,
        expirationDate: expirationDate,
        comment: documentData.comment,
      });
      console.log({
        id: documentData.id,
        status: status,
        relatedDocs: relatedDocIdList,
        parentDocId: parentDocId,
        relatedUserGroupIds: usersGroupsIds,
        expirationDate: expirationDate,
        comment: documentData.comment,
      });
      onHide();
      handleUdateTable();
      console.log(udatedDocumentData);
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

  const handleUpdateUsersGrups = (groups: string[]) => {
    setUsersGroupsIds(groups);
  };

  const handleUpdateDocuments = (documents: string[]) => {
    setRelatedDocIdList(documents);
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактирование пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditDocumentSubmit}>
          <div className={styles.inputsRow}>
            <MultiselectGroup
              currientDocumentInfo={documentData}
              usersGroups={fetchedUsersGroups ? fetchedUsersGroups : []}
              handleUpdateUsersGrups={handleUpdateUsersGrups}
            />
            <MultiselectRelatedDocs
              currientDocumentInfo={documentData}
              documents={fetchedDocuments ? fetchedDocuments : []}
              handleUpdateDocuments={handleUpdateDocuments}
            />
          </div>

          <div className={styles.inputsRow}>
            {/* <Form.Select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setParentDocId(e.target.value)}
        aria-label="Выберите документы">
        <option>Список документов</option>
        {notSelectedDocuments &&
          notSelectedDocuments.map((documents) => (
            <option key={documents.id} value={documents.id}>
              {documents.name}
            </option>
          ))}
      </Form.Select> */}
          </div>

          <div className={styles.buttonsWrapper}>
            <Button className={styles.loginButton} variant="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRefuseButton}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDocumentModal;