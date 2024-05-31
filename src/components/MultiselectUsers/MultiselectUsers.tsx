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
    </Form.Group>
  );
};

export default MultiselectUsers;
