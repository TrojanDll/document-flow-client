import { FC, useEffect, useState } from "react";
import styles from "./UsersPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetCurrientGroupMembersQuery } from "../../features/users/usersApiSlice";
import TableUsers from "../../components/TableUsers/TableUsers";

const UsersPage: FC = () => {
  const { data: currientGroupMembers } = useGetCurrientGroupMembersQuery();

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
