import { FC, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./MailModal.module.css";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";

interface MailModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
}

const MailModal: FC<MailModalProps> = (props) => {
  const { show, onHide } = props;
  const { data: fetchedDocuments, isLoading, isSuccess } = useGetDocumentsByMyGroupQuery();

  useEffect(() => {
    if (fetchedDocuments && isSuccess) {
    }
  }, [isLoading]);

  const handleSendMail = () => {
    onHide();
  };
  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSendMail}>
          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Почта получателя</Form.Label>
            <Form.Control type="email" aria-describedby="passwordHelpBlock" required />
          </div>

          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Заголовок письма</Form.Label>
            <Form.Control type="text" aria-describedby="passwordHelpBlock" required />
          </div>

          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Текст письма</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </div>

          <Button type="submit">Отправить</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MailModal;
