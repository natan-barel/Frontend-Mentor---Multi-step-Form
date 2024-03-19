import { NgModule } from '@angular/core';
import { StepPageWrapperComponent } from './stepper/step-page-wrapper/step-page-wrapper.component';
import { PageDirective } from './page-directive/page.directive';
import { StepComponentBase } from './stepper/step-component-base/step-component-base';
import { StepPagesService } from './services/step-pages.service';
import { WizardStepperComponent } from './stepper/wizard-stepper.component';
import { StepperButtonsComponent } from './stepper/stepper-buttons/stepper-buttons.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { StepTwoPlanDetailsComponent } from './form-steps/step-two-plan-details/step-two-plan-details.component';
import { StepThreeAddOnsComponent } from './form-steps/step-three-add-ons/step-three-add-ons.component';
import { StepFourSummaryComponent } from './form-steps/step-four-summary/step-four-summary.component';
import { StepFiveConfimComponent } from './form-steps/step-five-confim/step-five-confim.component';
import { StepOnePersonalDetailsComponent } from './form-steps/step-one-personal-details/step-one-personal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepTrackerIconsComponent } from './step-nav/step-tracker-icons.component';

export const COMPONENTS = [WizardStepperComponent, StepPageWrapperComponent, StepperButtonsComponent, StepComponentBase,
  StepTrackerIconsComponent,
  StepOnePersonalDetailsComponent, StepTwoPlanDetailsComponent, StepThreeAddOnsComponent, StepFourSummaryComponent, StepFiveConfimComponent];
export const DIRECTIVES = [PageDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [...COMPONENTS, ...DIRECTIVES],
  providers: []
})
export class WizardModule { }