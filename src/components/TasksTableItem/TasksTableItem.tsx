import { FC } from "react";
import styles from "./TasksTableItem.module.css";
import { ITaskResponse } from "../../types/Types";

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
    </tr>
  );
};

export default TasksTableItem;
