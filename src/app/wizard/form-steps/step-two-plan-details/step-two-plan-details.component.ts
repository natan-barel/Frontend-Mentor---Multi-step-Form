import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Plan, planOptions, planType, timeFrame } from './planDetails.model';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { FormService } from '@wizard/services/form.service';
import { Store } from '@ngrx/store';
import { updateForm } from 'src/app/store/multi-step-form.action';

@Component({
  selector: 'app-step-two-plan-details',
  templateUrl: './step-two-plan-details.component.html',
  styleUrls: ['./step-two-plan-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepTwoPlanDetailsComponent extends StepComponentBase implements OnInit {
  @Input() stepForm!: FormGroup;
  planType: planType = planType.ARCADE;
  timeFrame: timeFrame = timeFrame.MONTHLY;
  totalCost: number = 0;
  checked = false;
  planOptions = planOptions;

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef, private store: Store) {
    super(formService, cdr)
  }

  override ngOnInit(): void {
    this.stepForm = this.formService.getFormGroupRefByIndex(this.stepIndex);
    this.timeFrame = this.stepForm.controls['duration'].value || timeFrame.MONTHLY;
  }

  override submit() {
    console.log(this.stepForm.value);
    this.store.dispatch(
      updateForm({
        stepFormState: {
          planDetails: {
            ...this.stepForm.value
          }
        }
      })
    )
    this.goToNextStep();
  }

  planeTrackBy = (index, plan: Plan) => plan

  public onPlanChange(planType: planType) {
    this.planType = planType;
  }

  updatePlanType(plan: planType, cost?: number) {
    console.log('updatePlanType', plan, cost)
    this.planType = plan;
    console.log(this.planType);
    this.totalCost = cost
    this.stepForm.patchValue({
      plan,
      planCost: cost,
      totalCost: cost
    })
  }

  updateDuration() {
    const planDetails = this.planOptions[this.planOptions.findIndex(p => p.type == this.planType)].duration[this.timeFrame];
    this.stepForm.patchValue({
      plan: this.planType
    })
    if (this.checked === false) {
      this.stepForm.patchValue({
        duration: 'monthly',
        planCost: planDetails.addToTotal,
        totalCost: planDetails.addToTotal
      })

    } if (this.checked === true) {
      this.stepForm.patchValue({
        duration: 'yearly',
        planCost: planDetails.addToTotal,
        totalCost: planDetails.addToTotal
      })
    }
  }

  toggleDuration() {
    this.checked = !this.checked;
    if (!this.checked) {
      this.timeFrame = timeFrame.MONTHLY
      this.updateDuration();
    }
    if (this.checked) {
      this.timeFrame = timeFrame.YEARLY;
      this.updateDuration();
    }
  }


}
