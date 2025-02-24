import { Subject } from "rxjs";

export class EventBus<T> {
  private subject = new Subject<T>();

  emit(value: T): void {
    this.subject.next(value);
  }

  subscribe(callback: (value: T) => void) {
    return this.subject.subscribe(callback);
  }
}
