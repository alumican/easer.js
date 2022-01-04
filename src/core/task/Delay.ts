import {Runnable} from "../if/Runnable";

export class Delay implements Runnable<void> {

	constructor(interval:number) {
		this.interval = interval;
	}

	public run():Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(():void => {
				resolve();
			}, this.interval);
		});
	}

	private readonly interval:number;
}
