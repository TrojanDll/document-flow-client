import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ETaskStatus } from "../../types/Enums";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import { useGetUsersQuery } from "../../features/admin/adminApiSlice";
import MultiselectUsers from "../MultiselectUsers/MultiselectUsers";
import { useCreateTaskMutation } from "../../features/tasks/tasksApiSlice";
import { useGetCurrientGroupMembersQuery } from "../../features/users/usersApiSlice";

interface CreateTaskModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { show, handleUdateTable, onHide } = props;

  const { data: fetchedDocuments } = useGetDocumentsByMyGroupQuery();
  const { data: fetchedUsers } = useGetCurrientGroupMembersQuery();
  const [createTask] = useCreateTaskMutation();

  const [header, setHeader] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<ETaskStatus>(ETaskStatus.NOTSEEN);
  const [deadlineRawFormat, setDeadlineRawFormat] = useState<string>("");
  const [docId, setDocId] = useState<string>("");
  const [userEmails, setUserEmails] = useState<string[]>([]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadlineIso = new Date(deadlineRawFormat).toISOString();
    const currientDate = new Date().toISOString();
    console.log(currientDate);

    try {
      createTask({
        header: header,
        description: description,
        status: status,
        deadline: deadlineIso,
        docId: docId,
        userEmails: userEmails,
        creationDate: currientDate,
      }).then((resp: any) => {
        console.log(resp);
        handleUdateTable();
        console.log("Запрос на создание таски: ");
        console.log({
          header: header,
          description: description,
          status: status,
          deadline: deadlineIso,
          docId: docId,
          userEmails: userEmails,
          creationDate: currientDate,
        });
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
        <Modal.Title id="contained-modal-title-vcenter">Создание задачи</Modal.Title>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineRawFormat(e.target.value)}
              type="date"
              placeholder="Введите дату"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Связаный документ</Form.Label>
            <Form.Select
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

          {fetchedUsers ? <MultiselectUsers handleUpdateUsers={handleUpdateUsers} users={fetchedUsers} /> : ""}

          <Button type="submit">Создать</Button>
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

export default CreateTaskModal;
