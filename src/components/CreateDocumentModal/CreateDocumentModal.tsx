import { ChangeEvent, FC, useState } from "react";
import { BASE_URL } from "../../app/api/apiSlice";
import axios, { AxiosResponse } from "axios";

import styles from "./CreateDocumentModal.module.css";
import { Button, Form, Modal } from "react-bootstrap";

import {
  useAddPrivatedUserToDocumentUsersMutation,
  useGetAllDocumentsGroupsQuery,
  useRemovePrivatedUserToDocumentUsersMutation,
  useUpdateDocumentByIdMutation,
} from "../../features/documents/documentsApiSlice";

import { useGetUsersQuery } from "../../features/admin/adminApiSlice";
import { IDocument, IUser } from "../../types/Types";
import { EDocumentStatus } from "../../types/Enums";

import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";
import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";
import MultiselectUsers from "../MultiselectUsers/MultiselectUsers";

interface CreateDocumentModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  handleUdateTable: () => void;
  fetchedDocuments: IDocument[];
}

const CreateDocumentModal: FC<CreateDocumentModalProps> = (props) => {
  const { show, onHide, handleUdateTable, fetchedDocuments } = props;

  const [file, setFile] = useState<File | null>(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [selectedExpirationDate, setSelectedExpirationDate] = useState("");
  const [relatedDocIdList, setRelatedDocIdList] = useState<string[]>([]);
  const [parentDocId, setParentDocId] = useState("");
  const [comment, setComment] = useState("");
  const [usersGroupsIds, setUsersGroupsIds] = useState<number[]>([]);
  const [status, setStatus] = useState<EDocumentStatus>(EDocumentStatus.APPROVED);
  const [documentGroupId, setDocumentGroupId] = useState<number>();
  const [privatUsersIds, setPrivatUsersIds] = useState<number[]>([]);

  const { data: fetchedDocumentGroups } = useGetAllDocumentsGroupsQuery();
  const [editCreateDocument] = useUpdateDocumentByIdMutation();
  const [addPrivatUser] = useAddPrivatedUserToDocumentUsersMutation();
  const [removePrivatUser] = useRemovePrivatedUserToDocumentUsersMutation();
  const { data: fetchedUsers } = useGetUsersQuery();

  const handleUploadFile = async () => {
    props.onHide();
    if (file) {
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
    }
  };

  const handleEditDocumentSubmit = async (documentData: IDocument) => {
    if (documentData) {
      try {
        editCreateDocument({
          id: documentData.id,
          status: status ? status : EDocumentStatus.APPROVED,
          relatedDocIds: relatedDocIdList,
          parentDocId: parentDocId,
          relatedUserGroupIds: usersGroupsIds.map((item) => item.toString()),
          expirationDate: expirationDate,
          comment: comment,
          docGroupId: documentGroupId,
        }).then(() => {
          if (privatUsersIds) {
            documentData.users?.forEach((user) => {
              removePrivatUser({ userId: user.id, docId: documentData.id });
            });

            privatUsersIds.forEach((privatUsersId) => {
              addPrivatUser({ userId: privatUsersId, docId: documentData.id });
            });
          }
          onHide();
          handleUdateTable();
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateUsersGroups = (groups: number[]) => {
    setUsersGroupsIds(groups);
  };

  const handleUpdateDocuments = (documents: string[]) => {
    setRelatedDocIdList(documents);
  };

  const handleUpdateUsers = (handledUsers: IUser[]) => {
    setPrivatUsersIds(handledUsers.map((handledUser) => handledUser.id));
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toISOString();

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
          <Form.Floating>Размер файла не должен превышать 10мб</Form.Floating>
        </Form.Group>

        <div className={styles.inputsRow}>
          <Form.Group controlId="department">
            <Form.Label>Гуппа документа</Form.Label>
            <Form.Select
              value={documentGroupId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocumentGroupId(+e.target.value)}
              aria-label="Выберите документы"
            >
              <option>Список групп документов</option>
              {fetchedDocumentGroups &&
                fetchedDocumentGroups.map((documentGroup) => (
                  <option key={documentGroup.id} value={documentGroup.id}>
                    {documentGroup.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>

        <Form>
          <div className={styles.inputsRow}>
            <MultiselectGroup handleUpdateUsersGroups={handleUpdateUsersGroups} />
          </div>

          <div className={styles.inputsRow}>
            {fetchedUsers ? (
              <MultiselectUsers
                title="Индивидуальный доступ:"
                users={fetchedUsers}
                handleUpdateUsers={handleUpdateUsers}
              />
            ) : (
              ""
            )}
          </div>

          <div className={styles.inputsRow}>
            <MultiselectRelatedDocs
              header="Выберите приложеннные документы"
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
                value={parentDocId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setParentDocId(e.target.value)}
                aria-label="Выберите документы"
              >
                <option>Список документов</option>
                {fetchedDocuments &&
                  fetchedDocuments.map((document) => (
                    <option key={document.id} value={document.parentDocId}>
                      {document.fileName}
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
