import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import CourseAPI from "server/CourseAPI/CourseAPI";

export async function adminAcademyDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    try {
        let id = state.cardProp.id;
        return await AcademyAPI.delete(id);
    } catch (err) {
        nav('/signin');
    }
}

export async function adminCourseDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    try {
        let id = state.cardProp.id;
        return await CourseAPI.delete(id);
    } catch (err) {
        nav('/signin');
    }
}