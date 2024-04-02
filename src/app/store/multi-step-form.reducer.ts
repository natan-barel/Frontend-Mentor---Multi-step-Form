import { createReducer, on } from "@ngrx/store";
import { stepFormState } from "./multi-step-form.state";
import { UPDATE_FORM, updateForm } from "./multi-step-form.action";


export const multiStepFormReducer = createReducer(
    stepFormState,
    on(updateForm, (state, { stepFormState }) => {
        console.log(state)
        console.log(stepFormState)
        return ({
            ...state,
            ...stepFormState
        })
    }))
