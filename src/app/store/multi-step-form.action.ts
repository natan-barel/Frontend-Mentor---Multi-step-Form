import { createAction, props } from "@ngrx/store"
import { MultiStepFormValue } from "./multi-step-form.state";

export const UPDATE_FORM = 'UPDATE_FORM'
export const FORM_SUBMIT_SUCCESS = 'FORM_SUBMIT_SUCCESS';
export const FORM_SUBMIT_ERROR = 'FORM_SUBMIT_ERROR';
export const FORM_SUBMIT = 'FORM_SUBMIT';

export const updateForm = createAction(UPDATE_FORM, props<{ stepFormState: MultiStepFormValue }>());

export const submitForm = createAction(FORM_SUBMIT, props<{ stepFormState: MultiStepFormValue }>());