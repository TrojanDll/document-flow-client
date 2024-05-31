import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./FilterModal.module.css";

import { IUser, IUserGroup } from "../../types/Types";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import { IUsersFilters } from "../../pages/AdminPage/AdminPage";

interface FilterModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  users: IUser[];
  handleUpdateFilters: (filters: IUsersFilters) => void;
}

const FilterModal: FC<FilterModalProps> = (props) => {
  const { show, users, handleUpdateFilters, onHide } = props;

  const [groupFilterItems, setGroupFilterItems] = useState<IUserGroup[]>([]);
  const postFilterItems = users ? users.map((user) => (user.post ? user.post : "")) : [""];
  const departmentFilterItems = users ? users.map((user) => (user.department ? user.department : "")) : [""];
  const [groupFilter, setGroupFilter] = useState("");
  const [postFilter, setPostFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const { data: fetchedGroups, isLoading: isGroupsLoading, isSuccess: isGroupsSuccess } = useGetAllUsersGroupsQuery();

  useEffect(() => {
    if (!isGroupsLoading && isGroupsSuccess) {
      setGroupFilterItems(fetchedGroups);
    }
  }, [isGroupsLoading]);

  const applyFilters = () => {
    handleUpdateFilters({
      groupFilter,
      postFilter,
      departmentFilter,
    });
    onHide();
  };

  const resetFilters = () => {
    setGroupFilter("");
    setPostFilter("");
    setDepartmentFilter("");
    handleUpdateFilters({
      groupFilter: "",
      postFilter: "",
      departmentFilter: "",
    });
    onHide();
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.filtersWrapper}>
          <div className={styles.dropdownWrapper}>
            <Form.Select
              value={groupFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setGroupFilter(e.target.value)}
            >
              <option value={""}>Группа</option>
              {groupFilterItems
                ? groupFilterItems.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </div>
          <div className={styles.dropdownWrapper}>
            <Form.Select
              value={postFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setPostFilter(e.target.value)}
            >
              <option value={""}>Должность</option>
              {postFilterItems
                ? postFilterItems.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </div>
          <div className={styles.dropdownWrapper}>
            <Form.Select
              value={departmentFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDepartmentFilter(e.target.value)}
            >
              <option value={""}>Отдел</option>
              {departmentFilterItems
                ? departmentFilterItems.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                : ""}
            </Form.Select>
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

export default FilterModal;
