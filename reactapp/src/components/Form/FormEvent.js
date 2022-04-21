export function formInputInvalidEvent(element, data) {
    //console.log(element.parentElement);
    element.dispatchEvent(
        new CustomEvent('formxviInputInvalidEvent', {
            detail: { payload: data, },
            cancelable: false,
            bubbles: true
        })
    );
}

export function formInputValidEvent(element, data) {
    element.dispatchEvent(
        new CustomEvent('formxviInputValidEvent', {
            detail: { payload: data },
            cancelable: false,
            bubbles: true
        })
    );
}

export function formEnableSubmitButton(element) {
    element.dispatchEvent(
        new CustomEvent('formxviEnableSubmitButton', {
            cancelable: false,
            bubbles: false
        })
    );
}

export function formDisableSubmitButton(element) {
    console.log(element === null);
    element.dispatchEvent(
        new CustomEvent('formxviDisableSubmitButton', {
            cancelable: false,
            bubbles: false,
        })
    );
}

export function formReset(element) {
    element.dispatchEvent(
        new CustomEvent('formxviResetEvent', {
            cancelable: false,
            bubbles: true
        })
    );
}
