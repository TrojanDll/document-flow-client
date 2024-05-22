import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import styles from "./MultiselectRelatedDocs.module.css";
import closeImg from "./../../assets/img/icons/close.svg";
import { IDocument } from "../../types/Types";

interface MultiselectRelatedDocsProps {
  handleUpdateDocuments: (arg: string[]) => void;
  currientDocumentInfo?: IDocument;
  documents: IDocument[];
  isDisabled?: boolean;
  isCurrientUserOwner?: boolean;
  header: string;
}

const MultiselectRelatedDocs: FC<MultiselectRelatedDocsProps> = ({
  handleUpdateDocuments,
  currientDocumentInfo,
  documents,
  isDisabled,
  header,
}) => {
  const [notSelectedDocuments, setNotSelectedDocuments] = useState<IDocument[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<IDocument[]>([]);
  const [documentsIds, setDocumentsIds] = useState<string[]>([]);

  // useEffect(() => {
  //   let baseSelectedDocs: IDocument[] = [];
  //   setNotSelectedDocuments(
  //     documents.filter((document) => {
  //       const currientDocumentRelatedDocs = currientDocumentInfo ? currientDocumentInfo.relatedDocIds : [];
  //       console.log("currientDocumentRelatedDocs");
  //       console.log(currientDocumentRelatedDocs);
  //       if (currientDocumentRelatedDocs?.indexOf(document.id) === -1) {
  //         return document;
  //       } else {
  //         baseSelectedDocs.push(document);
  //       }
  //     })
  //   );
  //   setSelectedDocuments(baseSelectedDocs);
  // }, []);

  useEffect(() => {
    console.log("currientDocumentInfo");
    console.log(currientDocumentInfo);

    let baseSelectedDocs: IDocument[] = [];
    let baseNotSelectedDocs: IDocument[] = [];

    if (currientDocumentInfo && currientDocumentInfo.relatedDocs) {
      for (let document of documents) {
        let isAddTobaseNotSelectedDocs = false;

        for (let currientRelatedDocId of currientDocumentInfo.relatedDocs) {
          if (currientRelatedDocId === document.id && currientDocumentInfo.id !== document.id) {
            baseSelectedDocs.push(document);
            isAddTobaseNotSelectedDocs = false;
            break;
          } else if (document.id !== currientDocumentInfo.id) {
            isAddTobaseNotSelectedDocs = true;
          }
        }

        if (isAddTobaseNotSelectedDocs) {
          baseNotSelectedDocs.push(document);
        }
      }
    } else {
      baseNotSelectedDocs = documents;
    }

    setNotSelectedDocuments(baseNotSelectedDocs);
    setSelectedDocuments(baseSelectedDocs);
  }, []);

  // useEffect(() => {
  //   console.log(notSelectedUsersGroups);
  // }, [notSelectedUsersGroups]);

  // let fetchedUsersGroups;
  // useEffect(() => {
  //   console.log(userGroup);
  // }, [userGroup]);

  useEffect(() => {
    setDocumentsIds(selectedDocuments.map((item) => item.id));
    console.log("Выбраные связанные документы в компоненте MultiselectRelatedDocs");
    console.log(selectedDocuments);
  }, [selectedDocuments]);

  useEffect(() => {
    // setDocumentsIds(selectedDocuments.map((item) => item.id));
    console.log("notSelectedDocuments");
    console.log(notSelectedDocuments);
  }, [notSelectedDocuments]);

  useEffect(() => {
    handleUpdateDocuments(documentsIds);
  }, [documentsIds]);

  const handleSelectDocuments = (e: React.ChangeEvent<HTMLSelectElement>) => {
    notSelectedDocuments.forEach((item) => {
      if (item.id === e.target.value) {
        setSelectedDocuments([...selectedDocuments, item]);
      }
    });

    setNotSelectedDocuments(
      notSelectedDocuments.filter((item) => {
        if (item.id !== e.target.value) {
          return item;
        }
      })
    );
  };

  const handleUnselectDocuments = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset.value);
    if (e.currentTarget.dataset.value === "closeBtn") {
      console.log("closeBtn");
    } else {
      const selectedId = e.currentTarget.dataset.value;
      selectedDocuments.forEach((item) => {
        if (item.id === selectedId) {
          setNotSelectedDocuments([...notSelectedDocuments, item]);
        }
      });

      setSelectedDocuments(
        selectedDocuments.filter((item) => {
          if (item.id !== selectedId) {
            return item;
          }
        })
      );
    }
  };

  // const handleUnSelectRelatedDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const selectedId = e.currentTarget.dataset.value;
  //   selectedRelatedDocId.forEach((item) => {
  //     if (item.id === selectedId) {
  //       notSelectedRelatedDocId.push(item);
  //     }
  //   });

  //   setSelectedRelatedDocId(
  //     selectedRelatedDocId.filter((item) => {
  //       if (item.id !== selectedId) {
  //         return item;
  //       }
  //     })
  //   );
  // };

  return (
    <Form.Group controlId="department">
      <Form.Label>{header}</Form.Label>
      <Form.Select
        disabled={isDisabled}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectDocuments(e)}
        aria-label="Выберите документы"
      >
        <option>Список документов</option>
        {notSelectedDocuments &&
          notSelectedDocuments.map((documents) => (
            <option key={documents.id} value={documents.id}>
              {documents.fileName}
            </option>
          ))}
      </Form.Select>
      <div className={styles.selectedItems}>
        {selectedDocuments &&
          selectedDocuments.map((documents) => (
            <Button
              key={documents.id}
              variant="outline-secondary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectDocuments(e)}
              data-value={documents.id}
            >
              {documents.fileName}
              <Badge data-type="closeBtn" bg="light">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div>
    </Form.Group>
  );
};

export default MultiselectRelatedDocs;
