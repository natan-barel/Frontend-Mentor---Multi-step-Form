import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
// import moment from 'moment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  multiStepForm: FormGroup = this.formBuilder.group({
    personalDetails: this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.minLength(10)]],
    }),
    planDetails: this.formBuilder.group({
      plan: ['arcade', [Validators.required]],
      duration: ['monthly', [Validators.required]],
      planCost: [9],
      totalCost: [9]
    }),
    addOnDetails: this.formBuilder.group({
      service: [false],
      serviceCost: [0],
      storage: [false],
      storageCost: [0],
      customization: [false],
      customizationCost: [0],
    })
  })

  FormValueChangesSubscription: Subscription;
  baseFormModel: any;

  constructor(private formBuilder: FormBuilder) { }


  saveFormModel() {
    this.baseFormModel = this.baseFormModel || this.getForm().value;
  }

  checkEditableStepByIndex(index): boolean {
    return !!Object.keys(this.getFormGroupRefByIndex(index).controls).length;
  }

  checkEditableStepByGroupName(key: string): boolean {
    let o_response = false;
    let keyControls = (this.getForm().get(key) as FormGroup).controls;

    if (keyControls && Object.keys(keyControls).length) {
      o_response = true;
    }

    return o_response;
  }

  checkIfStepEdited(rootGroup: FormGroup): boolean {
    let o_response = false;
    const controlKeysArr = Object.keys(rootGroup.controls);
    let _toContinue = true;
    for (var i = 0; _toContinue && i < controlKeysArr.length; i++) {
      if (rootGroup.get(controlKeysArr[i]) instanceof FormGroup) {
        o_response = this.checkIfStepEdited(
          rootGroup.get(controlKeysArr[i]) as FormGroup
        );
      } else {
        if (rootGroup.get(controlKeysArr[i]).value) {
          _toContinue = false;
          o_response = true;
        }
      }
    }

    return o_response;
  }

  getForm(): FormGroup {
    return this.multiStepForm;
  }

  getFormGroupRefByName(ref: string): FormGroup {
    return this.multiStepForm.get(ref) as FormGroup;
  }

  getFormGroupIndexByName(refName: string): number {
    return Object.keys(this.multiStepForm.controls).reduce((acc, current, currentIndex) => {
      if (current === refName) {
        return currentIndex
      }
      else {
        return acc
      }
    }, 0)
  }

  getFormGroupRefByIndex(indexRef: number): FormGroup {
    let formGroupRef: FormGroup = null;
    Object.keys(this.multiStepForm.controls).forEach((key, index) => {
      if (index === indexRef) {
        formGroupRef = this.multiStepForm.controls[key] as FormGroup;
        return;
      }
    });
    return formGroupRef;
  }


  getValueFromArray(arrayOfValues: any[], field: any): any[] {
    return arrayOfValues.reduce((acc, current) => {
      acc.push(current[field]);
      return acc;
    }, [] as any[]);
  }

  changeKeysOfArray(arrayOfValues: any[], srcKey: any, detKey: any): any[] {
    return arrayOfValues.map((val) => {
      const rObj = {};
      rObj[detKey] = val[srcKey];
      return rObj;
    });
  }

  loadDraft(draftData: any): void {
    this.iterateFormData(this.baseFormModel, draftData, this.getForm());
    this.getForm().updateValueAndValidity();
  }

  getFormForSubmit(): any {
    const form = this.removeSteps(this.getForm().value);
    this.iterateRecuAndSetDateToISOformat(form);
    return form;
  }

  iterateRecuAndSetDateToISOformat(obj: any) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (
          obj[property] &&
          obj[property].constructor === Object &&
          !Array.isArray(obj[property])
        ) {
          this.iterateRecuAndSetDateToISOformat(obj[property]);
        } else {
          if (this.checkIfValueIsDate(obj[property])) {
            let offset = obj[property].getTimezoneOffset() * 60000;
            obj[property] = new Date(
              new Date(obj[property]).getTime() - offset
            ).toISOString();
          }
        }
      }
    }
  }

  checkIfValueIsDate(value: any): boolean {
    return true;
    // return moment.isDate(value);
  }

  removeSteps(formValue: object): object {
    return Object.keys(formValue).reduce(
      (acc, key) => Object.assign(acc, formValue[key]),
      {}
    );
  }

  iterateFormData(
    draftDataModel: any,
    draftDataSource: any,
    baseForm: AbstractControl
  ) {
    for (var property in draftDataModel) {
      if (draftDataModel.hasOwnProperty(property)) {
        if (
          draftDataModel[property] &&
          draftDataModel[property].constructor === Object &&
          !Array.isArray(draftDataModel[property])
        ) {
          this.iterateFormData(
            draftDataModel[property],
            draftDataSource,
            baseForm.get(property)
          );
        } else {
          // console.log(this.findVal(draftDataSource, property));
          (baseForm.get(property) as FormControl).setValue(
            this.findVal(draftDataSource, property)
          );
          // (baseForm.get(property) as FormControl).patchValue(
          //   this.findVal(draftDataSource, property),
          //   { emitViewToModelChange: true, emitModelToViewChange: true }
          // );
        }
      }
    }
  }

  findVal(obj, keyToFind): any {
    let value = null;
    if (obj[keyToFind]) {
      return obj[keyToFind];
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        value = this.findVal(obj[key], keyToFind);
        if (value) {
          return value;
        }
      }
    }
    return value;
  }
}
