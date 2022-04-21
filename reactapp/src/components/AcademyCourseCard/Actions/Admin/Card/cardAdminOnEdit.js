import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import CourseAPI from "server/CourseAPI/CourseAPI";

export function adminEditCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    AcademyAPI.fetchById(state.cardProp.id).then((res) => {
        nav(`${state.cardProp.id}/edit`, { state: res.payload.academy });
    });
}

export function adminCourseEditCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    CourseAPI.fetchByCourseId(state.cardProp.id).then((res) => {
        nav(`${state.cardProp.id}/edit`, { state: res.payload.course });
    });
}