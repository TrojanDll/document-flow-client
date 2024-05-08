import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditDocumentModal.module.css";
import { useGetAllUsersGroupsQuery, useUpdateUserByIdMutation } from "../../features/admin/adminApiSlice";
import { useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";

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
  const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();

  const [expirationDate, setExpirationDate] = useState("");
  const [currientRelatedDocId, setCurrientRelatedDocId] = useState("");
  const [relatedDocIdList, setRelatedDocIdList] = useState([]);
  const [parentDocId, setParentDocId] = useState("");
  const [comment, setComment] = useState("");
  const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<IUserGroup[]>([]);

  const [currientRelatedUserGroupId, setCurrientRelatedUserGroupId] = useState(
    documentData.userGroups ? documentData.userGroups[0] : 0,
  );
  const [relatedUserGroupIdList, setRelatedUserGroupIdList] = useState(
    documentData.userGroups ? documentData.userGroups : [],
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNotSelectedUsersGroups(fetchedUsersGroups);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(notSelectedUsersGroups);
  }, [notSelectedUsersGroups]);

  const handleEditUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const udatedDocumentData = await editDocument({
        id: documentData.id,
        relatedDocs: relatedDocIdList,
        relatedUserGroupIds: relatedUserGroupIdList,
        parentDocId: parentDocId,
        expirationDate: expirationDate,
        comment: comment,
      });
      console.log({
        id: documentData.id,
        relatedDocs: relatedDocIdList,
        relatedUserGroupIds: relatedUserGroupIdList,
        parentDocId: parentDocId,
        expirationDate: expirationDate,
        comment: comment,
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

  const handleSelectUsersGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    notSelectedUsersGroups.forEach((item) => {
      if (item.id === +e.target.value) {
        selectedUsersGroups.push(item);
      }
    });

    setNotSelectedUsersGroups(
      notSelectedUsersGroups.filter((item) => {
        if (item.id !== +e.target.value) {
          return item;
        }
      }),
    );
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактирование пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditUserSubmit}>
          <div className={styles.inputsRow}>
            <Form.Group className={styles.input} controlId="department">
              <Form.Label>Группа</Form.Label>
              <Form.Select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
                aria-label="Выберите группу">
                <option>Список групп</option>
                {notSelectedUsersGroups &&
                  notSelectedUsersGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </Form.Select>
              {selectedUsersGroups && selectedUsersGroups.map((group) => <div key={group.id}>{group.name}</div>)}
            </Form.Group>
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
