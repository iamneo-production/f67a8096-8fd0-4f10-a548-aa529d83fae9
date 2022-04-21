import validator from 'email-validator';
import { useCallback, useEffect, useRef, useState } from 'react';
import { markInputFieldError, markInputFieldNeutral, markInputFieldValid } from './FxInputFieldMarker';

//-----------props-----------
//id [id for input]
//name [optional: name for input]
//label [input label]
//defValue [optional input value]
//placeholder [optional: input placeholder]
//required [is optional]
//disabled [optional: to disable input]
//regex [optional: to check validity of input]
//errorMsg [optional: on input invalid error msg]
//validator
//---------------------------
export default function FxInput(props) {
    let iRef = useRef(null);

    let [state] = useState({
        id: props.id,
        label: props.label,
        defValue: props.defValue,
        placeholder: props.placeholder,
        required: (props.required) ? true : false,
        disabled: (props.disabled) ? true : false,
        regex: props.regex,
        errorMsg: props.errorMsg,
    });

    let setDefaultInputValue = useCallback(
        () => {
            if (state.defValue) {
                setValue(state.defValue);
                setTimeout(doValidation, 0);
            }
        },
        [state.defValue]
    );


    useEffect(() => {
        let inputElement = iRef.current;
        setDefaultInputValue();

        if (state.disabled || isInputNotRequired()) {
            setTimeout(() => {
                markInputFieldNeutral(
                    inputElement,
                    getParent().classList,
                    { id: inputElement.id, value: getValue(), name: inputElement.name });
            }, 0);
        }

        umbrellaParent().addEventListener('formxviResetEvent', onEventResetInputField);

        return (function clean() {
            umbrellaParent(inputElement).removeEventListener('formxviResetEvent', onEventResetInputField);
        });
    });

    let isValid = () => {
        if (state.regex) {
            return Boolean(getValue().match(state.regex));
        }else if(props.validator){
            return props.validator(getValue());
        }
        return Boolean(getValue());
    }

    let umbrellaParent = (inputElement) => {
        //input-fields
        return getParent(inputElement).parentElement;
    }

    let getParent = (inputElement) => {
        //input-field
        if (inputElement) { return inputElement.parentElement; }
        return iRef.current.parentElement;
    }

    let isInputNotRequired = () => { return !state.required; }


    let doValidation = () => {
        let elementClassList = getParent().classList;

        if (isValid()) {
            markInputFieldValid(
                iRef.current,
                elementClassList,
                { id: iRef.current.id, value: getValue() });
        } else {
            if (isInputNotRequired()) {
                if (!state.regex || getValue() === '') {
                    markInputFieldNeutral(
                        iRef.current,
                        elementClassList,
                        { id: iRef.current.id, value: getValue() });
                    return;
                }
            }

            markInputFieldError(
                iRef.current,
                elementClassList,
                { id: iRef.current.id, value: getValue() });
        }
    }


    let onInput = (event) => {
        event.stopPropagation();
        doValidation();
    }


    let onEventResetInputField = (event) => {
        event.stopPropagation();
        if (state.disabled) {
            return;
        } else {
            setValue('');
            doValidation();
        }
    }

    let getValue = () => { return iRef.current.value; }

    let setValue = (value) => { iRef.current.value = value; }

    let getInput = () => {
        let optionalProps = {};

        /*if (state.defValue) {
            //setValue(state.defValue)
            optionalProps.value = state.defValue;
        }*/

        if (props.style) {
            optionalProps.style = props.style;
        }

        if (state.placeholder) {
            optionalProps.placeholder = state.placeholder;
        }

        if (state.disabled) {
            optionalProps.disabled = true;
        } else {
            if (state.required) {
                optionalProps.required = true;
            }

            optionalProps.onInput = onInput;
        }
        //console.log(optionalProps);

        let inputEl = (
            <input
                ref={iRef}
                id={state.id}
                name={props.label}
                type='text'
                className="form-control"
                {...optionalProps} />
        );

        if (state.disabled) { return inputEl; }

        return (
            <>
                {inputEl}
                <div className="inline-error-msg">{state.errorMsg}</div>
            </>
        );
    }


    return (
        <span className="input-field">
            <label htmlFor={state.id} className="form-label">{state.label}</label>
            {getInput()}
        </span>
    );
}