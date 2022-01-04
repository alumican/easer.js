import {Runnable} from "../if/Runnable";

export class Race implements Runnable<any[]> {

	constructor(list:Runnable<any>[]) {
		this.list = list;
	}

	public run():Promise<any[]> {
		const promises:Promise<any>[] = [];
		const n = this.list.length;
		for (let i = 0; i < n; ++i) {
			promises.push(this.list[i].run())
		}
		return Promise.race(promises);
	}

	private readonly list:Runnable<any>[];
}
