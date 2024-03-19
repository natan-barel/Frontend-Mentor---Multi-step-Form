import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormService } from '@wizard/services/form.service';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-four-summary',
  templateUrl: './step-four-summary.component.html',
  styleUrls: ['./step-four-summary.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourSummaryComponent extends StepComponentBase implements OnInit {
  stepForm: FormGroup;
  planDetails: Observable<any>;
  addOnDetails: Observable<any>;

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef) {
    super(formService, cdr);
  }

  override ngOnInit(): void {
    this.planDetails = this.formService.getFormGroupRefByName('planDetails').valueChanges;
    this.addOnDetails = this.formService.getFormGroupRefByName('addOnDetails').valueChanges;
    this.planDetails.subscribe((val) => console.log(val));
    this.addOnDetails.subscribe((val) => console.log(val));
  }

  changePlan() {
    this.goToStepByFormGroupName('planDetails');
  }
}
