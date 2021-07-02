import {Component, OnInit} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private colorIndexMap: Map<number, number>;
  public timerInputValue: number;
  private counter$: Observable<number>;
  private subscriber: Subscription;
  public colorIndex: number;

  constructor() {
    this.timerInputValue = 1;
    this.counter$ = new Observable();
    this.subscriber = new Subscription();
    this.colorIndex = 0;
    this.colorIndexMap = new Map<number, number>();
    this.colorIndexMap.set(0,1); //white -> red
    this.colorIndexMap.set(1,2); //red -> yellow
    this.colorIndexMap.set(2,3); //yellow -> green
    this.colorIndexMap.set(3,1); //green -> red
  }
  ngOnInit() { }

  private resetSubscription() {
    if (!this.subscriber.closed) {
      this.subscriber.unsubscribe();
      this.colorIndex = 0;
    }
  }

  /*
  The main function to switch the light using timer.
   */
  switchLightWithTimer() {
    // Reset the subscriber to make sure it won't emmit any values from previous run.
    this.resetSubscription();

    // Create a timer observable based on the interval value user chose (in seconds).
    this.counter$ = timer(0,this.timerInputValue*1000);

    // Subscribe to the counter and switch the color after every tick.
    this.subscriber = this.counter$.subscribe(val =>  {
      this.colorIndex = <number>this.colorIndexMap.get(this.colorIndex);
      console.log(this.colorIndex);
    });

  }

  /*
    Switch the light using button
  */
  switchLightManual() {
    // Reset the subscriber to make sure it won't emmit any values from previous run.
    this.resetSubscription();

    this.colorIndex = <number>this.colorIndexMap.get(this.colorIndex);
    console.log(this.colorIndex);
  }
}
