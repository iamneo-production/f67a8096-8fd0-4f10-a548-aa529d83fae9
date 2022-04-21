export function enrollCardEvent() {

    return new CustomEvent('enrollCardEvent', {
        cancelable: false,
        bubbles: true
    });
}