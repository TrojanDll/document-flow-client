import Select, { OnChangeValue } from "react-select";
import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IDocument } from "../../types/Types";

interface MultiselectRelatedDocsProps {
  handleUpdateDocuments: (arg: string[]) => void;
  currientDocumentInfo?: IDocument;
  documents: IDocument[];
  preselectedDocuments?: IDocument[];
  isDisabled?: boolean;
  isCurrientUserOwner?: boolean;
  header: string;
}

interface IOption {
  label: string;
  value: string;
}

const MultiselectRelatedDocs: FC<MultiselectRelatedDocsProps> = ({
  handleUpdateDocuments,
  currientDocumentInfo,
  documents,
  header,
  // isDisabled,
  preselectedDocuments,
}) => {
  const [notSelectedDocuments, setNotSelectedDocuments] = useState<IOption[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<IOption[]>([]);
  const [documentsIds, setDocumentsIds] = useState<string[]>([]);

  useEffect(() => {
    initMultiselect();
  }, []);

  const initMultiselect = () => {
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
    } else if (preselectedDocuments) {
      baseSelectedDocs = preselectedDocuments;
      baseNotSelectedDocs = documents.filter((document) => {
        let isAddToNotSelectedDocs = true;
        preselectedDocuments.forEach((preselectedDocument) => {
          if (preselectedDocument.id === document.id) {
            isAddToNotSelectedDocs = false;
          }
        });
        if (isAddToNotSelectedDocs) {
          return document;
        }
      });
    } else {
      baseNotSelectedDocs = documents;
    }

    setNotSelectedDocuments(
      baseNotSelectedDocs.map(
        (baseNotSelectedDoc) => ({ value: baseNotSelectedDoc.id, label: baseNotSelectedDoc.fileName } as IOption)
      )
    );
    setSelectedDocuments(
      baseSelectedDocs.map(
        (baseSelectedDoc) => ({ value: baseSelectedDoc.id, label: baseSelectedDoc.fileName } as IOption)
      )
    );
  };

  useEffect(() => {
    setDocumentsIds(selectedDocuments.map((item) => item.value));
  }, [selectedDocuments]);

  useEffect(() => {
    handleUpdateDocuments(documentsIds);
  }, [documentsIds]);

  const handleSelectDocuments = (newValue: OnChangeValue<IOption, boolean>) => {
    setSelectedDocuments(newValue as IOption[]);
  };

  return (
    <Form.Group controlId="department">
      <Form.Label>{header}</Form.Label>

      <Select
        isMulti={true}
        onChange={handleSelectDocuments}
        value={selectedDocuments}
        options={notSelectedDocuments}
        placeholder="Документы"
      />
    </Form.Group>
  );
};

export default MultiselectRelatedDocs;
