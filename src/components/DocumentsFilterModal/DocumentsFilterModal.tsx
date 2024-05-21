import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./DocumentsFilterModal.module.css";
import { IDocument, IUserGroup } from "../../types/Types";
import { IDocumentFilters, groupResponseDTO } from "../../pages/DocumentsPage/DocumentsPage";
import { EDocumentStatus } from "../../types/Enums";
import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";

interface DocumentsFilterModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  documents: IDocument[];
  handleUpdateFilters: (filters: IDocumentFilters) => void;
}

const DocumentsFilterModal: FC<DocumentsFilterModalProps> = (props) => {
  const { show, documents, handleUpdateFilters, onHide } = props;

  const [groupFilterItems, setGroupFilterItems] = useState<IUserGroup[]>([]);

  const {
    data: currientUserData,
    isLoading,
    isSuccess,
  } = localStorage.getItem("role") === "USER" ? useGetCurrientUserQuery() : useGetAllUsersGroupsQuery();

  const [parentDocIdFilter, setParentDocIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<EDocumentStatus | string>("");
  const [userGroupFilter, setUserGroupFilter] = useState("");
  const [creationDateFilter, setCreationDateFilter] = useState("");

  useEffect(() => {
    if (!isLoading && isSuccess && currientUserData) {
      if (Array.isArray(currientUserData)) {
        setGroupFilterItems(currientUserData);
      } else if (currientUserData.groupResponseDTOs) {
        setGroupFilterItems(currientUserData.groupResponseDTOs);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(creationDateFilter);
  }, [creationDateFilter]);

  const applyFilters = () => {
    handleUpdateFilters({
      parentDocIdFilter,
      statusFilter,
      userGroupFilter,
      creationDateFilter,
    });
    onHide();
    console.log("applyFilters");
  };

  const resetFilters = () => {
    setParentDocIdFilter("");
    setStatusFilter("");
    setUserGroupFilter("");
    setCreationDateFilter("");
    handleUpdateFilters({
      parentDocIdFilter: "",
      statusFilter: "",
      userGroupFilter: "",
      creationDateFilter: "",
    });
    onHide();
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр документов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.filtersWrapper}>
          <div className={styles.filterWrapper}>
            <Form.Label>Группа</Form.Label>

            <Form.Select
              value={userGroupFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserGroupFilter(e.target.value)}
            >
              <option value={""}>Группа</option>
              {groupFilterItems
                ? groupFilterItems.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </div>
          <div className={styles.filterWrapper}>
            <Form.Group>
              <Form.Label>Статус</Form.Label>

              <Form.Select
                value={statusFilter || undefined}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as EDocumentStatus)}
                aria-label="Выберите документы"
              >
                <option value={""}>Статус</option>
                <option value={EDocumentStatus.APPROVED}>Подтвержден</option>
                <option value={EDocumentStatus.SEEN}>Просмотрен</option>
                <option value={EDocumentStatus.INPROGRESS}>В работе</option>
                <option value={EDocumentStatus.DECLINED}>Отклонен</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className={styles.filterWrapper}>
            <Form.Label>Родительский документ</Form.Label>

            <Form.Select
              value={parentDocIdFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setParentDocIdFilter(e.target.value)}
            >
              <option value={""}>Родительский документ</option>
              {documents
                ? documents.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.fileName}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </div>

          <div className={styles.filterWrapper}>
            <Form.Label htmlFor="inputPassword5">Дата создания</Form.Label>
            <Form.Control
              type="date"
              value={creationDateFilter}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCreationDateFilter(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={applyFilters}>Применить</Button>
        <Button onClick={resetFilters} variant="secondary">
          Сбросить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentsFilterModal;
