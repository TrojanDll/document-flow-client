import { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./MailModal.module.css";

import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";

import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import { useSendMessageMutation } from "../../features/email/emailApiSlice";
import { getAllDocumentsToSend } from "../../features/email/documentsToSendSlice";

import { RootState } from "./../../app/store";
import { useSelector } from "react-redux";

interface MailModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
}

const MailModal: FC<MailModalProps> = (props) => {
  const { show, onHide } = props;
  const [documentsToSend, setDocumentsToSend] = useState<string[]>([""]);
  const [email, setEmail] = useState("");
  const [emailHeader, setEmailHeader] = useState("");
  const [emailText, setEmailText] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const docs = useSelector((state: RootState) => getAllDocumentsToSend(state));
  const { data: fetchedDocuments } = useGetDocumentsByMyGroupQuery();

  useEffect(() => {}, [docs]);

  const handleSendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHide();
    sendMessage({
      email,
      docIds: documentsToSend,
      header: emailHeader,
      body: emailText,
    }).then(() => {
      setEmail("");
      setEmailHeader("");
      setEmailText("");
      setDocumentsToSend([""]);
    });
  };
  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Отправка документов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSendMail(e)}>
          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Почта получателя</Form.Label>
            <Form.Control
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              aria-describedby="passwordHelpBlock"
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Заголовок письма</Form.Label>
            <Form.Control
              value={emailHeader}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailHeader(e.target.value)}
              type="text"
              aria-describedby="passwordHelpBlock"
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <Form.Label htmlFor="inputPassword5">Текст письма</Form.Label>
            <Form.Control
              value={emailText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailText(e.target.value)}
              as="textarea"
              rows={3}
            />
          </div>

          {fetchedDocuments ? (
            <MultiselectRelatedDocs
              header="Выберите документы для отправки"
              handleUpdateDocuments={(docsId: string[]) => setDocumentsToSend(docsId)}
              documents={fetchedDocuments}
              preselectedDocuments={docs}
            />
          ) : (
            ""
          )}

          <Button className={styles.submitBtn} type="submit">
            Отправить
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MailModal;
