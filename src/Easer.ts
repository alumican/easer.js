import {Runnable} from "./core/if/Runnable";
import {Call} from "./core/task/Call";
import {Callback} from "./core/task/Callback";
import {Delay} from "./core/task/Delay";
import {Insert} from "./core/task/Insert";
import {Listen} from "./core/task/Listen";
import {Parallel} from "./core/task/Parallel";
import {Race} from "./core/task/Race";
import {Serial} from "./core/task/Serial";
import {Tween} from "./core/task/Tween";
import {EasingFunction} from "./util/EasingFunction";

export function insert(generator:() => (Runnable<any> | Promise<any>)):Runnable<any> {
	return new Insert(generator);
}

export function serial(list:Runnable<any>[]):Runnable<any> {
	return new Serial(list);
}

export function parallel(list:Runnable<any>[], allSettled:boolean = true):Runnable<any> {
	return new Parallel(list, allSettled);
}

export function race(list:Runnable<any>[]):Runnable<any> {
	return new Race(list);
}

export function delay(interval:number):Runnable<void> {
	return new Delay(interval);
}

export function listen(target:EventTarget, type:string, options:AddEventListenerOptions = null):Runnable<void> {
	return new Listen(target, type, options);
}

export function callback(f:(complete:(data?:any) => void) => void):Runnable<any> {
	return new Callback(f);
}

export function call(f:() => any, args:any[] = null):Runnable<any> {
	return new Call(f, args);
}

export function tween(duration:number, easing:EasingFunction):Runnable<void> {
	return new Tween(duration, easing);
}
