import { deleteCardEvent } from "components/AcademyCourseCard/CustomEvents/deleteCardEvent";
import { editCardEvent } from "components/AcademyCourseCard/CustomEvents/editCardEvent";

export function editCard(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.dispatchEvent(editCardEvent());
}

export function deleteCard(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.dispatchEvent(deleteCardEvent());
}