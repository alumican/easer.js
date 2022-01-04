import {Runnable} from "../if/Runnable";

export class Listen implements Runnable<void> {

	constructor(target:EventTarget, type:string, options:AddEventListenerOptions = null) {
		this.target = target;
		this.type = type;
		this.options = options;
	}

	public run():Promise<void> {
		return new Promise((resolve, reject) => {
			this.target.addEventListener(this.type, event => {
				resolve();
			}, this.options);
		});
	}

	private readonly target:EventTarget;
	private readonly type:string;
	private readonly options:AddEventListenerOptions;
}
