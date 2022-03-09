import AdminDashboard from "components/Dashboard/AdminDashboard/AdminDashboard.js";
import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';

export class AdminRoute {

    static get adminElement() {
        return (<AdminDashboard />);
    }

    static get academyElement() {
        return (
            <>
                <SearchBar academy />
                <CardContainer admin academy />
                <HoverButton buttonId='addAcademyHoverButton' name='Add Academy' />
            </>
        );
    }

    static get addAcademyElement() {
        return (
            <>

            </>
        );
    }

    static get updateAcademyElement() {
        return (
            <>

            </>
        );
    }

    static get academyCoursesElement() {
        return (
            <>
                <SearchBar course />
                <CardContainer admin course />
                <HoverButton buttonId='addCourseHoverButton' name='Add Course' />
            </>
        );
    }

    static get allCoursesElement() {
        return (
            <>
                <SearchBar course />
                <CardContainer admin course />
            </>
        );
    }


    static get addCourseElement() {
        return (
            <>

            </>
        );
    }

    static get updateCourseElement() {
        return (
            <>

            </>
        );
    }

    static get allStudents() {
        return (
            <>
                <SearchBar students />
            </>
        );
    }

    static get addStudentElement() {
        return (
            <>

            </>
        );
    }

    static get updateStudentElement() {
        return (
            <>

            </>
        );
    }
}


