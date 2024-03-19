import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { PageDirective } from '@wizard/page-directive/page.directive';
import { StepPageObject } from '@wizard/shared/models/step-page-object';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';

@Component({
  selector: 'app-step-page-wrapper',
  template: ` <ng-template pageDirective></ng-template> `,
  styles: [],
})
export class StepPageWrapperComponent implements OnInit {
  @ViewChild(PageDirective, { static: true }) placeholder!: PageDirective;
  @Output() onGoForward: EventEmitter<any> = new EventEmitter<any>();
  @Output() onGoBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() setStepperIndex: EventEmitter<any> = new EventEmitter<any>();
  @Input() item?: StepPageObject;
  @Input() stepsLength?: number;
  @Input() stepIndex!: number;
  @Input() stepBlocked?: any;
  instance: StepComponentBase | undefined;

  constructor() { }

  ngOnInit() {
    if (this.item === undefined) {
      console.error('Item undefined');
      return;
    }

    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.item.component);
    this.instance = componentRef.instance as StepComponentBase;
    this.instance.currentStep = this.item;
    this.instance.stepIndex = this.stepIndex;
    this.instance.stepsLength = this.stepsLength || 0
    this.instance.stepBlocked = this.stepBlocked;

    this.instance.onStepSubmit.subscribe(() => {
      this.onGoForward.emit(this.item);
    });

    this.instance.onStepBack.subscribe(() => {
      this.onGoBack.emit(this.item);
    });

    this.instance.goToStepByIndex.subscribe((index: number) => {
      this.setStepperIndex.emit(index);
    });
  }
}