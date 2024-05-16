import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import styles from "./AdminPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputGroup } from "react-bootstrap";
import searchImg from "./../../assets/img/icons/search.svg";
// import FilterModal from "../../components/FilterModal/FilterModal";
import TableUsers from "../../components/TableUsers/TableUsers";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal";
import { useGetUsersQuery } from "../../features/admin/adminApiSlice";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import { IUser } from "../../types/Types";

const AdminPage = () => {
  // const [modalFilterShow, setModalFilterShow] = useState(false);
  const [modalCreateUserShow, setModalCreateUserShow] = useState(false);
  const [modalCreateGroupShow, setModalCreateGroupShow] = useState(false);
  // const [usersList, setUsersList] = useState<IUser[]>([]);
  const { data: fetchedUsers, isLoading, refetch: getUsers } = useGetUsersQuery();
  const [modifiedUsers, setModifiedUsers] = useState<IUser[]>([]);

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

  // const filterUsers = () => {};

  useEffect(() => {
    if (!isLoading && fetchedUsers) {
      sortUsersByField(fetchedUsers, "firstName");
      console.log("fetchedUsers");
      console.log(fetchedUsers);
    }
  }, [isLoading]);

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
            <Form.Control placeholder="Поиск... (В разработке)" aria-label="Username" />
          </InputGroup>

          {/* <Button variant="outline-primary" onClick={() => setModalFilterShow(true)}>
            Фильтры
          </Button>

          <FilterModal user={fetchedUsers} show={modalFilterShow} onHide={() => setModalFilterShow(false)} /> */}

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
        {modifiedUsers && <TableUsers handleUdateTable={handleUdateTable} users={modifiedUsers} />}
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
