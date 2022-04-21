import { useCallback, useEffect, useRef, useState } from 'react';
import { markInputFieldError, markInputFieldNeutral, markInputFieldValid } from './FxInputFieldMarker';

//-----------props-----------
//id [id for input]
//label [input label]
/*
options: [
            {
                id: props.options[0].value,
                value: props.options[0].value,
                selected: props.options[0].selected,
                disabled: props.options[0].disabled,
            }
        ]
*/
//required [optional]
//disabled [optional]
//defValue
//errorMsg [on input invalid error msg]
//---------------------------

export function FxSelectOption(props) {
    //-----------props-----------
    //id [id for input optional]
    //value
    //selected [optional]
    //disabled [optional]
    //---------------------------
    let option = () => {
        let optionalProps = {};
        if (props.selected) { optionalProps.selected = true; }
        if (props.disabled) { optionalProps.disabled = true; }

        return (<option {...optionalProps}>{props.value}</option>);
    }

    return option();
}

export default function FxSelect(props) {
    let iRef = useRef(null);

    let [state] = useState({
        id: props.id,
        label: props.label,
        defSelectIndex: props.defSelectIndex,
        options: props.options,
        required: (props.required) ? true : false,
        disabled: (props.disabled) ? true : false,
        errorMsg: props.errorMsg,
    });

    let setDefaultInputValue = useCallback(
        () => {
            if (state.defSelectIndex) {
                setValue(state.defSelectIndex);
                setTimeout(doValidation, 0);
            } else {
                setValue(0);
            }
            //setTimeout(doValidation, 0);
        },
        [state.defSelectIndex]
    );

    useEffect(() => {
        let inputElement = iRef.current;

        setDefaultInputValue();

        if (state.disabled || isInputNotRequired()) {
            setTimeout(() => {
                markInputFieldNeutral(
                    iRef.current,
                    getParent().classList,
                    { id: iRef.current.id, value: getValue() });
            }, 0);
        }

        umbrellaParent().addEventListener('formxviResetEvent', onEventResetInputField);

        return (function clean() {
            umbrellaParent(inputElement).removeEventListener('formxviResetEvent', onEventResetInputField);
        });
    });

    let isValid = () => {
        if (iRef.current.hasAttribute('required')) {
            let optionElements = iRef.current.selectedOptions;
            if (optionElements.length === 0 || optionElements[0].hasAttribute('disabled')) { return false; }
        }
        return true;
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
                markInputFieldNeutral(
                    iRef.current,
                    elementClassList,
                    { id: iRef.current.id, value: getValue() });
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
            setValue(0);
            doValidation();
        }
    }

    let getValue = () => { return iRef.current.value; }

    let setValue = (index) => { iRef.current.selectedIndex = index; }


    let getSelectElement = () => {
        let selectElementOptionalProps = {};

        if (props.style) {
            selectElementOptionalProps.style = props.style;
        }

        if (state.disabled) {
            selectElementOptionalProps.disabled = true;
        } else {
            if (state.required) {
                selectElementOptionalProps.required = true;
            }
            selectElementOptionalProps.onInput = onInput;
        }


        return (
            <select
                ref={iRef}
                id={state.id}
                className="form-select" {...selectElementOptionalProps}>
                {props.children}
            </select>
        );
    }

    return (
        <span className="input-field no-style">
            <label htmlFor={state.id} className="form-label">{state.label}</label>
            {getSelectElement()}
            <div className="inline-error-msg">{state.errorMsg}</div>
        </span>
    );
}