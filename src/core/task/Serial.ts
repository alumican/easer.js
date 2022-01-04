import {Runnable} from "../if/Runnable";

export class Serial implements Runnable<any> {

	constructor(list:Runnable<any>[]) {
		this.list = list;
	}

	public run():Promise<any> {
		let promise = this.list[0].run();
		const n = this.list.length;
		for (let i = 1; i < n; ++i) {
			promise = this.next(promise, this.list[i]);
		}
		return promise;
	}

	private next(prev:Promise<any>, next:Runnable<any>):Promise<any> {
		return prev.then(() => {
			return next.run();
		});
	}

	private readonly list:Runnable<any>[];
}
