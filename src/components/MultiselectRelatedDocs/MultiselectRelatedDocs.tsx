import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import styles from "./MultiselectRelatedDocs.module.css";
import { useGetAllUsersGroupsQuery, useUpdateUserByIdMutation } from "../../features/admin/adminApiSlice";
import { useGetAllDocumentsQuery, useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import closeImg from "./../../assets/img/icons/close.svg";

interface MultiselectGroupProps {
  handleUpdateDocuments: (arg: string[]) => void;
}

const MultiselectRelatedDocs: FC<MultiselectGroupProps> = ({ handleUpdateDocuments }) => {
  const { data: fetchedDocuments, isLoading, isSuccess } = useGetAllDocumentsQuery();
  const [notSelectedDocuments, setNotSelectedDocuments] = useState<IDocument[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<IDocument[]>([]);
  const [documentsIds, setDocumentsIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNotSelectedDocuments(fetchedDocuments);
    }
  }, [isLoading]);

  // useEffect(() => {
  //   console.log(notSelectedUsersGroups);
  // }, [notSelectedUsersGroups]);

  // let fetchedUsersGroups;
  // useEffect(() => {
  //   console.log(userGroup);
  // }, [userGroup]);

  useEffect(() => {
    setDocumentsIds(selectedDocuments.map((item) => item.id.toString()));
  }, [selectedDocuments]);

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
      }),
    );
  };

  const handleUnselectDocuments = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      }),
    );
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
      <Form.Label>Группа</Form.Label>
      <Form.Select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectDocuments(e)}
        aria-label="Выберите документы">
        <option>Список документов</option>
        {notSelectedDocuments &&
          notSelectedDocuments.map((documents) => (
            <option key={documents.id} value={documents.id}>
              {documents.name}
            </option>
          ))}
      </Form.Select>
      <div className={styles.selectedItems}>
        {selectedDocuments &&
          selectedDocuments.map((documents) => (
            <Button
              key={documents.id}
              variant="primary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectDocuments(e)}
              data-value={documents.id}>
              {documents.name}
              <Badge bg="secondary">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div>
    </Form.Group>
  );
};

export default MultiselectRelatedDocs;
