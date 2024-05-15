import { FC } from "react";
import styles from "./TasksTable.module.css";
import { Table } from "react-bootstrap";
import { ITaskResponse } from "../../types/Types";
import TasksTableItem, { TasksTableItemVariants } from "../TasksTableItem/TasksTableItem";

interface TasksTableProps {
  tasks: ITaskResponse[];
  handleUdateTable: () => void;
}

const TasksTable: FC<TasksTableProps> = ({ tasks, handleUdateTable }) => {
  return (
    <Table bordered className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>id</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Создатель</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>Дедлайн</th>
          <th>Связаный документ</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, i) => (
          <TasksTableItem
            variant={i % 2 === 0 ? TasksTableItemVariants.light : TasksTableItemVariants.dark}
            key={task.id}
            task={task}
            handleUdateTable={() => handleUdateTable()}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TasksTable;
