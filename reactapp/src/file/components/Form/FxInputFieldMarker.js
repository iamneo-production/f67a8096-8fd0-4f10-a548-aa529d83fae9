import { formInputInvalidEvent, formInputValidEvent } from "./FormEvent";

export let markInputFieldError = (element, elementClassList, payload) => {
    if (elementClassList.contains('valid')) {
        elementClassList.remove('valid');
    }
    if (!elementClassList.contains('error')) {
        elementClassList.add('error');
    }

    formInputInvalidEvent(element, payload);
}

export let markInputFieldValid = (element, elementClassList, payload) => {
    if (elementClassList.contains('error')) {
        elementClassList.remove('error');
    }
    if (!elementClassList.contains('valid')) {
        elementClassList.add('valid');
    }

    formInputValidEvent(element, payload);
}

export let markInputFieldNeutral = (element, elementClassList, payload) => {
    if (elementClassList.contains('valid')) {
        elementClassList.remove('valid');
    }
    if (elementClassList.contains('error')) {
        elementClassList.remove('error');
    }
    formInputValidEvent(element, payload);
}