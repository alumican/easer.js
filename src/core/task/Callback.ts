import {Runnable} from "../if/Runnable";
import {CallbackFunction} from "./callback/CallbackFunction";

export class Callback implements Runnable<void> {

	constructor(f:CallbackFunction) {
		this.f = f;
	}

	public run():Promise<void> {
		return new Promise((resolve, reject) => {
			this.f((data?:any) => {
				resolve(data);
			});
		});
	}

	private readonly f:CallbackFunction;
}
