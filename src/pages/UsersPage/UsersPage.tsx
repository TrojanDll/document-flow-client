import { FC } from "react";
import styles from "./UsersPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import TableUsers from "../../components/TableUsers/TableUsers";
import { useGetUsersQuery } from "../../features/admin/adminApiSlice";

const UsersPage: FC = () => {
  const { data: currientGroupMembers } = useGetUsersQuery();

  return (
    <div className={styles.layout}>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Пользователи</PageTitle>
        {currientGroupMembers ? (
          <TableUsers isReadonly={true} handleUdateTable={() => {}} users={currientGroupMembers} />
        ) : (
          ""
        )}
      </ContentContainer>
    </div>
  );
};
export default UsersPage;
