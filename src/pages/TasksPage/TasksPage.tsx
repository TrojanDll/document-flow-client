import { FC, useState } from "react";
import styles from "./TasksPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import TasksTable from "../../components/TasksTable/TasksTable";
import { useGetCurrientUserTasksQuery } from "../../features/tasks/tasksApiSlice";
import { Button } from "react-bootstrap";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";

const TasksPage: FC = () => {
  const { data: tasks, refetch: getCurrientUserTasks } = useGetCurrientUserTasksQuery();
  const [modalCreateTaskShow, setModalCreateTaskShow] = useState(false);

  const handleUdateTable = () => {
    getCurrientUserTasks();
  };
  return (
    <div className={styles.layout}>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Задачи</PageTitle>
        <Button onClick={() => setModalCreateTaskShow(true)} className={styles.createTaskButton}>
          Создать задачу
        </Button>
        <CreateTaskModal
          handleUdateTable={() => handleUdateTable()}
          show={modalCreateTaskShow}
          onHide={() => setModalCreateTaskShow(false)}
        />
        {tasks ? <TasksTable handleUdateTable={handleUdateTable} tasks={tasks} /> : ""}
      </ContentContainer>
    </div>
  );
};
export default TasksPage;
