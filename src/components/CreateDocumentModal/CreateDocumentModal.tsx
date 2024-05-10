import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CreateDocumentModal.module.css";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../app/api/apiSlice";
import { useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import { EDocumentStatus, IDocument } from "../../types/Types";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";
import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";

interface CreateDocumentModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  handleUdateTable: () => void;
  fetchedDocuments: IDocument[];
  // documentData: IDocument;
}

const CreateDocumentModal: FC<CreateDocumentModalProps> = (props) => {
  const { show, onHide, handleUdateTable, fetchedDocuments } = props;
  // Понять как получить текущий документ

  // const [documentData, setDocumentData] = useState<IDocument>();
  const [file, setFile] = useState<File | null>(null);
  const [editDocument] = useUpdateDocumentByIdMutation();
  const { data: fetchedUsersGroups } = useGetAllUsersGroupsQuery();

  // const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();

  const [expirationDate, setExpirationDate] = useState("");
  const [selectedExpirationDate, setSelectedExpirationDate] = useState("");
  // const [currientRelatedDocId, setCurrientRelatedDocId] = useState("");
  const [relatedDocIdList, setRelatedDocIdList] = useState<string[]>([]);
  const [parentDocId, setParentDocId] = useState("");
  const [comment, setComment] = useState("");
  // const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  // const [selectedUsersGroupsIds, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<string[]>([]);
  const [status, setStatus] = useState<EDocumentStatus>(EDocumentStatus.APPROVED);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleUploadFile = async () => {
    props.onHide();
    if (file) {
      // uploadDocument(file).then((resp) => {
      //   console.log(resp);
      // });

      try {
        axios({
          method: "POST",
          url: `${BASE_URL}/api/docs/upload`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
          data: {
            file,
          },
        }).then((response: AxiosResponse<IDocument>) => {
          if (response) {
            handleEditDocumentSubmit(response.data);
          }
        }).then;
      } catch (err) {
        console.log(err);
        const refreshResult = await axios({
          method: "POST",
          url: `${BASE_URL}/api/auth/refreshtoken`,
          data: { token: localStorage.getItem("refreshToken") },
        });
        if (refreshResult.data) {
          localStorage.setItem("accessToken", refreshResult.data.accessToken);
          localStorage.setItem("accessToken", refreshResult.data.refreshToken);

          const response = await axios({
            method: "POST",
            url: `${BASE_URL}/api/docs/upload`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
            data: {
              file,
            },
          });
          if (response) {
            handleUdateTable();
          }
        }
      }

      // refetch().then(() => {
      //   console.log(data);
      // });
    }
  };

  const handleEditDocumentSubmit = async (documentData: IDocument) => {
    if (documentData) {
      try {
        const udatedDocumentData = await editDocument({
          id: documentData.id,
          status: status ? status : EDocumentStatus.APPROVED,
          relatedDocs: relatedDocIdList,
          parentDocId: parentDocId,
          relatedUserGroupIds: usersGroupsIds,
          expirationDate: expirationDate,
          comment: comment,
        });
        console.log({
          id: documentData.id,
          status: status,
          relatedDocs: relatedDocIdList,
          parentDocId: parentDocId,
          relatedUserGroupIds: usersGroupsIds,
          expirationDate: expirationDate,
          comment: comment,
        });
        onHide();
        handleUdateTable();
        console.log(udatedDocumentData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateUsersGrups = (groups: string[]) => {
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
        <Modal.Title id="contained-modal-title-vcenter">Добавление документа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Загрузите файл</Form.Label>
          <Form.Control
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files ? e.target.files[0] : e.target.files)
            }
          />
        </Form.Group>

        <Form>
          <div className={styles.inputsRow}>
            <MultiselectGroup
              usersGroups={fetchedUsersGroups ? fetchedUsersGroups : []}
              handleUpdateUsersGrups={handleUpdateUsersGrups}
            />
          </div>

          <div className={styles.inputsRow}>
            <MultiselectRelatedDocs
              documents={fetchedDocuments ? fetchedDocuments : []}
              handleUpdateDocuments={handleUpdateDocuments}
            />
          </div>

          <div className={styles.inputsRow}>
            <Form.Group controlId="department">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                value={status || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as EDocumentStatus)}
                aria-label="Выберите документы">
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
                value={parentDocId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setParentDocId(e.target.value)}
                aria-label="Выберите документы">
                <option>Список документов</option>
                {fetchedDocuments &&
                  fetchedDocuments.map((document) => (
                    <option key={document.id} value={document.parentDocId}>
                      {document.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Label htmlFor="inputPassword5">Дата завершения</Form.Label>
            <Form.Control
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
              <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
            </Form.Group>
          </div>
        </Form>

        {/* <div className={styles.descr}>
          Добавить данные вы см
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUploadFile}>Отправить</Button>
        <Button onClick={props.onHide} variant="secondary">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDocumentModal;
