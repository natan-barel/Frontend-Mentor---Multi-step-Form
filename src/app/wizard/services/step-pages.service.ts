import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepPageObject } from '@wizard/shared/models/step-page-object';


@Injectable({
  providedIn: 'root',
})
export class StepPagesService {
  constructor() { }
  private arrayOfStepsSubject = new BehaviorSubject<StepPageObject[]>([]);
  private currentStep = new BehaviorSubject<number>(0);

  public buildSteps(steps: StepPageObject[]): void {
    this.arrayOfStepsSubject.next(steps);
  }

  public getSteps(): Observable<StepPageObject[]> {
    return this.arrayOfStepsSubject.asObservable();
  }

  public getStepsLength(): Observable<number> {
    return this.getSteps().pipe(map((arrayOfSteps) => arrayOfSteps.length));
  }

  public getCurrentStep(): Observable<number> {
    return this.currentStep.asObservable();
  }

  public setCurrentStep(index: number) {
    this.currentStep.next(index);
  }

  public setStep(newStep: StepPageObject) {
    const arrayOfSteps = [...this.arrayOfStepsSubject.value, newStep];
    this.arrayOfStepsSubject.next(arrayOfSteps);
  }

  public setStepAtIndex(newStep: StepPageObject, index: number,) {
    const arrayOfSteps = [...this.arrayOfStepsSubject.value];
    arrayOfSteps.splice(index, 0, newStep);
    this.arrayOfStepsSubject.next(arrayOfSteps);
  }

  public getStepIndex(_step: StepPageObject) {
    return this.arrayOfStepsSubject.value.findIndex(
      (step) => step.component === _step.component
    );
  }

  public stepExisitsByName(_step: StepPageObject) {
    return this.arrayOfStepsSubject.value.some(
      (step) => step.component === _step.component
    );
  }

  public removeStepAtIndex(stepIndex: number) {
    const arrayOfSteps = [...this.arrayOfStepsSubject.value];
    arrayOfSteps.splice(stepIndex, 1);
    this.arrayOfStepsSubject.next(arrayOfSteps);
  }

  public removeStepByComponentName(stepComponent: StepPageObject) {
    const stepIndex = this.arrayOfStepsSubject.value.findIndex(
      (step) => step.component === stepComponent.component
    );
    if (stepIndex === -1) {
      return;
    }
    const arrayOfSteps = [...this.arrayOfStepsSubject.value];
    arrayOfSteps.splice(stepIndex, 1);
    this.arrayOfStepsSubject.next(arrayOfSteps);
  }

  resetSteps() {
    this.arrayOfStepsSubject.next([]);
  }
}