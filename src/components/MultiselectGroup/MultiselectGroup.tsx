import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import styles from "./MultiselectGroup.module.css";
import closeImg from "./../../assets/img/icons/close.svg";
import { IDocument, IUser, IUserGroup } from "../../types/Types";

interface MultiselectGroupProps {
  // Отправляет наверх id группы
  handleUpdateUsersGroups: (arg: number[]) => void;
  currientDocumentInfo?: IDocument;
  editableUserInfo?: IUser;
  usersGroups: IUserGroup[];
  isDisabled?: boolean;
}

const MultiselectGroup: FC<MultiselectGroupProps> = ({
  handleUpdateUsersGroups,
  currientDocumentInfo,
  editableUserInfo,
  usersGroups,
  isDisabled,
}) => {
  const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<number[]>([]);

  useEffect(() => {
    let baseSelectedGroups: IUserGroup[] = [];
    if (currientDocumentInfo) {
      setNotSelectedUsersGroups(
        usersGroups.filter((group) => {
          const currientDocumentUsersGroups = currientDocumentInfo.userGroups;
          if (currientDocumentUsersGroups?.indexOf(group.id.toString()) === -1) {
            return group;
          } else {
            baseSelectedGroups.push(group);
          }
        })
      );
    } else if (editableUserInfo) {
      console.log("usersGroups");
      console.log(usersGroups);
      setNotSelectedUsersGroups(
        usersGroups.filter((group) => {
          const currientUserGroups = editableUserInfo?.groupResponseDTOs?.map((item) => item.id);
          console.log("currientUserGroups");
          console.log(currientUserGroups);
          if (currientUserGroups?.indexOf(group.id) === -1) {
            return group;
          } else {
            baseSelectedGroups.push(group);
          }
        })
      );
    } else {
      setNotSelectedUsersGroups(usersGroups);
    }

    setSelectedUsersGroups(baseSelectedGroups);
  }, []);

  // useEffect(() => {
  //   console.log(notSelectedUsersGroups);
  // }, [notSelectedUsersGroups]);

  // let fetchedUsersGroups;
  // useEffect(() => {
  //   console.log(userGroup);
  // }, [userGroup]);

  useEffect(() => {
    setUsersGroupsIds(selectedUsersGroups.map((item) => item.id));
  }, [selectedUsersGroups]);

  useEffect(() => {
    handleUpdateUsersGroups(usersGroupsIds);
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
      })
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
      })
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
        disabled={isDisabled}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
        aria-label="Выберите группу"
      >
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
              variant="outline-secondary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectUsersGroup(e)}
              data-value={group.id}
            >
              {group.name}
              <Badge bg="light">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div>
    </Form.Group>
  );
};

export default MultiselectGroup;
