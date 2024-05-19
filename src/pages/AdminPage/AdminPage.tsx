import { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import styles from "./AdminPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import searchImg from "./../../assets/img/icons/search.svg";
// import FilterModal from "../../components/FilterModal/FilterModal";
import TableUsers from "../../components/TableUsers/TableUsers";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal";
import { useGetUsersQuery } from "../../features/admin/adminApiSlice";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import { IUser } from "../../types/Types";
import FilterModal from "../../components/FilterModal/FilterModal";

export interface IUsersFilters {
  groupFilter: string;
  postFilter: string;
  departmentFilter: string;
}

const AdminPage = () => {
  const [modalFilterShow, setModalFilterShow] = useState(false);
  const [modalCreateUserShow, setModalCreateUserShow] = useState(false);
  const [modalCreateGroupShow, setModalCreateGroupShow] = useState(false);
  // const [usersList, setUsersList] = useState<IUser[]>([]);
  const { data: fetchedUsers, isLoading, refetch: getUsers } = useGetUsersQuery();
  const [modifiedUsers, setModifiedUsers] = useState<IUser[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [groupFilter, setGroupFilter] = useState("");
  const [postFilter, setPostFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [countOfFilters, setCountOfFilters] = useState(0);

  function sortByField<T>(arr: T[], field: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  async function sortUsersByField(listToSort: IUser[], field: keyof IUser) {
    // if (!isLoading) {
    const sortedUsers: IUser[] = await sortByField<IUser>(listToSort, field);
    // console.log(sortedUsers);
    setModifiedUsers(sortedUsers);
    // }
  }

  const handleSearchUsersByName = (textToSearch: string) => {
    setSearchedUsers(
      modifiedUsers.filter((user) => {
        if (user.firstName && user.lastName && user.patronymic) {
          const fullname = (user.firstName + " " + user.lastName + " " + user.patronymic).toLocaleLowerCase();
          if (fullname.indexOf(textToSearch.toLowerCase()) !== -1) {
            return user;
          }
        }
      })
    );
  };

  useEffect(() => {
    setFilteredUsers(
      searchedUsers.filter((user) => {
        const userGroups = user.groupResponseDTOs?.map((group) => group.name);
        let isAppropriate = true;
        let countOfFilters = 0;
        if (groupFilter.length > 0) {
          if (userGroups?.indexOf(groupFilter) === -1) {
            isAppropriate = false;
          }
          countOfFilters++;
        }

        if (postFilter.length > 0) {
          if (user.post?.indexOf(postFilter) === -1) {
            isAppropriate = false;
          }
          countOfFilters++;
        }

        if (departmentFilter.length > 0) {
          if (user.department?.indexOf(departmentFilter) === -1) {
            isAppropriate = false;
          }
          countOfFilters++;
        }

        if (isAppropriate) {
          return user;
        }
        setCountOfFilters(countOfFilters);
      })
    );
  }, [groupFilter, postFilter, departmentFilter, searchedUsers]);

  const handleUpdateFilters = (filters: IUsersFilters) => {
    setGroupFilter(filters.groupFilter);
    setDepartmentFilter(filters.departmentFilter);
    setPostFilter(filters.postFilter);
    setCountOfFilters(0);
  };

  useEffect(() => {
    if (!isLoading && fetchedUsers) {
      sortUsersByField(fetchedUsers, "firstName");
    }
  }, [isLoading]);

  useEffect(() => {
    setSearchedUsers(modifiedUsers);
    setFilteredUsers(modifiedUsers);
  }, [modifiedUsers]);

  let refetchedUsers: IUser[];

  const handleUdateTable = async () => {
    getUsers().then((resp) => {
      if (resp.data) {
        refetchedUsers = resp.data;
        sortUsersByField(refetchedUsers, "firstName");
      }
    });
  };

  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Администрирование</PageTitle>

        <div className={styles.filters}>
          <InputGroup className={styles.searchInput}>
            <InputGroup.Text>
              <img src={searchImg} alt="searchImg" />
            </InputGroup.Text>
            <Form.Control
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchUsersByName(e.target.value)}
              placeholder="Поиск"
              aria-label="Username"
            />
          </InputGroup>

          <Button variant="outline-primary" onClick={() => setModalFilterShow(true)}>
            Фильтры
            {countOfFilters > 0 ? (
              <Badge bg="secondary" className={styles.countOfFiltersBadge}>
                {countOfFilters}
              </Badge>
            ) : (
              ""
            )}
          </Button>

          {fetchedUsers ? (
            <FilterModal
              handleUpdateFilters={handleUpdateFilters}
              users={fetchedUsers}
              show={modalFilterShow}
              onHide={() => setModalFilterShow(false)}
            />
          ) : (
            ""
          )}

          <Button variant="secondary" onClick={() => setModalCreateGroupShow(true)}>
            Настроить группы пользователей
          </Button>
          <CreateGroupModal show={modalCreateGroupShow} onHide={() => setModalCreateGroupShow(false)} />

          {/* <Form className={styles.addGroupWrapper}>
            <Form.Control type="text" placeholder="Новая группа документов" />
            <Button variant="secondary" type="submit">
              Добавить
            </Button>
          </Form> */}

          <Button variant="success" onClick={() => setModalCreateUserShow(true)}>
            Добавить пользователя
          </Button>
          <CreateUserModal
            handleUdateTable={() => handleUdateTable()}
            show={modalCreateUserShow}
            onHide={() => setModalCreateUserShow(false)}
          />
        </div>
        {filteredUsers && <TableUsers handleUdateTable={handleUdateTable} users={filteredUsers} />}
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
