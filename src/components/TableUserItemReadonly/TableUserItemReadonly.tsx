import { FC } from "react";
import styles from "./TableUserItemReadonly.module.css";
import { IUser } from "../../types/Types";

export enum TableUsersItemVariants {
  light = "light",
  dark = "dark",
}

interface TableUsersItemProps {
  user: IUser;
  variant: TableUsersItemVariants;
  number: number;
}

const TableUserItemReadonly: FC<TableUsersItemProps> = ({ user, variant, number }) => {
  const { firstName, lastName, patronymic, email, department, post, groupResponseDTOs } = user;

  return (
    <tr className={styles[variant]}>
      <td>{number}</td>
      <td>
        {firstName} <br />
        {lastName} <br />
        {patronymic} <br />
      </td>
      <td>{email}</td>
      <td>{department ? department : "Отдел не задан"}</td>
      <td>{post}</td>
      <td>
        {groupResponseDTOs
          ? groupResponseDTOs?.map((item) => (
              <span key={item.id} className={styles.groupItem}>
                {item.name}
              </span>
            ))
          : "Группа не задана"}
      </td>
    </tr>
  );
};

export default TableUserItemReadonly;
