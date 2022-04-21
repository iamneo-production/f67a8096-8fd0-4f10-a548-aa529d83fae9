export function deleteCardEvent() {

    return new CustomEvent('deleteCardEvent', {
        cancelable: false,
        bubbles: true
    });
}
