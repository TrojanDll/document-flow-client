import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./DocumentHistoryModal.module.css";
import {
  useCreateDocumentChangeMutation,
  useGetDocumentChangesByDocumentIDQuery,
} from "../../features/documents/documentsApiSlice";
import { IDocument, IDocumentChangeRequest } from "./../../types/Types";
import DocumentHistoryItem from "../DocumentHistoryItem/DocumentHistoryItem";

interface DocumentHistoryModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  isCurrientUserOwner: boolean;
  documentData: IDocument;
}

const DocumentHistoryModal: FC<DocumentHistoryModalProps> = (props) => {
  const { show, onHide, isCurrientUserOwner, documentData } = props;

  const {
    data: fetchedDocumentHistory,
    isSuccess: isFetchedDocumentHistorySuccess,
    refetch: documentHistoryRefetch,
  } = useGetDocumentChangesByDocumentIDQuery(documentData.id);
  const [createDocumentChange] = useCreateDocumentChangeMutation();

  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isFetchedDocumentHistorySuccess) {
      console.log("fetchedDocumentHistory");
      console.log(fetchedDocumentHistory);
    }
  }, [isFetchedDocumentHistorySuccess]);

  const handleCreateHistoryItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToCreateDocumentChange: IDocumentChangeRequest = {
        documentId: documentData.id,
        header: header,
        message: message,
        changedDate: new Date().toISOString(),
      };
      createDocumentChange(dataToCreateDocumentChange).then((resp) => {
        console.log(resp);
        documentHistoryRefetch();
        setHeader("");
        setMessage("");
      });
    } catch {}
  };

  const handleRefuseButton = () => {
    onHide();
    setHeader("");
    setMessage("");
  };

  const updateHistoryItems = () => {
    documentHistoryRefetch();
    console.log("Обновление истории");
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Записи о документе</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isCurrientUserOwner ? (
          <>
            <h3 className={styles.subtitle}>Создать новую запись</h3>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateHistoryItem(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Заголовок записи</Form.Label>
                <Form.Control
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  type="text"
                  placeholder="Заголовок"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Текст записи</Form.Label>
                <Form.Control
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Текст"
                  as="textarea"
                  rows={3}
                  required
                />
              </Form.Group>

              <Button type="submit">Сохранить</Button>
            </Form>
          </>
        ) : (
          ""
        )}
        <div className={styles.historyItems}>
          {isCurrientUserOwner && <h3 className={styles.subtitle}>Записи документа</h3>}

          {fetchedDocumentHistory && fetchedDocumentHistory.length > 0
            ? fetchedDocumentHistory.map((item) => (
                <DocumentHistoryItem
                  isCurrientUserOwner={isCurrientUserOwner}
                  updateHistoryItems={updateHistoryItems}
                  key={item.id}
                  historyItem={item}
                />
              ))
            : "Записей пока нет"}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRefuseButton}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentHistoryModal;
