import { makeAutoObservable } from "mobx";
import { reaction } from "mobx";

export class Ticker {
  tick = 0;
  private dispose: (() => void) | null = null;

  constructor({ name, abortSignal }: { name: string, abortSignal: AbortSignal }) {
    makeAutoObservable(this);

    const interval = setInterval(() => {
      this.tick++;
    }, 1000);

    reaction(() => this.tick, ticks => {
      console.log(`[ticker ${name}] ticks`, ticks);
    }, { signal: abortSignal });

    this.dispose = () => clearInterval(interval);

    abortSignal.addEventListener("abort", () => {
      this.destroy();
    });
  }

  destroy() {
    if (this.dispose) {
      this.dispose();
      this.dispose = null;
    }
  }
}
