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

    let toogleSelectStateMenuItem = (element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    }

    let toogleOffIfActiveMenuItem = (element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    }

    let adminAcademyOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
    };

    let adminCourseOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
    };

    let adminStudentsOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
    };

    let userAcademyOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.enrolledCourse));
    };

    let userEnrolledCourseOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.academy));
    };


    let menuItems = () => {
        if (props.admin) {
            return (
                <>
                    <span class="menu-item" id={idStore.admin.academy} onClick={adminAcademyOnClick}><b>Academy</b></span>
                    <span class="menu-item" id={idStore.admin.courses} onClick={adminCourseOnClick}><b>Courses</b></span>
                    <span class="menu-item" id={idStore.admin.students} onClick={adminStudentsOnClick}><b>Students</b></span>
                </>
            );
        } else {
            if (props.user) {
                return (
                    <>
                        <span class="menu-item" id={idStore.student.academy} onClick={userAcademyOnClick}><b>Academy</b></span>
                        <span class="menu-item" id={idStore.student.enrolledCourse} onClick={userEnrolledCourseOnClick}><b>EnrolledCourse</b></span>
                    </>
                );
            }
        }
    };

    return (
        <span class="menu">
            {menuItems()}
        </span>
    );
}

export default ToolbarMenu;