import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import styles from "./MultiselectGroup.module.css";
import { useGetAllUsersGroupsQuery, useUpdateUserByIdMutation } from "../../features/admin/adminApiSlice";
import { useUpdateDocumentByIdMutation } from "../../features/documents/documentsApiSlice";
import closeImg from "./../../assets/img/icons/close.svg";

interface MultiselectGroupProps {
  handleUpdateUsersGrups: (arg: string[]) => void;
}

const MultiselectGroup: FC<MultiselectGroupProps> = ({ handleUpdateUsersGrups }) => {
  const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();
  const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNotSelectedUsersGroups(fetchedUsersGroups);
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
    setUsersGroupsIds(selectedUsersGroups.map((item) => item.id.toString()));
  }, [selectedUsersGroups]);

  useEffect(() => {
    handleUpdateUsersGrups(usersGroupsIds);
  }, [usersGroupsIds]);

  const handleSelectUsersGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    notSelectedUsersGroups.forEach((item) => {
      if (item.id === +e.target.value) {
        setSelectedUsersGroups([...selectedUsersGroups, item]);
      }
    });

    setNotSelectedUsersGroups(
      notSelectedUsersGroups.filter((item) => {
        if (item.id !== +e.target.value) {
          return item;
        }
      }),
    );
  };

  const handleUnselectUsersGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedId = e.currentTarget.dataset.value ? +e.currentTarget.dataset.value : 0;
    selectedUsersGroups.forEach((item) => {
      if (item.id === selectedId) {
        setNotSelectedUsersGroups([...notSelectedUsersGroups, item]);
      }
    });

    setSelectedUsersGroups(
      selectedUsersGroups.filter((item) => {
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
        aria-label="Выберите группу">
        <option>Список групп</option>
        {notSelectedUsersGroups &&
          notSelectedUsersGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
      </Form.Select>
      <div className={styles.selectedItems}>
        {selectedUsersGroups &&
          selectedUsersGroups.map((group) => (
            <Button
              key={group.id}
              variant="primary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectUsersGroup(e)}
              data-value={group.id}>
              {group.name}
              <Badge bg="secondary">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div>
    </Form.Group>
  );
};

export default MultiselectGroup;
