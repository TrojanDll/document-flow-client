import { ChangeEvent, FC, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import styles from "./MultiselectGroup.module.css";

import { IDocument, IUser, IUserGroup } from "../../types/Types";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";

import closeImg from "./../../assets/img/icons/close.svg";

interface MultiselectGroupProps {
  // Отправляет наверх id группы
  handleUpdateUsersGroups: (arg: number[]) => void;
  currientDocumentInfo?: IDocument;
  editableUserInfo?: IUser;
  preselectedGroups?: IUserGroup[];
  isDisabled?: boolean;
}

const MultiselectGroup: FC<MultiselectGroupProps> = ({
  handleUpdateUsersGroups,
  currientDocumentInfo,
  editableUserInfo,
  preselectedGroups,
  isDisabled,
}) => {
  const [notSelectedUsersGroups, setNotSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<IUserGroup[]>([]);
  const [usersGroupsIds, setUsersGroupsIds] = useState<number[]>([]);
  const { data: fetchedUsersGroups, isLoading, isSuccess } = useGetAllUsersGroupsQuery();
  const {
    data: fetchedCurrientUser,
    isLoading: isCurrientUserLoading,
    isSuccess: isCurrientUserSuccess,
  } = useGetCurrientUserQuery();

  const [usersGroups, setUsersGroups] = useState<IUserGroup[]>([]);

  useEffect(() => {
    if (!isCurrientUserLoading && isCurrientUserSuccess) {
      if (fetchedCurrientUser.groupResponseDTOs) {
        setUsersGroups(
          fetchedCurrientUser.groupResponseDTOs?.map((group) => ({ id: group.id, name: group.name, members: [] }))
        );
      }
    }

    if (!isLoading && isSuccess) {
      setUsersGroups(fetchedUsersGroups);
      return;
    }
  }, [isLoading]);

  useEffect(() => {
    let baseSelectedGroups: IUserGroup[] = [];
    if (preselectedGroups && fetchedUsersGroups) {
      setNotSelectedUsersGroups(
        fetchedUsersGroups.filter((fetchedUsersGroup) => {
          let isContains = false;
          preselectedGroups.forEach((preselectedGroup) => {
            if (preselectedGroup.id === fetchedUsersGroup.id) {
              isContains = true;
            }
          });
          if (isContains) {
            baseSelectedGroups.push(fetchedUsersGroup);
          } else {
            return fetchedUsersGroup;
          }
        })
      );
    } else if (currientDocumentInfo) {
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
      setNotSelectedUsersGroups(
        usersGroups.filter((group) => {
          const currientUserGroups = editableUserInfo?.groupResponseDTOs?.map((item) => item.id);
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
  }, [usersGroups]);

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

  return (
    <Form.Group controlId="department">
      <Form.Label>Группы пользователей</Form.Label>
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
