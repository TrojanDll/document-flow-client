import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ETaskStatus } from "../../types/Enums";

interface CreateTaskModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { show } = props;
  const [status, setStatus] = useState<ETaskStatus>(ETaskStatus.NOTSEEN);

  const handleRefuseButton = () => {
    console.log("");
  };
  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Создание задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Описание</Form.Label>
          <Form.Control type="text" placeholder="Введите Описание" />
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
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" placeholder="Введите название" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRefuseButton}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
