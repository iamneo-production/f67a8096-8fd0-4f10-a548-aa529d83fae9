export function deleteStudentEvent(element, data) {
    element.dispatchEvent(
        new CustomEvent('deleteStudentEvent', {
            detail: { payload: data },
            cancelable: false,
            bubbles: true
        })
    );
}
