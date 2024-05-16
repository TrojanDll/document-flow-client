import { FC, useEffect, useState } from "react";
import styles from "./TasksTableItem.module.css";
import { ITaskResponse } from "../../types/Types";
import { Button } from "react-bootstrap";
import { useDeleteTaskByIdMutation } from "../../features/tasks/tasksApiSlice";
import DeleteModal from "../DeleteModal/DeleteModal";

export enum TasksTableItemVariants {
  light = "light",
  dark = "dark",
}

interface TasksTableItemProps {
  task: ITaskResponse;
  variant: TasksTableItemVariants;
  handleUdateTable: () => void;
}

const TasksTableItem: FC<TasksTableItemProps> = ({ task, variant, handleUdateTable }) => {
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [handleHideDeleteModal, setHandleHideDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete) {
      deleteTaskById(task.id).then(() => {
        handleUdateTable();
      });
    }
  }, [isDelete]);

  return (
    <tr className={styles[variant]}>
      <td>{task.id}</td>
      <td>{task.header}</td>
      <td>{task.description}</td>
      <td>{task.creator}</td>
      <td>{task.status}</td>
      <td>{task.creationDate}</td>
      <td>{task.deadline?.slice(0, task.deadline.indexOf("T"))}</td>
      <td>{task.doc?.fileName}</td>
      <td>
        <button className={styles.actionButton} onClick={() => setHandleHideDeleteModal(true)}>
          <svg
            className={`${styles.buttonSvg} ${styles.deleteSvg}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
        <DeleteModal
          text={`Вы уверены, что хотите удалить задачу ${task.header}?`}
          onHide={() => setHandleHideDeleteModal(false)}
          show={handleHideDeleteModal}
          isDelete={setIsDelete}
        />
      </td>
    </tr>
  );
};

export default TasksTableItem;
