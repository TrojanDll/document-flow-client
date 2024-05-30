import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./MailModal.module.css";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import { useSendMessageMutation } from "../../features/email/emailApiSlice";
import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocumentsToSend } from "../../features/email/documentsToSendSlice";
import { RootState } from "./../../app/store";

interface MailModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
}

const MailModal: FC<MailModalProps> = (props) => {
  const { show, onHide } = props;
  const { data: fetchedDocuments, isLoading, isSuccess } = useGetDocumentsByMyGroupQuery();
  const [documentsToSend, setDocumentsToSend] = useState<string[]>([""]);
  const [email, setEmail] = useState("");
  const [emailHeader, setEmailHeader] = useState("");
  const [emailText, setEmailText] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const docs = useSelector((state: RootState) => getAllDocumentsToSend(state));
  console.log(docs);

  const dispatch = useDispatch();

  useEffect(() => {}, [docs]);

  const handleSendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHide();
    sendMessage({
      email,
      docIds: documentsToSend,
      header: emailHeader,
      body: emailText,
    }).then((resp) => {
      console.log(resp);
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

          {/* <Form.Select
              required
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocumentToSend(e.target.value)}
              aria-label="Выберите документы">
              <option>Выберите документ</option>
              {fetchedDocuments
                ? fetchedDocuments.map((document) => (
                    <option key={document.id} value={document.id}>
                      {document.fileName}
                    </option>
                  ))
                : ""}
            </Form.Select> */}

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
