import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormService } from '@wizard/services/form.service';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';

@Component({
  selector: 'app-step-five-confim',
  templateUrl: './step-five-confim.component.html',
  styleUrls: ['./step-five-confim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFiveConfimComponent extends StepComponentBase implements OnInit {
  loading = true;

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef, private store: Store) {
    super(formService, cdr);
  }

  override ngOnInit(): void {
    setTimeout(() => { this.loading = false }, 3000)
  }
}
