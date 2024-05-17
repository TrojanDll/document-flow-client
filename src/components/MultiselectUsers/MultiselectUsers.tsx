import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import styles from "./MultiselectUsers.module.css";
import closeImg from "./../../assets/img/icons/close.svg";
import { IUser } from "../../types/Types";

interface MultiselectUsersProps {
  handleUpdateUsers: (arg: string[]) => void;
  isDisabled?: boolean;
  fetchedUsersList?: IUser[];
  users: IUser[];
}

const MultiselectUsers: FC<MultiselectUsersProps> = ({ isDisabled, users, handleUpdateUsers, fetchedUsersList }) => {
  const [notSelectedUsers, setNotSelectedUsers] = useState<IUser[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetchedUsersList");
    console.log(fetchedUsersList);

    let baseSelectedUsers: IUser[] = [];
    let baseNotSelectedUsers: IUser[] = [];

    if (fetchedUsersList) {
      let fetchedUsersEmails = fetchedUsersList?.map((item) => item.email);

      users.forEach((user) => {
        if (fetchedUsersEmails.indexOf(user.email) === -1) {
          baseNotSelectedUsers.push(user);
        } else {
          baseSelectedUsers.push(user);
        }
      });
    } else {
      baseNotSelectedUsers = users;
    }

    setNotSelectedUsers(baseNotSelectedUsers);
    setSelectedUsers(baseSelectedUsers);
  }, []);

  useEffect(() => {
    setUserEmails(selectedUsers.map((item) => (item.email ? item.email : "")));
  }, [selectedUsers]);

  useEffect(() => {
    handleUpdateUsers(userEmails);
  }, [userEmails]);

  const handleSelectUsersGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    notSelectedUsers.forEach((item) => {
      if (item.id === +e.target.value) {
        setSelectedUsers([...selectedUsers, item]);
      }
    });

    setNotSelectedUsers(
      notSelectedUsers.filter((item) => {
        if (item.id !== +e.target.value) {
          return item;
        }
      })
    );
  };

  const handleUnselectUsersGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedId = e.currentTarget.dataset.value ? +e.currentTarget.dataset.value : 0;
    selectedUsers.forEach((item) => {
      if (item.id === selectedId) {
        setNotSelectedUsers([...notSelectedUsers, item]);
      }
    });

    setSelectedUsers(
      selectedUsers.filter((item) => {
        if (item.id !== selectedId) {
          return item;
        }
      })
    );
  };

  return (
    <Form.Group controlId="department">
      <Form.Label>Назначить задачу пользователям:</Form.Label>
      <Form.Select
        disabled={isDisabled}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
        aria-label="Выберите группу"
      >
        <option>Выберите пользователей</option>
        {notSelectedUsers &&
          notSelectedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.patronymic} - {user.email}
            </option>
          ))}
      </Form.Select>
      <div className={styles.selectedItems}>
        {selectedUsers &&
          selectedUsers.map((user) => (
            <Button
              key={user.id}
              variant="outline-secondary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectUsersGroup(e)}
              data-value={user.id}
            >
              {user.firstName} {user.patronymic} - {user.email}
              <Badge className={styles.badge} bg="light">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div>
    </Form.Group>
  );
};

export default MultiselectUsers;
