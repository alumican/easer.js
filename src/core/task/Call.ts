import {Runnable} from "../if/Runnable";

export class Call implements Runnable<void> {

	constructor(f:() => any, args:any[] = null) {
		this.f = f;
		this.args = args;
	}

	public run():Promise<void> {
		return new Promise((resolve, reject) => {
			resolve(this.f.apply(null, this.args));
		});
	}

	private readonly f:() => any;
	private readonly args:any[];
}
