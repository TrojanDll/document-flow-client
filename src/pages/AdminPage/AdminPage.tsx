import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import styles from "./AdminPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputGroup } from "react-bootstrap";
import searchImg from "./../../assets/img/icons/search.svg";
import FilterModal from "../../components/FilterModal/FilterModal";
import TableUsers from "../../components/TableUsers/TableUsers";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";

const AdminPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { data: fetchedUsers, isLoading } = useGetUsersQuery({});
  const [modifiedUsers, setModifiedUsers] = useState([]);

  function sortByField<T>(arr: T[], field: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  async function sortUsersByField(field: string) {
    if (!isLoading) {
      const sortedUsers = await sortByField(fetchedUsers, field);
      // console.log(sortedUsers);
      setModifiedUsers(sortedUsers);
    }
  }

  useEffect(() => {
    sortUsersByField("firstName");
  }, [isLoading, fetchedUsers]);

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

          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            Фильтры
          </Button>
          <FilterModal show={modalShow} onHide={() => setModalShow(false)} />

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
        </div>
        {modifiedUsers && <TableUsers users={modifiedUsers} />}
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
