import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import styles from "./FilterModal.module.css";
import { IUser, IUserGroup } from "../../types/Types";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";

interface FilterModalProps {
  props?: any;
  onHide?: () => void;
  show?: boolean;
  users: IUser[];
}

const FilterModal: FC<FilterModalProps> = (props) => {
  const { show, users } = props;

  const { data: fetchedGroups, isLoading: isGroupsLoading, isSuccess: isGroupsSuccess } = useGetAllUsersGroupsQuery();

  const [groupFilterItems, setGroupFilterItems] = useState<IUserGroup[]>([]);
  const [postFilterItems, setPostFilterItems] = useState<string[]>(
    users ? users.map((user) => (user.post ? user.post : "")) : [""]
  );
  const [departmentFilterItems, setDepartmentFilterItems] = useState<string[]>(
    users ? users.map((user) => (user.department ? user.department : "")) : [""]
  );

  useEffect(() => {
    if (!isGroupsLoading && isGroupsSuccess) {
      setGroupFilterItems(fetchedGroups);
    }
  }, [isGroupsLoading]);

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.filtersWrapper}>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown
              options={groupFilterItems ? groupFilterItems.map((group) => group.name) : [""]}
              placeholderText="Группа"
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown options={postFilterItems ? postFilterItems : [""]} placeholderText="Должность" />
          </div>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown options={departmentFilterItems ? departmentFilterItems : [""]} placeholderText="Отдел" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Применить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
