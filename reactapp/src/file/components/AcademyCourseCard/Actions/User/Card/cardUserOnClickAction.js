export function cardAcademyUserOnClickAction(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();

    let cardProp = state.cardProp;

    nav(`${cardProp.id}/courses`);
}