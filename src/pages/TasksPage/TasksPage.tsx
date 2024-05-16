import { FC, useEffect, useState } from "react";
import styles from "./TasksPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import TasksTable from "../../components/TasksTable/TasksTable";
import { tasksApiSlice, useGetCurrientUserTasksQuery } from "../../features/tasks/tasksApiSlice";
import { Button } from "react-bootstrap";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import { ITaskResponse } from "../../types/Types";
import { useDispatch } from "react-redux";

const TasksPage: FC = () => {
  const { data: fetchedTasks, refetch: getCurrientUserTasks, isLoading, isSuccess } = useGetCurrientUserTasksQuery();
  const [modalCreateTaskShow, setModalCreateTaskShow] = useState(false);
  const [tasks, setTasks] = useState<ITaskResponse[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setTasks(fetchedTasks);
      console.log(fetchedTasks);
    }
  }, [fetchedTasks]);

  const handleUdateTable = () => {
    dispatch(tasksApiSlice.util.resetApiState());
    getCurrientUserTasks();
    // setTasks(fetchedTasks);
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
