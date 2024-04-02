import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@wizard/services/form.service';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { Observable } from 'rxjs';
import { selectFormValueByPath } from 'src/app/store/multi-step-form.selectors';


@Component({
  selector: 'app-step-four-summary',
  templateUrl: './step-four-summary.component.html',
  styleUrls: ['./step-four-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourSummaryComponent extends StepComponentBase implements OnInit {
  @Input() stepForm!: FormGroup;
  planDetails: Observable<any>;
  addOnDetails: Observable<any>;

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef, private store: Store) {
    super(formService, cdr);
  }

  override ngOnInit(): void {
    this.planDetails = this.store.select(selectFormValueByPath('planDetails'))
    this.addOnDetails = this.store.select(selectFormValueByPath('addOnDetails'))
  }

  changePlan() {
    this.goToStepByFormGroupName('planDetails');
  }
}
