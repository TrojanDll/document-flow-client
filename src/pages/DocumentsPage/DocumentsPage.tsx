import { FC, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetAllDocumentsQuery } from "../../features/documents/documentsApiSlice";
import DocumentsTable from "../../components/DocumentsTable/DocumentsTable";

const DocumentsPage: FC = () => {
  const { data: fetchedDocuments, refetch: getAllDocuments, isLoading, isSuccess } = useGetAllDocumentsQuery();

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
    }
  }, [isLoading]);

  let refetchedDocuments: IDocument[];

  const handleUdateTable = async () => {
    const resp = await getAllDocuments();
    if (resp.isSuccess) {
      refetchedDocuments = resp.data;
      sortDocumentsByField(refetchedDocuments, "name");
    }
  };

  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Документы</PageTitle>

        {modifiedDocuments && (
          <DocumentsTable handleUdateTable={() => console.log("q")} documents={modifiedDocuments} />
        )}
      </ContentContainer>
    </div>
  );
};

export default DocumentsPage;
