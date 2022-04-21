export function editCardEvent() {

    return new CustomEvent('editCardEvent', {
        cancelable: false,
        bubbles: true
    });
}