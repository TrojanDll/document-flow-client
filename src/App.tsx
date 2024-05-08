import { Route, Routes } from "react-router-dom";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Layout from "./features/Layout";
import RequireAuth from "./features/RequireAuth";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AdminRoleRequired from "./features/AdminRoleRequired";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<LoginPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<AdminRoleRequired />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
