import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

interface MailModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
}

const MailModal: FC<MailModalProps> = (props) => {
  const { show, onHide } = props;

  const handleSendMail = () => {
    onHide();
  };
  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSendMail}>Отправить</Button>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MailModal;
