import { Component, OnInit } from '@angular/core';
import { StepPagesService } from '@wizard/services/step-pages.service';

@Component({
  selector: 'app-step-tracker-icons',
  templateUrl: './step-tracker-icons.component.html',
  styleUrls: ['./step-tracker-icons.component.scss']
})
export class StepTrackerIconsComponent implements OnInit {

  public steps = this.stepsPagesService.getSteps();
  public currentStep = this.stepsPagesService.getCurrentStep();

  constructor(private stepsPagesService: StepPagesService) { }

  ngOnInit(): void { }

}
