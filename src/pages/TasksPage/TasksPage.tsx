import { FC } from "react";
import styles from "./TasksPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import TasksTable from "../../components/TasksTable/TasksTable";
import { useGetCurrientUserTasksQuery } from "../../features/tasks/tasksApiSlice";

const TasksPage: FC = () => {
  const { data: tasks } = useGetCurrientUserTasksQuery();

  const handleUdateTable = () => {
    console.log("");
  };
  return (
    <div className={styles.layout}>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Задачи</PageTitle>
        {tasks ? <TasksTable handleUdateTable={handleUdateTable} tasks={tasks} /> : ""}
      </ContentContainer>
    </div>
  );
};
export default TasksPage;
