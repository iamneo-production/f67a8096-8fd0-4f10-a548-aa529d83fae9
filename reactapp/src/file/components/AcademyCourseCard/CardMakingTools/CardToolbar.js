import { editCard, deleteCard } from "components/AcademyCourseCard/Actions/Admin/Toolbar/cardToolbarAdminAction";
import { userEnrollCourse } from "../Actions/User/Toolbar/cardToolbarUserAction";

//props: cardOf(academy | course)
//authorityType: admin | course
export default function CardToolbar(props) {
    let idStore = {
        admin: {
            academy: {
                edit: 'editAcademy',
                delete: 'deleteAcademy',
            },
            course: {
                edit: 'editCourse',
                delete: 'deleteCourse',
            },
        },
        user: {
            course: {
                enroll: 'enrollCourse',
            }
        }
    };


    let adminButtons = () => {
        let editButtonId = (props.cardOf === 'academy') ? idStore.admin.academy.edit : idStore.admin.course.edit;
        let delButtonId = (props.cardOf === 'academy') ? idStore.admin.academy.delete : idStore.admin.course.delete;
        return (
            <>
                <span class="toolbar-item one">
                    <button
                        id={editButtonId}
                        type="button"
                        class="btn btn-primary"
                        onClick={editCard}>Edit</button>
                </span>
                <span class="toolbar-item two">
                    <button
                        id={delButtonId}
                        type="button"
                        class="btn btn-primary"
                        onClick={deleteCard}>Delete</button>
                </span>
            </>
        );
    };

    let userCourseEnrollButton = (config) => {
        return (
            <span class="toolbar-item one">
                <button
                    id={idStore.user.course.enroll}
                    type="button"
                    class="btn btn-primary"
                    onClick={userEnrollCourse} disabled={config.disabled}>Enroll Course
                </button>
            </span>
        );
    };

    let userCourseMyLearningButton = () => {
        return (
            <span class="toolbar-item one">
                <button
                    id={idStore.user.course.enroll}
                    type="button"
                    class="btn btn-primary">MyLearning
                </button>
            </span>
        );
    };

    let getButtons = () => {
        if (props.authorityType === 'admin') {
            return adminButtons();
        } else if (props.authorityType === 'user') {
            if (props.cardOf === 'course') {
                if (props.cardOfType) {
                    if (props.cardOfType.allEnrolledCourse) {
                        return userCourseMyLearningButton();
                    }
                } else {
                    let disabled = false;
                    //console.log(props.toolbarConfig)
                    if (props.toolbarConfig) {
                        if (props.toolbarConfig.disable) {
                            if (props.toolbarConfig.disable.button) {
                                if (props.toolbarConfig.disable.button.enroll) {
                                    disabled = true;
                                }
                            }
                        }
                    }

                    return userCourseEnrollButton({ disabled: disabled });
                }
            }
        } else {
            return (<></>);
        }
    };

    return (
        <section class="sec three">
            <div class="level one">
                {getButtons()}
            </div>
        </section>
    );
}