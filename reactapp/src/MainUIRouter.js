import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

import MainUI from "components/MainUI/MainUI.js";
import MainStore from "store/Main/MainStore.js";

import { AdminRoute } from "components/RouteElements/AdminRoute";
import { UserRoute } from "components/RouteElements/UserRoute";
import AcademyElement from "components/RouteElements/AcademyElement.js";
import StudentsElement from "components/RouteElements/StudentsElement.js";


function MainUIRouter(props) {

  return (
    <Provider store={MainStore.store}>
      <MainUI>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path='/admin' element={AdminRoute.adminElement}>
              <Route path='academy' element={<AcademyElement />}>
                <Route index element={AdminRoute.academyElement}></Route>
                <Route path='add' element={AdminRoute.addAcademyElement}></Route>
                <Route path=':id/edit' element={AdminRoute.updateAcademyElement}></Route>
                <Route path=':id/courses' element={AdminRoute.academyCoursesElement}></Route>
                <Route path=':id/courses/add' element={AdminRoute.addCourseElement}></Route>
                <Route path=':id/courses/:id/edit' element={AdminRoute.updateCourseElement}></Route>
              </Route>
              <Route path='courses' element={AdminRoute.allCoursesElement}></Route>
              <Route path='students' element={<StudentsElement />}>
                <Route index element={AdminRoute.allStudents}></Route>
                <Route path='add' element={AdminRoute.addStudentElement}></Route>
                <Route path=':id/edit' element={AdminRoute.updateStudentElement}></Route>
              </Route>
            </Route>
            <Route path='/user' element={UserRoute.userElement}>
              <Route path='academy' element={<AcademyElement />}>
                <Route index element={UserRoute.academyElement}></Route>
                <Route path=':id/courses' element={UserRoute.academyCoursesElement}></Route>
              </Route>
              <Route path='courses' element={UserRoute.enrolledCourses}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainUI>
    </Provider>
  );
}

export default MainUIRouter;
