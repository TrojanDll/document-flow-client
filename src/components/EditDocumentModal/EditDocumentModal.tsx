import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import styles from "./EditDocumentModal.module.css";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import { useGetAllDocumentsQuery, useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";

import closeImg from "./../../assets/img/icons/close.svg";

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
  const {
    data: fetchedDocuments,
    isLoading: isLoadingDocuments,
    isSuccess: isSuccessDocuments,
  } = useGetAllDocumentsQuery();

  const [notSelectedRelatedDocId, setNotSelectedRelatedDocId] = useState<IDocument[]>([]);
  const [selectedRelatedDocId, setSelectedRelatedDocId] = useState<IDocument[]>([]);
  const [relatedDocIdList, setRelatedDocIdList] = useState([]);
  const [parentDocId, setParentDocId] = useState("");
  const [comment, setComment] = useState("");
  const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<IUserGroup[]>([]);

  const [currientRelatedUserGroupId, setCurrientRelatedUserGroupId] = useState(
    documentData.userGroups ? documentData.userGroups[0] : 0
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNotSelectedUsersGroups(fetchedUsersGroups);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoadingDocuments && isSuccessDocuments) {
      setNotSelectedRelatedDocId(fetchedDocuments);
    }
  }, [isLoadingDocuments]);

  const handleEditUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let relatedUserGroupIdList = selectedUsersGroups.map((group) => group.id.toString());

      const currentTimeISO = new Date().toISOString();
      const udatedDocumentData = await editDocument({
        id: documentData.id,
        relatedDocs: relatedDocIdList,
        relatedUserGroupIds: relatedUserGroupIdList,
        parentDocId: parentDocId,
        expirationDate: currentTimeISO,
        comment: comment,
      });
      console.log({
        id: documentData.id,
        relatedDocs: relatedDocIdList,
        relatedUserGroupIds: relatedUserGroupIdList,
        parentDocId: parentDocId,
        expirationDate: currentTimeISO,
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
    e.preventDefault();

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
      })
    );
  };

  const handleUnselectUsersGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const selectedId = e.currentTarget.dataset.value ? +e.currentTarget.dataset.value : 0;
    selectedUsersGroups.forEach((item) => {
      if (item.id === selectedId) {
        notSelectedUsersGroups.push(item);
      }
    });

    setSelectedUsersGroups(
      selectedUsersGroups.filter((item) => {
        if (item.id !== selectedId) {
          return item;
        }
      })
    );
  };

  const handleSelectRelatedDocument = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    notSelectedRelatedDocId.forEach((item) => {
      if (item.id === e.target.value) {
        selectedRelatedDocId.push(item);
      }
    });

    setNotSelectedRelatedDocId(
      notSelectedRelatedDocId.filter((item) => {
        if (item.id !== e.target.value) {
          return item;
        }
      })
    );
  };

  const handleUnSelectRelatedDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedId = e.currentTarget.dataset.value;
    selectedRelatedDocId.forEach((item) => {
      if (item.id === selectedId) {
        notSelectedRelatedDocId.push(item);
      }
    });

    setSelectedRelatedDocId(
      selectedRelatedDocId.filter((item) => {
        if (item.id !== selectedId) {
          return item;
        }
      })
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

              {/* Здесь идет множественный выбор элементов */}
              <Form.Select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
                aria-label="Выберите группу"
              >
                <option>Список групп</option>
                {notSelectedUsersGroups &&
                  notSelectedUsersGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </Form.Select>

              {/* Выбранные элементы */}
              <div className={styles.selectedGroups}>
                {selectedUsersGroups &&
                  selectedUsersGroups.map((group) => (
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectUsersGroup(e)}
                      key={group.id}
                      variant="outline-dark"
                      data-value={group.id}
                    >
                      {group.name}{" "}
                      <Badge style={{ backgroundColor: "inherit" }} bg="light">
                        <img className={styles.closeImg} src={closeImg} alt="closeImg" />
                      </Badge>
                    </Button>
                  ))}
              </div>
            </Form.Group>

            <Form.Group className={styles.input} controlId="department">
              <Form.Label>Связанные документы</Form.Label>

              {/* Здесь идет множественный выбор элементов */}
              <Form.Select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectRelatedDocument(e)}
                aria-label="Выберите группу"
              >
                <option>Список документов</option>
                {notSelectedRelatedDocId &&
                  notSelectedRelatedDocId.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </Form.Select>

              {/* Выбранные элементы */}
              <div className={styles.selectedGroups}>
                {selectedRelatedDocId &&
                  selectedRelatedDocId.map((group) => (
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnSelectRelatedDocument(e)}
                      key={group.id}
                      variant="outline-dark"
                      data-value={group.id}
                    >
                      {group.name}{" "}
                      <Badge style={{ backgroundColor: "inherit" }} bg="light">
                        <img className={styles.closeImg} src={closeImg} alt="closeImg" />
                      </Badge>
                    </Button>
                  ))}
              </div>
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <div className={styles.inputWrapper}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Описание</Form.Label>
                <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
              </Form.Group>
            </div>
          </div>

          {/* <div className={styles.inputsRow}>
            <Form.Label>Родительский документ</Form.Label>

            <Form.Select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectRelatedDocument(e)}
              aria-label="Выберите группу"
            >
              <option>Список документов</option>
              {fetchedDocuments &&
                fetchedDocuments.map((document) => (
                  <option key={document.id} value={document.id}>
                    {document.name}
                  </option>
                ))}
            </Form.Select>
          </div> */}

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
