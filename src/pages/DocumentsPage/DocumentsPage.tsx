import React, { FC } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./DocumentsPage.module.css";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import PageTitle from "../../components/PageTitle/PageTitle";

const DocumentsPage: FC = () => {
  return (
    <div>
      <Sidebar />
      <ContentContainer>
        <PageTitle>Документы</PageTitle>
      </ContentContainer>
    </div>
  );
};

export default DocumentsPage;
