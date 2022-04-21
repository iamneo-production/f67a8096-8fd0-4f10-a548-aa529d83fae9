import Database from "database/Database";

export async function cardUserOnEnrollCourseAction(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();

    let cardProp = state.cardProp;

    nav(`${cardProp.id}/enroll`, { state: { email: await Database.getCurrUserEmail() } });
}