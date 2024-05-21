import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./DeleteModal.module.css";

interface DeleteModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  header: string;
  text: string;
  buttontext: string;
  isDelete: (resp: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = (props) => {
  const { show, onHide, text, isDelete, header, buttontext } = props;

  const handleSubmit = () => {
    onHide();
    isDelete(true);
  };

  const handleReject = () => {
    onHide();
    isDelete(false);
  };

  return (
    <Modal {...props} show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.text}>{text}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit}>
          {buttontext}
        </Button>
        <Button variant="secondary" onClick={handleReject}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
