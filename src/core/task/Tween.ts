import {PromiseResolve} from "../if/PromiseResolve";
import {Runnable} from "../if/Runnable";
import {CallbackFunction} from "./tween/CallbackFunction";
import {EventType} from "./tween/EventType";
import {Target} from "./tween/Target";
import {easing} from "../../util/Easing";
import {EasingFunction} from "../../util/EasingFunction";

export class Tween extends EventTarget implements Runnable<void> {

	// --------------------------------------------------
	//
	// CONSTRUCTOR
	//
	// --------------------------------------------------

	constructor(duration:number, easing:EasingFunction) {
		super();
		this.resolve = null;

		this.duration = duration;
		this.easing = easing;

		this.targets = [];
		this.isPlaying = false;
		this.isPaused = false;

		this.addEventListener(EventType.play, this.playHandler);
		this.addEventListener(EventType.stop, this.stopHandler);
		this.addEventListener(EventType.reset, this.resetHandler);
		this.addEventListener(EventType.jump, this.jumpHandler);
		this.addEventListener(EventType.update, this.updateHandler);
		this.addEventListener(EventType.complete, this.completeHandler);
	}





	// --------------------------------------------------
	//
	// METHOD
	//
	// --------------------------------------------------

	public number(scope:object, property:string, to:number, from:number = null):Tween {
		this.targets.push({ scope: scope, property: property, to:to, from: from, suffix: null, _from: null, _value: null });
		return this;
	}

	public css(scope:object, property:string, suffix:string, to:number, from:number = null):Tween {
		this.targets.push({ scope: scope, property: property, to:to, from: from, suffix: suffix, _from: null, _value: null });
		return this;
	}

	public onPlay(f:CallbackFunction):Tween {
		this.onPlayFunction = f;
		return this;
	}

	public onStop(f:CallbackFunction):Tween {
		this.onStopFunction = f;
		return this;
	}

	public onReset(f:CallbackFunction):Tween {
		this.onResetFunction = f;
		return this;
	}

	public onJump(f:CallbackFunction):Tween {
		this.onJumpFunction = f;
		return this;
	}

	public onUpdate(f:CallbackFunction):Tween {
		this.onUpdateFunction = f;
		return this;
	}

	public onComplete(f:CallbackFunction):Tween {
		this.onCompleteFunction = f;
		return this;
	}





	public run():Promise<void> {
		if (this.isPlaying || (this.progress === 1)) return this.promise;
		this.isPlaying = true;

		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;

			if (this.isPaused) {
				this.isPaused = false;
				this.startTime = Tween.getNow() - this.pausedElapsedTime;

			} else {
				this.startTime = Tween.getNow();
				this.elapsedTime = 0;
				this.progress = 0;

				const targetCount = this.targets.length;
				for (let i = 0; i < targetCount; ++i) {
					const target = this.targets[i];
					target._from = Tween.isNumber(target.from) ? target.from : Tween.getValue(target);
				}
			}

			this.dispatchEvent(new Event(EventType.play));
			this.requestAnimationFrameHandler();
		});

		return this.promise;
	}

	public stop():void {
		if (!this.isPlaying) return;
		this.isPlaying = false;

		this.isPaused = true;
		this.pausedElapsedTime = this.elapsedTime;

		this.dispatchEvent(new Event(EventType.stop));
	}

	public togglePlaying():void {
		this.isPlaying ? this.stop() : this.run();
	}

	public reset():void {
		if (!this.isPlaying) return;
		this.isPlaying = false;

		this.elapsedTime = 0;
		this.progress = 0;

		const targetCount = this.targets.length;
		for (let i = 0; i < targetCount; ++i) {
			const target = this.targets[i];
			Tween.setValue(target, target._from);
		}

		this.dispatchEvent(new Event(EventType.reset));
	}

	public jump(progress:number):void {
		if (this.progress === progress) return;
		this.progress = progress;

		this.elapsedTime = this.progress * this.duration;

		if (this.isPlaying) {
			this.startTime = Tween.getNow() - this.elapsedTime;
		}

		if (this.isPaused) {
			this.pausedElapsedTime = this.elapsedTime;
		}

		const curve = this.easing(this.progress);
		const targetCount = this.targets.length;
		for (let i = 0; i < targetCount; ++i) {
			const target = this.targets[i];

			if (!Tween.isNumber(target._from)) {
				target._from = Tween.isNumber(target.from) ? target.from : Tween.getValue(target);
			}

			Tween.setValue(target, Tween.map(curve, target._from, target.to));
		}

		this.dispatchEvent(new Event(EventType.jump));
	}

	private requestAnimationFrameHandler = ():void => {
		if (this.isPlaying) {
			this.elapsedTime = Tween.getNow() - this.startTime;
			this.progress = this.duration > 0 ? this.elapsedTime / this.duration : 1;

			if (this.progress >= 1) {
				this.progress = 1;
				this.elapsedTime = this.duration;

				const targetCount = this.targets.length;
				for (let i = 0; i < targetCount; ++i) {
					const target = this.targets[i];
					Tween.setValue(target, target.to);
				}

				this.dispatchEvent(new Event(EventType.update));
				this.isPlaying = false;
				this.dispatchEvent(new Event(EventType.complete));
				this.resolve();

			} else {
				const curve = this.easing(this.progress);
				const targetCount = this.targets.length;
				for (let i = 0; i < targetCount; ++i) {
					const target = this.targets[i];
					Tween.setValue(target, Tween.map(curve, target._from, target.to));
				}

				window.requestAnimationFrame(this.requestAnimationFrameHandler);
				this.dispatchEvent(new Event(EventType.update));
			}
		}
	};

	private static getNow():number {
		return Date.now();
	}

	private static isNumber(value:any):boolean {
		return (typeof value === 'number') && isFinite(value);
	}

	private static map(progress:number, from:number, to:number):number {
		return progress * (to - from) + from;
	}

	private static setValue(target:Target, value:number):void {
		target._value = value;
		target.scope[target.property] = target.suffix ? (value + target.suffix) : value;
	}

	private static getValue(target:Target):number {
		return target._value = target.suffix ? (parseFloat(target.scope[target.property]) || 0) : target.scope[target.property];
	}





	public getIsPlaying():boolean {
		return this.isPlaying;
	}

	public getElapsedTime():number {
		return this.elapsedTime;
	}

	public getProgress():number {
		return this.progress;
	}

	public getDuration():number {
		return this.duration;
	}

	public getEasing():EasingFunction {
		return this.easing;
	}

	private playHandler = ():void => {
		if (this.onPlayFunction) {
			this.onPlayFunction(this);
		}
	};

	private stopHandler = ():void => {
		if (this.onStopFunction) {
			this.onStopFunction(this);
		}
	};

	private resetHandler = ():void => {
		if (this.onResetFunction) {
			this.onResetFunction(this);
		}
	};

	private jumpHandler = ():void => {
		if (this.onJumpFunction) {
			this.onJumpFunction(this);
		}
	};

	private updateHandler = ():void => {
		if (this.onUpdateFunction) {
			this.onUpdateFunction(this);
		}
	};

	private completeHandler = ():void => {
		if (this.onCompleteFunction) {
			this.onCompleteFunction(this);
		}
	};





	// --------------------------------------------------
	//
	// MEMBER
	//
	// --------------------------------------------------

	private readonly duration:number;
	private readonly easing:EasingFunction;
	private readonly targets:Target[];

	private isPlaying:boolean;
	private isPaused:boolean;
	private progress:number;
	private startTime:number;
	private pausedElapsedTime:number;
	private elapsedTime:number;

	private onPlayFunction:CallbackFunction;
	private onStopFunction:CallbackFunction;
	private onResetFunction:CallbackFunction;
	private onJumpFunction:CallbackFunction;
	private onUpdateFunction:CallbackFunction;
	private onCompleteFunction:CallbackFunction;

	private promise:Promise<void>;
	private resolve:PromiseResolve<void>;





	// --------------------------------------------------
	//
	// STATIC
	//
	// --------------------------------------------------

	public static readonly easeLinear = easing.linear;

	public static readonly easeInQuad = easing.easeInQuad;
	public static readonly easeOutQuad = easing.easeOutQuad;
	public static readonly easeInOutQuad = easing.easeInOutQuad;

	public static readonly easeInCubic = easing.easeInCubic;
	public static readonly easeOutCubic = easing.easeOutCubic;
	public static readonly easeInOutCubic = easing.easeInOutCubic;

	public static readonly easeInQuart = easing.easeInQuart;
	public static readonly easeOutQuart = easing.easeOutQuart;
	public static readonly easeInOutQuart = easing.easeInOutQuart;

	public static readonly easeInQuint = easing.easeInQuint;
	public static readonly easeOutQuint = easing.easeOutQuint;
	public static readonly easeInOutQuint = easing.easeInOutQuint;

	public static readonly easeInSine = easing.easeInSine;
	public static readonly easeOutSine = easing.easeOutSine;
	public static readonly easeInOutSine = easing.easeInOutSine;

	public static readonly easeInExpo = easing.easeInExpo;
	public static readonly easeOutExpo = easing.easeOutExpo;
	public static readonly easeInOutExpo = easing.easeInOutExpo;

	public static readonly easeInCirc = easing.easeInCirc;
	public static readonly easeOutCirc = easing.easeOutCirc;
	public static readonly easeInOutCirc = easing.easeInOutCirc;

	public static readonly easeInElastic = easing.easeInElastic;
	public static readonly easeOutElastic = easing.easeOutElastic;
	public static readonly easeInOutElastic = easing.easeInOutElastic;

	public static readonly createEaseInElastic = easing.createEaseInElastic;
	public static readonly createEaseOutElastic = easing.createEaseOutElastic;
	public static readonly createEaseInOutElastic = easing.createEaseInOutElastic;

	public static readonly easeInBack = easing.easeInBack;
	public static readonly easeOutBack = easing.easeOutBack;
	public static readonly easeInOutBack = easing.easeInOutBack;

	public static readonly createEaseInBack = easing.createEaseInBack;
	public static readonly createEaseOutBack = easing.createEaseOutBack;
	public static readonly createEaseInOutBack = easing.createEaseInOutBack;

	public static readonly easeInBounce = easing.easeInBounce;
	public static readonly easeOutBounce = easing.easeOutBounce;
	public static readonly easeInOutBounce = easing.easeInOutBounce;

	public static readonly events = EventType;
}
