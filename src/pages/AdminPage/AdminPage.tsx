import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import styles from "./AdminPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, InputGroup } from "react-bootstrap";
import searchImg from "./../../assets/img/icons/search.svg";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";

const AdminPage = () => {
  const [modalShow, setModalShow] = useState(false);

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
      </ContentContainer>
    </div>
  );
};

export default AdminPage;
