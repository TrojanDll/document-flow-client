import { FC } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
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
