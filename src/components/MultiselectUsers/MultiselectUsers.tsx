import { FC, useEffect, useState } from "react";
import Select, { OnChangeValue } from "react-select";
import { Form } from "react-bootstrap";
import { IUser } from "../../types/Types";

interface MultiselectUsersProps {
  handleUpdateUsers: (arg: IUser[]) => void;
  isDisabled?: boolean;
  fetchedUsersList?: IUser[];
  users: IUser[];
  preselectedUsers?: IUser[];
  title: string;
}

interface IOption {
  value: IUser;
  label: string;
}

const MultiselectUsers: FC<MultiselectUsersProps> = ({
  isDisabled,
  users,
  handleUpdateUsers,
  fetchedUsersList,
  preselectedUsers,
  title,
}) => {
  const [notSelectedUsers, setNotSelectedUsers] = useState<IOption[]>(
    users.map((user) => ({
      value: user,
      label: `${user.firstName + " " + user.lastName + " " + user.patronymic}`,
    }))
  );
  const [selectedUsers, setSelectedUsers] = useState<IOption[]>([]);
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    console.log("users");
    console.log(users);
    console.log("preselectedUsers");
    console.log(preselectedUsers);

    let baseSelectedUsers: IUser[] = [];
    let baseNotSelectedUsers: IUser[] = [];

    if (preselectedUsers && users) {
      baseNotSelectedUsers = users.filter((fetchedUser) => {
        let isContains = false;
        preselectedUsers.forEach((preselectedUser) => {
          if (preselectedUser.id === fetchedUser.id) {
            isContains = true;
          }
        });
        if (isContains) {
          baseSelectedUsers.push(fetchedUser);
        } else {
          return fetchedUser;
        }
      });
    } else if (fetchedUsersList) {
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

    setNotSelectedUsers(
      baseNotSelectedUsers.map((user) => ({
        value: user,
        label: `${user.firstName + " " + user.lastName + " " + user.patronymic}`,
      }))
    );
    setSelectedUsers(
      baseSelectedUsers.map((user) => ({
        value: user,
        label: `${user.firstName + " " + user.lastName + " " + user.patronymic}`,
      }))
    );
  }, []);

  useEffect(() => {
    setUserEmails(selectedUsers.map((item) => (item.value.email ? item.value.email : "")));
  }, [selectedUsers]);

  useEffect(() => {
    handleUpdateUsers(selectedUsers.map((item) => item.value));
  }, [userEmails]);

  // const handleSelectUsersGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   notSelectedUsers.forEach((item) => {
  //     if (item.id === +e.target.value) {
  //       setSelectedUsers([...selectedUsers, item]);
  //     }
  //   });

  //   setNotSelectedUsers(
  //     notSelectedUsers.filter((item) => {
  //       if (item.id !== +e.target.value) {
  //         return item;
  //       }
  //     })
  //   );
  // };

  // const handleUnselectUsersGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const selectedId = e.currentTarget.dataset.value ? +e.currentTarget.dataset.value : 0;
  //   selectedUsers.forEach((item) => {
  //     if (item.id === selectedId) {
  //       setNotSelectedUsers([...notSelectedUsers, item]);
  //     }
  //   });

  //   setSelectedUsers(
  //     selectedUsers.filter((item) => {
  //       if (item.id !== selectedId) {
  //         return item;
  //       }
  //     })
  //   );
  // };

  const handleSelectUsers = (newValue: OnChangeValue<IOption, boolean>) => {
    setSelectedUsers(newValue as IOption[]);
  };

  return (
    <Form.Group controlId="department">
      <Form.Label>{title}</Form.Label>

      <Select
        isMulti={true}
        onChange={handleSelectUsers}
        value={selectedUsers}
        options={notSelectedUsers}
        placeholder="Пользователи"
        isDisabled={isDisabled}
      />

      {/* <Form.Select
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
              {user.firstName} {user.patronymic} -{" "}
              {user.groupResponseDTOs?.map((group) => (
                <span className={styles.userGroupItem}>{group.name}; </span>
              ))}
              <Badge className={styles.badge} bg="light">
                <img src={closeImg} alt="closeImg" />
              </Badge>
            </Button>
          ))}
      </div> */}
    </Form.Group>
  );
};

export default MultiselectUsers;
