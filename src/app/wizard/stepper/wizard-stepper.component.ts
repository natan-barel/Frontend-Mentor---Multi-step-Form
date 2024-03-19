import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { StepFourSummaryComponent } from '@wizard/form-steps/step-four-summary/step-four-summary.component';
import { StepOnePersonalDetailsComponent } from '@wizard/form-steps/step-one-personal-details/step-one-personal-details.component';
import { StepThreeAddOnsComponent } from '@wizard/form-steps/step-three-add-ons/step-three-add-ons.component';
import { StepTwoPlanDetailsComponent } from '@wizard/form-steps/step-two-plan-details/step-two-plan-details.component';
import { StepPagesService } from "@wizard/services/step-pages.service";
import { BaseComponent } from '@wizard/shared/components/base-component/base-component';
import { StepPageObject } from '@wizard/shared/models/step-page-object';

@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss'],
})
export class WizardStepperComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  fadeRight: boolean = true;
  fadeLeft: boolean = false;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;
  disposeArr = [];
  _window: any = null;

  public steps = this.stepsPagesService.getSteps();

  constructor(
    private stepsPagesService: StepPagesService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    // console.log(this.stepper);
  }

  public goBack(stepper: MatStepper): void {
    this.fadeRight = true;
    this.fadeLeft = false;
    stepper.previous();
    this.stepsPagesService.setCurrentStep(stepper.selectedIndex);
    // this.stepper.previous();
    // let backwardStep = (this.stepper.nzCurrent - 1);
    // this.stepper.nzCurrent = (this.stepper.steps.length + backwardStep) % (this.stepper.steps.length);
  }

  public goForward(stepper: MatStepper): void {
    this.fadeRight = false;
    this.fadeLeft = true;
    stepper.next();
    this.stepsPagesService.setCurrentStep(stepper.selectedIndex);
    // this.stepper.next();
    // let forwardStep = (this.stepper.nzCurrent + 1)
    // this.stepper.nzCurrent = (this.stepper.steps.length + forwardStep) % (this.stepper.steps.length);
  }

  public moveStepper(evt: number): void {
    if (this.stepper.selectedIndex > evt) {
      this.fadeRight = true;
      this.fadeLeft = false;
    }
    else {
      this.fadeRight = false;
      this.fadeLeft = true;
    }
    this.stepper.selectedIndex = +evt;
    this.stepsPagesService.setCurrentStep(this.stepper.selectedIndex);
  }


  stepControl(index): FormGroup {
    return new FormGroup({});
    // return this.formService.getFormGroupRefByIndex(index);
  }

  override ngOnInit(): void {
    let initalSteps: Array<StepPageObject> = [
      { component: StepOnePersonalDetailsComponent, label: '', icon: "user", title: "personal-details", description: "Your info" },
      { component: StepTwoPlanDetailsComponent, label: '', icon: "user", title: "plan-details", description: "Select plan" },
      { component: StepThreeAddOnsComponent, label: '', icon: "user", title: "add-on-details", description: "Add-ons" },
      { component: StepFourSummaryComponent, label: '', icon: "user", title: "summary", description: "Summary" }
    ];
    this.stepsPagesService.buildSteps(initalSteps);
  }
}
