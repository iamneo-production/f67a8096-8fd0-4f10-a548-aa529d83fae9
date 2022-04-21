import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import UserDashboard from "components/Dashboard/UserDashboard/UserDashboard.js";

export class UserRoute {

    static get userElement() {
        return (<UserDashboard />);
    }

    static get academyElement() {
        return (
            <>
                <SearchBar academy />
                <CardContainer user academy />
            </>
        );
    }

    static get academyCoursesElement() {
        return (
            <>
                <SearchBar course />
                <CardContainer user course />
            </>
        );
    }

    static get enrolledCourses() {
        return (
            <>
                <SearchBar course />
                <CardContainer user course />
            </>
        );
    }
}

