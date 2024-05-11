import { FC, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import DocumentsTable from "../../components/DocumentsTable/DocumentsTable";
import { Button } from "react-bootstrap";
import style from "./DocumentsPage.module.css";
import CreateDocumentModal from "../../components/CreateDocumentModal/CreateDocumentModal";
import { IDocument } from "../../types/Types";

const DocumentsPage: FC = () => {
  const { data: fetchedDocuments, refetch: getAllDocuments, isLoading, isSuccess } = useGetDocumentsByMyGroupQuery();
  const [modalCreateDocumentShow, setModalCreateDocumentShow] = useState(false);

  const [modifiedDocuments, setModifiedDocuments] = useState<IDocument[]>([]);

  function sortByField<T>(arr: T[], field: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  async function sortDocumentsByField(listToSort: IDocument[], field: keyof IDocument) {
    // if (!isLoading) {
    const sortedDocuments: IDocument[] = await sortByField<IDocument>(listToSort, field);
    // console.log(sortedUsers);
    setModifiedDocuments(sortedDocuments);
    // }
  }

  // const filterUsers = () => {};

  useEffect(() => {
    if (!isLoading && isSuccess) {
      sortDocumentsByField(fetchedDocuments, "name");
      setModifiedDocuments(fetchedDocuments);
    }
  }, [isLoading]);

  // let refetchedDocuments: IDocument[];

  const handleUdateTable = async () => {
    const resp = await getAllDocuments();
    if (resp.isSuccess && fetchedDocuments) {
      // refetchedDocuments = resp.data;
      // sortDocumentsByField(refetchedDocuments, "name");
      setModifiedDocuments(fetchedDocuments);
    }
  };

  useEffect(() => {
    getAllDocuments;
  }, []);

  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Документы</PageTitle>

        <Button
          className={style.createDocumentButton}
          variant="primary"
          onClick={() => setModalCreateDocumentShow(true)}>
          Добавить документ
        </Button>
        {fetchedDocuments ? (
          <CreateDocumentModal
            fetchedDocuments={fetchedDocuments}
            handleUdateTable={handleUdateTable}
            show={modalCreateDocumentShow}
            onHide={() => setModalCreateDocumentShow(false)}
          />
        ) : (
          ""
        )}

        {modifiedDocuments && <DocumentsTable handleUdateTable={handleUdateTable} documents={modifiedDocuments} />}
      </ContentContainer>
    </div>
  );
};

export default DocumentsPage;
