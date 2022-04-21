import React from "react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Provider } from 'react-redux';

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

import MainUI from "components/MainUI/MainUI.js";
import MainStore from "store/Main/MainStore.js";


import AdminDashboard from "components/Dashboard/AdminDashboard/AdminDashboard";
import AdminAcademy from "routes/Admin/AdminAcademy/AdminAcademy";
import AdminAddAcademy from "routes/Admin/AdminAddAcademy/AdminAddAcademy";
import AdminUpdateAcademy from "routes/Admin/AdminUpdateAcademy/AdminUpdateAcademy";
import AdminCourse from "routes/Admin/AdminCourse/AdminCourse";
import AdminAddCourse from "routes/Admin/AdminAddCourse/AdminAddCourse";
import AdminUpdateCourse from "routes/Admin/AdminUpdateCourse/AdminUpdateCourse";
import AdminAllCourse from "routes/Admin/AdminAllCourses/AdminAllCourses";
import AdminAllStudents from "routes/Admin/AdminAllStudents/AdminAllStudents";
import AdminAddStudent from "routes/Admin/AdminAddStudent/AdminAddStudent";
import UserDashboard from "components/Dashboard/UserDashboard/UserDashboard";
import UserAcademy from "routes/User/UserAcademy/UserAcademy";
import UserCourse from "routes/User/UserCourse/UserCourse";
import UserEnrolledCourses from "routes/User/UserEnrolledCourses/UserEnrolledCourses";
import UserEnrollCourse from "routes/User/UserEnrollCourse/UserEnrollCourse";


import { ToastContainer } from "react-toastify";
import AdminUpdateStudent from "routes/Admin/AdminUpdateStudent/AdminUpdateStudent";

function RootToast() {

  return (
    <>
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false} />
    </>
  );
}

function MainUIRouter(props) {

  return (
    <Provider store={MainStore.store}>
      <MainUI>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path='/admin' element={<AdminDashboard />}>
              <Route path='academy' element={<RootToast />}>
                <Route index element={<AdminAcademy />}></Route>
                <Route path='add' element={<AdminAddAcademy />}></Route>
                <Route path="search" element={<AdminAcademy />}></Route>
                <Route path=':academyId/edit' element={<AdminUpdateAcademy />}></Route>
                <Route path=':academyId/courses' element={<AdminCourse />}></Route>
                <Route path=':academyId/courses/add' element={<AdminAddCourse />}></Route>
                <Route path=':academyId/courses/:courseId/edit' element={<AdminUpdateCourse />}></Route>
              </Route>
              <Route path='courses' element={<RootToast />}>
                <Route index element={<AdminAllCourse />}></Route>
                <Route path=':courseId/edit' element={<AdminUpdateCourse />}></Route>
              </Route>
              <Route path='students' element={<RootToast />}>
                <Route index element={<AdminAllStudents />}></Route>
                <Route path='add' element={<AdminAddStudent />}></Route>
                <Route path=':studentId/edit' element={<AdminUpdateStudent />}></Route>
              </Route>
            </Route>
            <Route path='/user' element={<UserDashboard />}>
              <Route path='academy' element={<RootToast />}>
                <Route index element={<UserAcademy />}></Route>
                <Route path=':academyId/courses' element={<UserCourse />}></Route>
                <Route path=':academyId/courses/:courseId/enroll' element={<UserEnrollCourse />}></Route>
              </Route>
              <Route path='courses' element={<UserEnrolledCourses />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainUI>
    </Provider>
  );
}

export default MainUIRouter;
