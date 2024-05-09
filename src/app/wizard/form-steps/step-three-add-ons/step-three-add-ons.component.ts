import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AddOn, addOnOptions } from './addOnOptions.model';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { FormService } from '@wizard/services/form.service';
import { timeFrame } from '../step-two-plan-details/planDetails.model';
import { Store } from '@ngrx/store';
import { updateForm } from 'src/app/store/multi-step-form.action';
import { selectFormValueByPath } from 'src/app/store/multi-step-form.selectors';

@Component({
  selector: 'app-step-three-add-ons',
  templateUrl: './step-three-add-ons.component.html',
  styleUrls: ['./step-three-add-ons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeAddOnsComponent extends StepComponentBase implements OnInit {
  @Input() stepForm!: FormGroup;
  addOnOptions = addOnOptions;
  timeFrame: timeFrame;

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef, private store: Store) {
    super(formService, cdr)
  }


  override ngOnInit(): void {
    this.stepForm = this.formService.getFormGroupRefByIndex(this.stepIndex);
    this.store.select(selectFormValueByPath('planDetails')).subscribe(planDetails => {
      this.timeFrame = planDetails.duration
      console.log('changed time frame', this.timeFrame);
      this.cdr.detectChanges();
      this.updateAddOns();
    })
  }

  override submit() {
    console.log(this.stepForm.value);
    this.store.dispatch(
      updateForm({
        stepFormState: {
          addOnDetails: {
            ...this.stepForm.value
          }
        }
      })
    )
    this.goToNextStep();
  }


  updateAddOns() {

    let serviceCostUpdated = this.stepForm.value.service ? this.addOnOptions[0].timeFrame[this.timeFrame].addToTotal : 0;
    let storageCostUpdated = this.stepForm.value.storage ? this.addOnOptions[1].timeFrame[this.timeFrame].addToTotal : 0;
    let customizationCostUpdated = this.stepForm.value.customization ? this.addOnOptions[2].timeFrame[this.timeFrame].addToTotal : 0;

    this.stepForm.patchValue({
      serviceCost: serviceCostUpdated,
      storageCost: storageCostUpdated,
      customizationCost: customizationCostUpdated,
    })

  }




  toggleAddOn(event: any, addOn: AddOn) {

    this.stepForm.patchValue({
      ...this.stepForm.value,
      [addOn.formName]: event.checked,
      [addOn.formName.concat('Cost')]: event.checked ? addOn.timeFrame[this.timeFrame].addToTotal : 0
    })
  }
}
