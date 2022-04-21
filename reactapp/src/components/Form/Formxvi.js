import { useCallback, useEffect, useRef } from 'react';
import produce from 'immer';

import FxInput from './FxInput';
import FxTextarea from './FxTextarea';
import FxSelect from './FxSelect';
import { formDisableSubmitButton, formEnableSubmitButton, formReset } from './FormEvent';

import 'assets/css/formxvi/formxvi-layout.css';



//--------props-------
//title [form title]
//FxElements
//--------------------

class FxInputFieldState {
    static state = {};
}

function useFxInputValidator(formElementRef, fxchildren, isChildForm) {
    //let [state, setState] = useState({});

    let resetFxInputFieldState = useCallback(() => {
        FxInputFieldState.state = {};
    }, [])


    useEffect(() => {

        let formElement;

        if (!isChildForm) {
            console.log('Formxvi rendered');
            formElement = getFormElement();
            formElement.addEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
            formElement.addEventListener('formxviInputValidEvent', onFormValidEvent);
            setTimeout(inputValidation, 0);
        } else {
            resetFxInputFieldState();
        }


        FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
            let checkFxInputs = (fxchild) => {
                if (fxchild.type === FxInput || fxchild.type === FxSelect || fxchild.type === FxTextarea) {
                    draft[fxchild.props.id.toString()] = { valid: false, name: fxchild.props.name, value: null };
                }
            }
            for (const fxchild of fxchildren) {
                if (fxchild[Symbol.iterator]) {
                    for (const child of fxchild) {
                        checkFxInputs(child);
                    }
                } else {
                    checkFxInputs(fxchild);
                }
            }
            /*for (const fxchild of fxchildren) {
                console.log('-------------------');
                console.log(fxchild.type);
                if (fxchild.type === FxInput || fxchild.type === FxSelect || fxchild.type === FxTextarea) {
                    draft[fxchild.props.id.toString()] = { valid: false, name: '', value: null };
                }
            }*/
        });


        return (function release() {
            if (formElement) {
                formElement.removeEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
                formElement.removeEventListener('formxviInputValidEvent', onFormValidEvent);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let getFormElement = () => { return formElementRef.current; }

    let onFormInvalidEvent = (event) => {
        event.stopPropagation();
        if (event.detail) {
            let invalidEventPayload = event.detail.payload;
            //console.log(invalidEventPayload);

            FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
                draft[invalidEventPayload.id.toString()].valid = false;
                draft[invalidEventPayload.id.toString()].value = invalidEventPayload.value;

            });


            //console.log(FxInputFieldState.state);

            formDisableSubmitButton(getFormElement());
        }
    }

    let onFormValidEvent = (event) => {
        event.stopPropagation();

        if (event.detail) {
            let validEventPayload = event.detail.payload;
            //console.log(validEventPayload);
            //console.log(FxInputFieldState.state);

            FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
                draft[validEventPayload.id.toString()].valid = true;
                draft[validEventPayload.id.toString()].value = validEventPayload.value;
            });

            //console.log(FxInputFieldState.state);

            inputValidation();

        }

    }

    let inputValidation = () => {
        if (isAllInputFieldValid()) {
            console.log('all fields are valid');
            formEnableSubmitButton(getFormElement());
        } else {
            formDisableSubmitButton(getFormElement());
        }
    }

    let isAllInputFieldValid = () => {
        let flag = true;

        for (const inputStateOb of Object.values(FxInputFieldState.state)) {
            if (!inputStateOb.valid) { flag = false; break; }
        }

        //console.log(FxInputFieldState.state);

        return flag;
    }

    return () => { return FxInputFieldState.state; };

}

export default function Formxvi(props) {
    let formxviContainerRef = useRef(null);
    let formElementRef = useRef(null);
    let formSubmitButtonRef = useRef(null);
    let formResetButtonRef = useRef(null);

    let isFormChild = () => { return Boolean(props.child); }

    let formState = useFxInputValidator(formElementRef,
        (props.children[Symbol.iterator]) ? props.children : [props.children], isFormChild());

    useEffect(() => {
        //console.log('Formxvi rendered');
        let formElement = getFormElement();

        if (!isFormChild()) {
            formElement.addEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
            formElement.addEventListener('formxviDisableSubmitButton', disableFormSubmitButton);

            return (function release() {
                formElement.removeEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
                formElement.removeEventListener('formxviDisableSubmitButton', disableFormSubmitButton);
            });
        }
    });

    let getFormElement = () => { return formElementRef.current; }


    let enableFormSubmitButton = (event) => {
        //console.log('enable submit button');
        event.stopPropagation();
        if (formSubmitButtonRef.current.hasAttribute('disabled')) {
            formSubmitButtonRef.current.removeAttribute('disabled');
        }
    }

    let disableFormSubmitButton = (event) => {
        //console.log('disable submit button');
        event.stopPropagation();
        if (!formSubmitButtonRef.current.hasAttribute('disabled')) {
            formSubmitButtonRef.current.setAttribute('disabled', '');
        }
    }

    let onFormSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        //console.log(formState());
        props.onFormSubmit(formState());
    }

    let onSubmitButtonClick = (event) => {
        event.stopPropagation();
        console.log('submit form');
        getFormElement().requestSubmit();
    }

    let onResetForm = (event) => {
        event.stopPropagation();
        let inputFieldGrp = document.querySelectorAll('.formxvi-container .formxvi-layout .input-fields');
        inputFieldGrp.forEach((inputField) => { formReset(inputField); });
        //formReset(inputField);
    }



    let getFormButtons = () => {
        if (isFormChild()) return (<></>);
        return (
            <div className="formxvi-buttons">
                <button
                    ref={formResetButtonRef}
                    type="button"
                    className="btn btn-danger btn-sm" onClick={onResetForm}>RESET</button>
                <button
                    ref={formSubmitButtonRef}
                    type="button"
                    className="btn btn-primary btn-sm" onClick={onSubmitButtonClick}>SUBMIT</button>
            </div>
        );
    }

    let getFormxviLayoutClassName = () => { return isFormChild() ? "formxvi-layout child" : "formxvi-layout"; }

    let getFormLayout = () => {
        return (
            <div className={getFormxviLayoutClassName()}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{props.title}</div>


                        <div className="input-fields">
                            {props.children}
                        </div>

                        {getFormButtons()}

                    </div>
                </div>
            </div>
        );
    }

    let getFormxviContainerClassName = () => { return isFormChild() ? "formxvi-container child" : "formxvi-container"; }

    let getFormContainer = () => {
        return (
            <div
                className={getFormxviContainerClassName()}
                ref={formxviContainerRef}>

                {getFormLayout()}

            </div>
        );
    }

    let getForm = () => {
        if (isFormChild()) {
            return getFormContainer();
        }
        return (
            <form
                ref={formElementRef}
                className="formxvi-form" onSubmit={onFormSubmit}>

                {getFormContainer()}

            </form>
        )
    }

    return getForm();
}