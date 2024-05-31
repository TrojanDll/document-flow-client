import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./ProfilePage.module.css";

import { IDocument } from "../../types/Types";

import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import DocumentsTable from "../../components/DocumentsTable/DocumentsTable";
import PageTitle from "../../components/PageTitle/PageTitle";

import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";
import { useGetDocumentsByMyGroupQuery } from "../../features/documents/documentsApiSlice";

import spinner from "./../../assets/img/icons/spinner.svg";

const ProfilePage: FC = () => {
  const { data: fetchedCurrientUser, isLoading } = useGetCurrientUserQuery();
  const {
    data: fetchedDocuments,
    isLoading: isDocumentsLoading,
    isSuccess,
    refetch: getDocumentsByMyGroup,
  } = useGetDocumentsByMyGroupQuery();

  const [documentsToDisplay, setDocumentsToDisplay] = useState<IDocument[]>([]);

  useEffect(() => {
    if (!isDocumentsLoading && isSuccess) {
      setDocumentsToDisplay(
        fetchedDocuments.filter((fetchedDocument) => {
          if (fetchedDocument.owner === fetchedCurrientUser?.email) {
            return fetchedDocument;
          }
        })
      );
    }
  }, [isDocumentsLoading]);

  const handleUdateTable = async () => {
    getDocumentsByMyGroup();
  };

  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Профиль</PageTitle>

        <Form className={styles.profileInfo}>
          <div className={styles.inputsRow}>
            <Form.Group className={styles.input}>
              <Form.Label>Имя</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                <Form.Control
                  value={fetchedCurrientUser?.firstName}
                  type="text"
                  placeholder="name@example.com"
                  disabled
                />
              )}
            </Form.Group>
            <Form.Group className={styles.input}>
              <Form.Label>Фамилия</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                <Form.Control
                  value={fetchedCurrientUser?.lastName}
                  type="text"
                  placeholder="name@example.com"
                  disabled
                />
              )}
            </Form.Group>
            <Form.Group className={styles.input}>
              <Form.Label>Отчество</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                <Form.Control
                  value={fetchedCurrientUser?.patronymic}
                  type="text"
                  placeholder="name@example.com"
                  disabled
                />
              )}
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Group className={styles.input}>
              <Form.Label>Email</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                <Form.Control value={fetchedCurrientUser?.email} type="text" placeholder="name@example.com" disabled />
              )}
            </Form.Group>
            <Form.Group className={styles.input}>
              <Form.Label>Отдел</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                <Form.Control
                  value={fetchedCurrientUser?.department}
                  type="text"
                  placeholder="name@example.com"
                  disabled
                />
              )}
            </Form.Group>
            <Form.Group className={styles.input}>
              <Form.Label>Должность</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinnerdll" />
              ) : (
                <Form.Control value={fetchedCurrientUser?.post} type="text" placeholder="name@example.com" disabled />
              )}
            </Form.Group>
            <Form.Group className={styles.input}>
              <Form.Label>Группа</Form.Label>
              {isLoading ? (
                <img className={styles.spinner} src={spinner} alt="spinner" />
              ) : (
                fetchedCurrientUser?.groupResponseDTOs?.map((group) => (
                  <div key={group.id} className={styles.userGroups}>
                    <Button disabled variant="secondary">
                      {group.name}
                    </Button>
                  </div>
                ))
              )}
            </Form.Group>
          </div>
        </Form>

        <h2 className={styles.tableTitle}>Загруженные вами документы</h2>

        {documentsToDisplay && <DocumentsTable handleUdateTable={handleUdateTable} documents={documentsToDisplay} />}
      </ContentContainer>
    </div>
  );
};

export default ProfilePage;
