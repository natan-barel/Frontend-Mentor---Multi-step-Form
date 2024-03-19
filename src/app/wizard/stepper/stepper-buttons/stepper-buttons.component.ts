import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper-buttons',
  templateUrl: './stepper-buttons.component.html',
  styleUrls: ['./stepper-buttons.component.scss'],
})
export class StepperButtonsComponent implements OnInit {
  @Output() onStepGoNext: EventEmitter<any> = new EventEmitter();
  @Output() onStepGoBack: EventEmitter<any> = new EventEmitter();
  @Input() hasNextStep!: boolean;
  @Input() hasBackStep!: boolean;
  @Input() stepInvalid: boolean = false;
  @Input() nextButtonText?: string = 'Next';
  @Input() backButtonText?: string = 'Go Back';

  constructor() { }

  ngOnInit(): void { }

  goForward() {
    this.onStepGoNext.emit();
  }

  goBack() {
    this.onStepGoBack.emit();
  }
}
