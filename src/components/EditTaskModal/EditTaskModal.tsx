import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ETaskStatus } from "../../types/Enums";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import MultiselectUsers from "../MultiselectUsers/MultiselectUsers";
import { useUpdateTaskByIdMutation } from "../../features/tasks/tasksApiSlice";
import { ITaskRequestToEdit, ITaskResponse } from "../../types/Types";

import styles from "./EditTaskModal.module.css";
import { useGetCurrientGroupMembersQuery } from "../../features/users/usersApiSlice";

interface EditTaskModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
  editingTask: ITaskResponse;
}

const EditTaskModal: FC<EditTaskModalProps> = (props) => {
  const { show, handleUdateTable, onHide, editingTask } = props;

  const { data: fetchedDocuments } = useGetDocumentsByMyGroupQuery();
  const { data: fetchedUsers } = useGetCurrientGroupMembersQuery();
  const [editTask] = useUpdateTaskByIdMutation();

  const [header, setHeader] = useState<string>(editingTask.header);
  const [description, setDescription] = useState(editingTask.description);
  const [status, setStatus] = useState(editingTask.status as ETaskStatus);
  const [deadlineRawFormat, setDeadlineRawFormat] = useState(
    editingTask.deadline?.slice(0, editingTask.deadline.indexOf("T"))
  );
  const [docId, setDocId] = useState(editingTask.doc?.id);
  const [userEmails, setUserEmails] = useState(
    editingTask.users ? editingTask.users.map((item) => (item.email ? item.email : "")) : [""]
  );

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadlineIso = new Date(deadlineRawFormat ? deadlineRawFormat : "01-01-2024").toISOString();
    const currientDate = new Date().toISOString();
    console.log(currientDate);

    try {
      const dataToEdit: ITaskRequestToEdit = {
        id: editingTask.id,
        header: header,
        description: description,
        status: status,
        deadline: deadlineIso,
        docId: docId,
        userEmails: userEmails,
        creationDate: currientDate,
      };

      editTask(dataToEdit).then((resp: any) => {
        console.log(resp);
        handleUdateTable();
        console.log("Запрос на редактирование таски: ");
        console.log(dataToEdit);
        onHide();
      });
    } catch {}
  };

  const handleRefuseButton = () => {
    onHide();
    setHeader("");
    setDescription("");
    setStatus(ETaskStatus.NOTSEEN);
    setDeadlineRawFormat("");
    setDocId("");
    setUserEmails([]);
  };

  const handleUpdateUsers = (userEmails: string[]) => {
    setUserEmails(userEmails);
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редкатирование задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmitForm(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Название</Form.Label>
            <Form.Control
              value={header}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setHeader(e.target.value)}
              type="text"
              placeholder="Введите название"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Введите Описание"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Статус</Form.Label>
            <Form.Select
              value={status}
              aria-label="Статус"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as ETaskStatus)}
            >
              <option>Выберите статус</option>
              <option value={ETaskStatus.NOTSEEN}>Не просмотрено</option>
              <option value={ETaskStatus.INPROGRESS}>Выполняется</option>
              <option value={ETaskStatus.POSTPONED}>Отложено</option>
              <option value={ETaskStatus.DONE}>Выполнено</option>
              <option value={ETaskStatus.ABANDONED}>Заброшено</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Дедлайн</Form.Label>
            <Form.Control
              value={deadlineRawFormat}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineRawFormat(e.target.value)}
              type="date"
              placeholder="Введите дату"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Связаный документ</Form.Label>
            <Form.Select
              value={docId}
              aria-label="Статус"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocId(e.target.value as ETaskStatus)}
            >
              <option>Выберите документ</option>
              {fetchedDocuments &&
                fetchedDocuments.map((document) => (
                  <option key={document.id} value={document.id}>
                    {document.fileName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {fetchedUsers ? (
            <MultiselectUsers
              fetchedUsersList={editingTask.users}
              handleUpdateUsers={handleUpdateUsers}
              users={fetchedUsers}
            />
          ) : (
            ""
          )}

          <Button className={styles.saveBtn} type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleRefuseButton}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
