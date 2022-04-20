import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//props: admin | user
function ToolbarMenu(props) {

    let idStore = {
        admin: {
            academy: 'adminAcademy',
            courses: 'adminCourse',
            students: 'adminStudents',
        },
        student: {
            academy: 'userAcademy',
            enrolledCourse: 'userEnrolledCourse',
        }
    };

    let loc = useLocation();

    let nav = useNavigate();

    useEffect(() => {
        console.log(loc.pathname.endsWith('admin/courses'));
        if (loc.pathname.endsWith('admin/academy')) {
            activateAdminAcademy();
        }
        else if (loc.pathname.endsWith('user/academy')) {
            activateUserAcademy();
        }
        else if (loc.pathname.endsWith('admin/courses')) {
            activateAdminCourses();
        }
        else if (loc.pathname.endsWith('user/courses')) {
            activateEnrolledCoursesAcademy();
        }
        else if (loc.pathname.endsWith('admin/students')) {
            activateAdminStudents();
        } else {
            if (props.admin) {
                toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
                toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
                toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
            } else {
                toogleOffIfActiveMenuItem(document.getElementById(idStore.student.academy));
                toogleOffIfActiveMenuItem(document.getElementById(idStore.student.enrolledCourse));
            }
        }
    });

    let toogleSelectStateMenuItem = (element) => {
        if (element.classList.contains('active')) return;
        element.classList.add('active');
    }

    let toogleOffIfActiveMenuItem = (element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    }

    let activateAdminAcademy = () => {
        toogleSelectStateMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
    }

    let adminAcademyOnClick = (event) => {
        event.stopPropagation();
        nav('academy', {
            state: {
                view: {
                    search: {
                        display: false,
                        payload: ''
                    }
                }
            }
        });
    };

    let activateAdminCourses = () => {
        toogleSelectStateMenuItem(document.getElementById(idStore.admin.courses));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
    }

    let adminCourseOnClick = (event) => {
        event.stopPropagation();
        nav('courses', {
            state: {
                view: {
                    search: {
                        display: false,
                        payload: ''
                    }
                }
            }
        });
    };

    let activateAdminStudents = () => {
        toogleSelectStateMenuItem(document.getElementById(idStore.admin.students));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
    }

    let adminStudentsOnClick = (event) => {
        event.stopPropagation();
        nav('students');
    };

    let activateUserAcademy = () => {
        toogleSelectStateMenuItem(document.getElementById(idStore.student.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.enrolledCourse));
    }

    let userAcademyOnClick = (event) => {
        event.stopPropagation();
        nav('academy', {
            state: {
                view: {
                    search: {
                        display: false,
                        payload: ''
                    }
                }
            }
        });
    };

    let activateEnrolledCoursesAcademy = () => {
        toogleSelectStateMenuItem(document.getElementById(idStore.student.enrolledCourse));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.academy));
    }

    let userEnrolledCourseOnClick = (event) => {
        event.stopPropagation();
        nav('courses', {
            state: {
                view: {
                    search: {
                        display: false,
                        payload: ''
                    }
                }
            }
        });
    };


    let menuItems = () => {
        if (props.admin) {
            return (
                <>
                    <span className={`menu-item`} id={idStore.admin.academy} onClick={adminAcademyOnClick}><b>Academy</b></span>
                    <span className={`menu-item`} id={idStore.admin.courses} onClick={adminCourseOnClick}><b>Courses</b></span>
                    <span className={`menu-item`} id={idStore.admin.students} onClick={adminStudentsOnClick}><b>Students</b></span>
                </>
            );
        } else {
            if (props.user) {
                return (
                    <>
                        <span className={`menu-item`} id={idStore.student.academy} onClick={userAcademyOnClick}><b>Academy</b></span>
                        <span className={`menu-item`} id={idStore.student.enrolledCourse} onClick={userEnrolledCourseOnClick}><b>EnrolledCourse</b></span>
                    </>
                );
            }
        }
    };

    return (
        <span className="menu">
            {menuItems()}
        </span>
    );
}

export default ToolbarMenu;