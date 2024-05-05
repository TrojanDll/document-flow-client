import React, { useState } from "react";
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
  const { data: users } = useGetUsersQuery({});
  console.log(users);

  const usersList: IUser[] = [
    {
      id: 1,
      department: "Отдел1",
      email: "example@example.com",
      first_name: "Иван",
      last_name: "Иванов",
      patronymic: "Иванович",
      post: "Почтальон",
      user_group: 124,
      role: "user",
    },

    {
      id: 2,
      department: "Отдел1",
      email: "example2@example.com",
      first_name: "Петр",
      last_name: "Иванов",
      patronymic: "Петрович",
      post: "Бухгалтер",
      user_group: 10,
      role: "user",
    },
  ];

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
        <TableUsers users={usersList} />
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
