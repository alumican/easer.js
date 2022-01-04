import {Runnable} from "../if/Runnable";

export class Parallel implements Runnable<any[]> {

	constructor(list:Runnable<any>[], allSettled:boolean) {
		this.list = list;
		this.allSettled = allSettled;
	}

	public run():Promise<any[]> {
		const promises:Promise<any>[] = [];
		const n = this.list.length;
		for (let i = 0; i < n; ++i) {
			promises.push(this.list[i].run())
		}
		if (this.allSettled) {
			return Promise.allSettled(promises);
		} else {
			return Promise.all(promises);
		}
	}

	private readonly list:Runnable<any>[];
	private readonly allSettled:boolean;
}
