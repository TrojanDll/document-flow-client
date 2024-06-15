import { Route, Routes } from "react-router-dom";
// import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import AdminPage from "./pages/AdminPage/AdminPage";
// import TasksPage from "./pages/TasksPage/TasksPage";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import UsersPage from "./pages/UsersPage/UsersPage";
import Layout from "./features/Layout";
import RequireAuth from "./features/RequireAuth";
import AdminRoleRequired from "./features/AdminRoleRequired";
import { lazy } from "react";

const Loginpage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Adminpage = lazy(() => import("./pages/AdminPage/AdminPage"));
const Documentspage = lazy(() => import("./pages/DocumentsPage/DocumentsPage"));
const Profilepage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const Taskspage = lazy(() => import("./pages/TasksPage/TasksPage"));
const Userspage = lazy(() => import("./pages/UsersPage/UsersPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Loginpage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<AdminRoleRequired />}>
            <Route path="admin" element={<Adminpage />} />
          </Route>
          <Route path="documents" element={<Documentspage />} />
          <Route path="profile" element={<Profilepage />} />
          <Route path="tasks" element={<Taskspage />} />
          <Route path="users" element={<Userspage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
