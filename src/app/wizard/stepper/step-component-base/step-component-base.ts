import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@wizard/shared/components/base-component/base-component';
import { StepPageObject } from '@wizard/shared/models/step-page-object';
import { FormService } from '@wizard/services/form.service';

@Component({
  template: '',
})
export class StepComponentBase
  extends BaseComponent
  implements OnInit, OnDestroy {
  @Input() currentStep!: StepPageObject;
  @Input() stepIndex!: number;
  @Input() stepsLength!: number;
  @Input() stepBlocked: boolean = false;
  @Output() onStepSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onStepBack: EventEmitter<any> = new EventEmitter();
  @Output() goToStepByIndex: EventEmitter<any> = new EventEmitter();


  constructor(
    protected formService: FormService,
    protected cdr: ChangeDetectorRef
  ) {
    super();
  }

  submit() {
    this.goToNextStep();
  }

  goToNextStep() {
    this.onStepSubmit.emit();
  }

  goToBackStep() {
    this.onStepBack.emit();
  }

  goToStepByStepIndex(index: number) {
    this.goToStepByIndex.emit(index);
  }

  goToStepByFormGroupName(stepName: string) {
    const stepIndex = this.formService.getFormGroupIndexByName(stepName);
    this.goToStepByIndex.emit(stepIndex);
  }

  hasNext(): boolean {
    return (this.stepsLength ? this.stepIndex !== this.stepsLength - 1 : false) && this.formService.getFormGroupRefByIndex(this.stepIndex)?.valid
  }

  hasBack(): boolean {
    return this.stepIndex !== 0 && !this.stepBlocked;
  }

}