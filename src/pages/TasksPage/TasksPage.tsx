import { FC } from "react";
import styles from "./TasksPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";

const TasksPage: FC = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Задачи</PageTitle>
      </ContentContainer>
    </div>
  );
};
export default TasksPage;
