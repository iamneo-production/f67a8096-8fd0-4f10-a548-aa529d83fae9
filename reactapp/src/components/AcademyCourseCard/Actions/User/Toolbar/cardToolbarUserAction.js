import { enrollCardEvent } from "components/AcademyCourseCard/CustomEvents/enrollCardEvent";

export function userEnrollCourse(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.dispatchEvent(enrollCardEvent());
}

