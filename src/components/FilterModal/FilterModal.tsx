import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  props?: any;
  onHide?: () => void;
  show?: boolean;
}

const FilterModal: FC<FilterModalProps> = (props) => {
  const [groupFilterItems, setGroupFilterItems] = useState(["gropup1", "gropup2", "gropup3"]);
  const [postFilterItems, setPostFilterItems] = useState(["post1", "post2", "post3"]);
  const [departmentFilterItems, setDepartmentFilterItems] = useState([
    "department1",
    "department2",
    "department3",
  ]);

  console.log(setGroupFilterItems, setPostFilterItems, setDepartmentFilterItems);

  const { show } = props;
  return (
    <Modal
      {...props}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Фильтр пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.filtersWrapper}>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown options={groupFilterItems} placeholderText="Группа" />
          </div>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown options={postFilterItems} placeholderText="Должность" />
          </div>
          <div className={styles.dropdownWrapper}>
            <FilterDropdown options={departmentFilterItems} placeholderText="Отдел" />
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
