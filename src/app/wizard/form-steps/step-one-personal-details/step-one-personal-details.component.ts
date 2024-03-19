import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '@wizard/services/form.service';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';

@Component({
  selector: 'app-step-one-personal-details',
  templateUrl: './step-one-personal-details.component.html',
  styleUrls: ['./step-one-personal-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepOnePersonalDetailsComponent extends StepComponentBase implements OnInit {
  stepForm: FormGroup;

  formErrors = {
    'name': '',
    'email': '',
    'phone': '',
  };

  validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'At least 4 characters is required',
      pattern: "Name must only contains letters or spaces"
    },
    email: {
      required: 'Email is required',
      email: 'Email is not a valid email',
    },
    phone: {
      required: 'Phone is required',
      minlength: 'At least 10 digits is required'
    }
  }


  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef) {
    super(formService, cdr);
  }

  override ngOnInit(): void {
    this.stepForm = this.formService.getFormGroupRefByIndex(this.stepIndex);
    this.stepForm.valueChanges.subscribe((data) => this.onValueChanged(data));
  }


  onValueChanged(data?: any) {
    if (!this.stepForm) { return; }
    const form = this.stepForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        const controlErrors = Object.keys(control.errors)
        for (let i = 0; i < controlErrors.length; i++) {
          const key = controlErrors[i];
          this.formErrors[field] += messages[key];
          if (i < controlErrors.length - 1) {
            this.formErrors[field] += ' , ';
          }
        }
      }
    }
  }

}

