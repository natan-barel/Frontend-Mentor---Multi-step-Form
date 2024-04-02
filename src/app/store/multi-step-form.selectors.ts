import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MultiStepFormValue } from "./multi-step-form.state";

const featureKey = 'multiStepForm';

const selectStepFormValue = createFeatureSelector<MultiStepFormValue>(featureKey);

export const selectFormValue = createSelector(selectStepFormValue, formValue => formValue);

export const selectFormValueByPath = (path: string) => createSelector(selectStepFormValue, formValue => formValue[path]);