import {Runnable} from "../if/Runnable";

export class Insert implements Runnable<any> {

	constructor(generator:() => (Runnable<any> | Promise<any>)) {
		this.generator = generator;
	}

	public run():Promise<any> {
		const x = this.generator();
		if (x instanceof Promise) {
			return x;
		} else {
			return x.run();
		}
	}

	private readonly generator:() => (Runnable<any> | Promise<any>);
}
