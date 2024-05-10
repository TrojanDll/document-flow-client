import { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CreateDocumentModal.module.css";
import axios from "axios";
import { BASE_URL } from "../../app/api/apiSlice";

interface CreateDocumentModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  handleUdateTable: () => void;
}

const CreateDocumentModal: FC<CreateDocumentModalProps> = (props) => {
  const { show, handleUdateTable } = props;

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleUploadFile = async () => {
    props.onHide();
    if (file) {
      // uploadDocument(file).then((resp) => {
      //   console.log(resp);
      // });

      try {
        const resp = await axios({
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
        if (resp) {
          handleUdateTable();
        }
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

          const resp = await axios({
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
          if (resp) {
            handleUdateTable();
          }
        }
      }

      // refetch().then(() => {
      //   console.log(data);
      // });
    }
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
        </Form.Group>

        {/* <div className={styles.descr}>
          Добавить данные вы см
        </div> */}
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
