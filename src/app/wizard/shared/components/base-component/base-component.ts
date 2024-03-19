import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export class BaseComponent implements OnInit, OnDestroy {
  componentDestroyed: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() { }

  ngOnDestroy(): void {
    console.log('destroy')
    this.initDestroy();
  }

  protected initDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.unsubscribe();
  }
}