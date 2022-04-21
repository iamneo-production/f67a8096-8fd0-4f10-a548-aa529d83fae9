import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import CourseAPI from "server/CourseAPI/CourseAPI";
import EnrolledCourseAPI from "server/EnrolledCourseAPI/EnrolledCourseAPI";
import Database from "database/Database";
import { useEffect, useState } from "react";
import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";

function cardPropFormat(course, toolbarConfig, breadCrumb) {
    let propFormat = {
        id: course.courseId,
        title: course.courseName,
        description: course.courseDesc,
        duration: `${course.courseDuration} days`,
        cost: course.courseCost,
        timing: course.courseTimings,
        rating: course.rating,
        toolbarConfig: toolbarConfig,
    };

    if (breadCrumb) {
        propFormat.breadCrumb = breadCrumb;
    }

    return propFormat;
}

/*
admin
user
allCourses
allEnrolledCourse
onSearch
*/

export default function CourseView(props) {
    let [state, setState] = useState({
        view: {
            search: {
                display: false,
                payload: ''
            }
        }
    });

    let nav = useNavigate();

    let loc = useLocation();

    let param = useParams();

    let mainStoreDispatch = useDispatch();

    let getAcademyId = () => { return param.academyId; }

    let onAddCourseClicked = () => {
        nav('add');
    }

    useEffect(() => {
        let locState = loc.state;
        if (locState) {
            if (!locState.view.search.display) {
                console.log(locState);
                setState({
                    view: {
                        search: {
                            display: false,
                            payload: ''
                        }
                    }
                });
            }
        }
    }, [loc.state]);

    let getBreadCrumb = (course) => {
        let breadCrumb = null;
        if (props.allCourses || props.allEnrolledCourse) {
            breadCrumb = {
                crumb: course.institute.instituteName,
            };
            if (props.admin) {
                breadCrumb.onClick = () => { nav(`/admin/academy/${course.institute.instituteId}/courses`); }
            } else {
                breadCrumb.onClick = () => { nav(`/user/academy/${course.institute.instituteId}/courses`); }
            }
        }

        return breadCrumb;
    }

    let isCourseEnrolled = async (courseId) => {
        let userId = await Database.getUserId();
        return EnrolledCourseAPI.getEnrollmentStatus(userId, courseId).then((res) => { return res.payload; });
    }

    let getToolbarConfig = async (courseId) => {
        let config = null;
        if (await isCourseEnrolled(courseId)) {
            config = {
                disable: {
                    button: {
                        enroll: true
                    }
                }
            }
        }

        return config;
    }

    let getAllCourseCardPropData = async (rawResAllCourses) => {
        let cardPropsData = [];

        let toolbarConfig;

        console.log(rawResAllCourses);

        if (rawResAllCourses[Symbol.iterator]) {

            for (const course of rawResAllCourses) {
                toolbarConfig = await getToolbarConfig(course.courseId);

                cardPropsData.push(cardPropFormat(course, toolbarConfig, getBreadCrumb(course)));
            }

            return cardPropsData;
        } else {
            let course = rawResAllCourses;

            toolbarConfig = await getToolbarConfig(course.courseId);

            cardPropsData.push(cardPropFormat(course), toolbarConfig, getBreadCrumb(course));
        }
    }

    let fetchAllCourse = async () => {
        let payload;
        if (props.allCourses) {
            //all courses of all academies
            payload = await CourseAPI.fetchAll().then((response) => { return response.payload; });
        } else {
            //all courses of an academy
            payload = await CourseAPI.fetchByAcadmeyId(getAcademyId()).then((response) => { return response.payload; });
        }


        return getAllCourseCardPropData(payload.course);
    }

    let fetchAllEnrolledCourse = async () => {
        let cardPropsData = [];
        let payload = await EnrolledCourseAPI.fetchByUserId(await Database.getUserId()).then((response) => { return response.payload; });

        if (payload.course[Symbol.iterator]) {

            payload.course.forEach((details) => {
                console.log(details);
                let courseDetails = details.course;

                cardPropsData.push(cardPropFormat(courseDetails, null, getBreadCrumb(courseDetails)));
            });

            return cardPropsData;
        } else {
            let course = payload.course.course;
            cardPropsData.push(cardPropFormat(course, null, getBreadCrumb(course)));
        }

        return cardPropsData;
    }

    let checkSourceTrue = async (id) => {
        try {
            await CourseAPI.fetchById(id)
        } catch (err) {
            if (err.statusCode === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteCourseDetail', payload: id });
            }
        }
    }

    let getAllCourseAdminView = () => {
        CardContainerNotifier.update();

        if (state.view.search.display) {
            console.log(state);

            return (
                <CardContainer
                    admin
                    course
                    fetch={fetchSearchResults}
                    checkSourceTrue={checkSourceTrue} />
            );
        }

        return (
            <CardContainer
                admin
                course
                fetch={fetchAllCourse}
                checkSourceTrue={checkSourceTrue} />
        );
    }


    let getAllEnrolledCourseUserView = () => {
        CardContainerNotifier.update();

        if (state.view.search.display) {
            console.log(state);

            return (
                <CardContainer
                    user
                    course={{
                        type: {
                            allEnrolledCourse: true
                        }
                    }}
                    fetch={fetchSearchResults}
                    checkSourceTrue={() => { return true; }} />
            );
        }

        return (
            <CardContainer
                user
                course={{
                    type: {
                        allEnrolledCourse: true
                    }
                }}
                fetch={fetchAllEnrolledCourse}
                checkSourceTrue={() => { return true; }} />
        );
    }


    let getAcademyAllCourseAdminView = () => {
        CardContainerNotifier.update();

        if (state.view.search.display) {
            console.log(state);

            return (
                <>
                    <CardContainer
                        admin
                        course
                        fetch={fetchSearchResults}
                        checkSourceTrue={checkSourceTrue} />
                    <HoverButton
                        id='addCourseHoverButton'
                        text='Add Course'
                        onClick={onAddCourseClicked} />
                </>
            );
        }

        return (
            <>
                <CardContainer
                    admin
                    course
                    fetch={fetchAllCourse}
                    checkSourceTrue={checkSourceTrue} />
                <HoverButton
                    id='addCourseHoverButton'
                    text='Add Course'
                    onClick={onAddCourseClicked} />
            </>
        );
    }


    let getAcademyAllCourseUserView = () => {
        CardContainerNotifier.update();

        if (state.view.search.display) {
            console.log(state);

            return (
                <CardContainer
                    user
                    course
                    fetch={fetchSearchResults}
                    checkSourceTrue={checkSourceTrue} />);
        }

        return (
            <CardContainer
                user
                course
                fetch={fetchAllCourse}
                checkSourceTrue={checkSourceTrue} />);
    }

    let getView = () => {
        if (props.admin) {
            if (props.allCourses) {
                return getAllCourseAdminView();
            }

            return getAcademyAllCourseAdminView();
        } else {
            if (props.allEnrolledCourse) {
                return getAllEnrolledCourseUserView();
            } else {
                return getAcademyAllCourseUserView();
            }
        }
    }

    let onSearch = (text) => {
        console.log('search course --->' + text)
        setState({
            view: {
                search: {
                    display: true,
                    payload: text
                }
            }
        });
    }

    let fetchSearchResults = async () => {
        let text = state.view.search.payload;

        let results = await props.onSearch(text);

        if (results) {
            return getAllCourseCardPropData(results)
            /*results.forEach((sResult) => {
                console.log(sResult);
                academyProp.push(cardPropFormat(sResult));
            });*///getAllCourseCardPropData(sResult)

        } else {
            console.log('search results is empty');

            setState({
                view: {
                    search: {
                        display: false,
                        payload: text
                    }
                }
            });
        }

        return [];
    }

    return (
        <>
            <SearchBar course onSearch={onSearch} />
            {getView()}
        </>
    );
}