import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import styles from "./AdminPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputGroup } from "react-bootstrap";
import searchImg from "./../../assets/img/icons/search.svg";
import FilterModal from "../../components/FilterModal/FilterModal";
import TableUsers from "../../components/TableUsers/TableUsers";
import { useGetUsersMutation } from "../../features/users/usersApiSlice";
import CreateUserModal from "../../components/EditUserModal/CreateUserModal";
import { useGetUsersQuery } from "../../features/admin/adminApiSlice";

const AdminPage = () => {
  const [modalFilterShow, setModalFilterShow] = useState(false);
  const [modalCreateUserShow, setModalCreateUserShow] = useState(false);
  // const [usersList, setUsersList] = useState<IUser[]>([]);
  const { data: fetchedUsers, isLoading, refetch: getUsers } = useGetUsersQuery({});
  const [modifiedUsers, setModifiedUsers] = useState<IUser[]>([]);
  const [rerender, setRerender] = useState(true);

  function sortByField<T>(arr: T[], field: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  async function sortUsersByField(field: keyof IUser) {
    // if (!isLoading) {
    const sortedUsers: IUser[] = await sortByField<IUser>(fetchedUsers, field);
    // console.log(sortedUsers);
    setModifiedUsers(sortedUsers);
    // }
  }

  useEffect(() => {
    if (!isLoading) {
      sortUsersByField("firstName");
    }
  }, [isLoading]);

  // Положить в обычный useEffect
  const handleCreateUser = () => {
    getUsers();
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
            <Form.Control placeholder="Поиск..." aria-label="Username" />
          </InputGroup>

          <Button variant="outline-primary" onClick={() => setModalFilterShow(true)}>
            Фильтры
          </Button>

          <FilterModal show={modalFilterShow} onHide={() => setModalFilterShow(false)} />

          <Form className={styles.addGroupWrapper}>
            <Form.Control type="text" placeholder="Новая группа пользователей" />
            <Button variant="secondary" type="submit">
              Добавить
            </Button>
          </Form>

          <Form className={styles.addGroupWrapper}>
            <Form.Control type="text" placeholder="Новая группа документов" />
            <Button variant="secondary" type="submit">
              Добавить
            </Button>
          </Form>

          <Button variant="success" onClick={() => setModalCreateUserShow(true)}>
            Добавить пользователя
          </Button>
          <CreateUserModal
            onCreateUser={handleCreateUser}
            show={modalCreateUserShow}
            onHide={() => setModalCreateUserShow(false)}
          />
        </div>
        {modifiedUsers && <TableUsers users={modifiedUsers} />}
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
