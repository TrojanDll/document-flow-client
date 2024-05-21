import { ChangeEvent, FC, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";
import DocumentsTable from "../../components/DocumentsTable/DocumentsTable";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import styles from "./DocumentsPage.module.css";
import CreateDocumentModal from "../../components/CreateDocumentModal/CreateDocumentModal";
import { IDocument, IUser } from "../../types/Types";
import { useDispatch } from "react-redux";
import { documentApiSlice } from "../../features/documents/documentsApiSlice";
import searchImg from "./../../assets/img/icons/search.svg";
import { EDocumentStatus } from "../../types/Enums";
import DocumentsFilterModal from "../../components/DocumentsFilterModal/DocumentsFilterModal";
import loadingSvg from "./../../assets/img/icons/spinner.svg";

export interface groupResponseDTO {
  id: number;
  name: string;
}

export interface IDocumentFilters {
  parentDocIdFilter: string;
  statusFilter: EDocumentStatus | string;
  userGroupFilter: string;
  creationDateFilter: string;
}

const DocumentsPage: FC = () => {
  const { data: fetchedDocuments, refetch: getAllDocuments, isLoading, isSuccess } = useGetDocumentsByMyGroupQuery();
  const dispatch = useDispatch();

  const [modalCreateDocumentShow, setModalCreateDocumentShow] = useState(false);
  const [modalFilterShow, setModalFilterShow] = useState(false);

  const [modifiedDocuments, setModifiedDocuments] = useState<IDocument[]>([]);
  const [searchedDocuments, setSearchedDocuments] = useState<IDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<IDocument[]>([]);

  const [parentDocIdFilter, setParentDocIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<EDocumentStatus | string>("");
  const [userGroupFilter, setUserGroupFilter] = useState<string>("");
  const [creationDateFilter, setCreationDateFilter] = useState("");
  const [countOfFilters, setCountOfFilters] = useState(0);

  function sortByField<T>(arr: T[], field: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  const getTrimmedDate = (isoDate: string) => {
    return isoDate.slice(0, isoDate.indexOf("T"));
  };

  async function sortDocumentsByField(listToSort: IDocument[], field: keyof IDocument) {
    const sortedDocuments: IDocument[] = await sortByField<IDocument>(listToSort, field);
    setModifiedDocuments(sortedDocuments);
  }

  const handleUdateTable = async () => {
    dispatch(documentApiSlice.util.resetApiState());
    getAllDocuments();
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      sortDocumentsByField(fetchedDocuments, "fileName");
    }
  }, [fetchedDocuments]);

  useEffect(() => {
    console.log("Полученные измененные документы в компоненте DocumentsPage: ");
    console.log(modifiedDocuments);
    setSearchedDocuments(modifiedDocuments);
    setFilteredDocuments(modifiedDocuments);
  }, [modifiedDocuments]);

  const handleSearchDocumentsByName = (textToSearch: string) => {
    setSearchedDocuments(
      modifiedDocuments.filter((document) => {
        if (document.fileName) {
          if (document.fileName.toLocaleLowerCase().indexOf(textToSearch.toLowerCase()) !== -1) {
            return document;
          }
        }
      })
    );
  };

  useEffect(() => {
    let countOfFilters = 0;

    if (parentDocIdFilter) {
      countOfFilters++;
    }

    if (statusFilter) {
      countOfFilters++;
    }

    if (userGroupFilter) {
      countOfFilters++;
    }

    if (creationDateFilter) {
      countOfFilters++;
    }

    setCountOfFilters(countOfFilters);

    setFilteredDocuments(
      searchedDocuments.filter((document) => {
        let isAppropriate = true;
        if (parentDocIdFilter.length > 0) {
          if (document.parentDocId?.indexOf(parentDocIdFilter) === -1) {
            isAppropriate = false;
          }
        }

        if (statusFilter && isAppropriate) {
          if (document.status !== statusFilter) {
            isAppropriate = false;
          }
        }

        if (userGroupFilter.length > 0 && document.userGroups && isAppropriate) {
          for (let i = 0; i < document.userGroups.length; i++) {
            if (document.userGroups[i] === userGroupFilter) {
              isAppropriate = true;
              break;
            } else {
              isAppropriate = false;
            }
          }
        }

        if (creationDateFilter && document.createdDate && isAppropriate) {
          if (getTrimmedDate(document.createdDate) !== creationDateFilter) {
            isAppropriate = false;
          }
        }

        if (isAppropriate) {
          return document;
        }
      })
    );
  }, [parentDocIdFilter, statusFilter, userGroupFilter, creationDateFilter, searchedDocuments]);

  const handleUpdateFilters = (filters: IDocumentFilters) => {
    setParentDocIdFilter(filters.parentDocIdFilter);
    setStatusFilter(filters.statusFilter);
    setUserGroupFilter(filters.userGroupFilter);
    setCreationDateFilter(filters.creationDateFilter);
    setCountOfFilters(0);
  };

  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Документы</PageTitle>

        <div className={styles.filters}>
          <Button
            className={styles.createDocumentButton}
            variant="primary"
            onClick={() => setModalCreateDocumentShow(true)}
          >
            Добавить документ
          </Button>

          <InputGroup className={styles.searchInput}>
            <InputGroup.Text>
              <img src={searchImg} alt="searchImg" />
            </InputGroup.Text>
            <Form.Control
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchDocumentsByName(e.target.value)}
              placeholder="Поиск"
              aria-label="Username"
            />
          </InputGroup>

          <Button variant="outline-primary" onClick={() => setModalFilterShow(true)}>
            Фильтры
            {countOfFilters > 0 ? (
              <Badge bg="secondary" className={styles.countOfFiltersBadge}>
                {countOfFilters}
              </Badge>
            ) : (
              ""
            )}
          </Button>
          {fetchedDocuments ? (
            <DocumentsFilterModal
              onHide={() => setModalFilterShow(false)}
              show={modalFilterShow}
              documents={fetchedDocuments}
              handleUpdateFilters={handleUpdateFilters}
            />
          ) : (
            ""
          )}
        </div>
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

        {!isLoading ? (
          <DocumentsTable handleUdateTable={handleUdateTable} documents={filteredDocuments} />
        ) : (
          <div className={styles.loadingWrapper}>
            <img src={loadingSvg} alt="loading" />
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

export default DocumentsPage;
