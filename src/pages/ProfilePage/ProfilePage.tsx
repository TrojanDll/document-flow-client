import { FC } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./ProfilePage.module.css";
import { Form, InputGroup } from "react-bootstrap";
// import searchImg from "./../../assets/img/icons/search.svg";
import { useGetCurrientUserQuery } from "../../features/users/usersApiSlice";
import spinner from "./../../assets/img/icons/spinner.svg";

const ProfilePage: FC = () => {
  const { data: fetchedCurrientUser, isLoading } = useGetCurrientUserQuery();
  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Профиль</PageTitle>
        {/* <div className={styles.filters}>
          <InputGroup className={styles.searchInput}>
            <InputGroup.Text>
              <img src={searchImg} alt="searchImg" />
            </InputGroup.Text>
            <Form.Control placeholder="Поиск..." aria-label="Username" />
          </InputGroup>
        </div> */}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.firstName}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.lastName}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отчество</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.patronymic}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.email}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отдел</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.department}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Должность</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.post}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Группа</Form.Label>
            {isLoading ? (
              <img className={styles.spinner} src={spinner} alt="spinner" />
            ) : (
              <Form.Control
                value={fetchedCurrientUser?.groupResponseDTO?.name}
                type="text"
                placeholder="name@example.com"
                disabled
              />
            )}
          </Form.Group>
        </Form>
      </ContentContainer>
    </div>
  );
};

export default ProfilePage;
