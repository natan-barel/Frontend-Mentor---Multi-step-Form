import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@wizard/services/form.service';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { Observable, combineLatest, map, withLatestFrom } from 'rxjs';
import { selectFormValue, selectFormValueByPath } from 'src/app/store/multi-step-form.selectors';
import { MultiStepFormValue } from 'src/app/store/multi-step-form.state';


@Component({
  selector: 'app-step-four-summary',
  templateUrl: './step-four-summary.component.html',
  styleUrls: ['./step-four-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFourSummaryComponent extends StepComponentBase implements OnInit {
  @Input() stepForm!: FormGroup;
  formValue$: Observable<MultiStepFormValue> = this.store.select(selectFormValue)

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef, private store: Store) {
    super(formService, cdr);
  }

  override ngOnInit(): void {
    this.formValue$.subscribe(console.log)
  }

  changePlan() {
    this.goToStepByFormGroupName('planDetails');
  }
}
