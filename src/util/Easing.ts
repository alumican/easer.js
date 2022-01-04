import {EasingFunction} from "./EasingFunction";

export module easing {

	/**
	 * Linear
	 */
	export const linear:EasingFunction = (t:number):number => {
		return t;
	}

	/**
	 * Quad
	 */
	export const easeInQuad:EasingFunction = (t:number):number => {
		return (t /= 1) * t;
	}

	export const easeOutQuad:EasingFunction = (t:number):number => {
		return -(t /= 1) * (t - 2);
	}

	export const easeInOutQuad:EasingFunction = (t:number):number => {
		if ((t /= 0.5) < 1) return 0.5 * t * t;
		return -0.5 * ((--t) * (t - 2) - 1);
	}

	/**
	 * Cubic
	 */
	export const easeInCubic:EasingFunction = (t:number):number => {
		return (t /= 1) * t * t;
	}

	export const easeOutCubic:EasingFunction = (t:number):number => {
		return (t = t - 1) * t * t + 1;
	}

	export const easeInOutCubic:EasingFunction = (t:number):number => {
		if ((t /= 0.5) < 1) return 0.5 * t * t * t;
		return 0.5 * ((t -= 2) * t * t + 2);
	}

	/**
	 * Quart
	 */
	export const easeInQuart:EasingFunction = (t:number):number => {
		return (t /= 1) * t * t * t;
	}

	export const easeOutQuart:EasingFunction = (t:number):number => {
		return -((t = t - 1) * t * t * t - 1);
	}

	export const easeInOutQuart:EasingFunction = (t:number):number => {
		if ((t /= 0.5) < 1) return 0.5 * t * t * t * t;
		return -0.5 * ((t -= 2) * t * t * t - 2);
	}

	/**
	 * Quint
	 */
	export const easeInQuint:EasingFunction = (t:number):number => {
		return (t /= 1) * t * t * t * t;
	}

	export const easeOutQuint:EasingFunction = (t:number):number => {
		return ((t = t - 1) * t * t * t * t + 1);
	}

	export const easeInOutQuint:EasingFunction = (t:number):number => {
		if ((t /= 0.5) < 1) return 0.5 * t * t * t * t * t;
		return 0.5 * ((t -= 2) * t * t * t * t + 2);
	}

	/**
	 * Sine
	 */
	export const easeInSine:EasingFunction = (t:number):number => {
		return -Math.cos(t * (Math.PI / 2)) + 1;
	}

	export const easeOutSine:EasingFunction = (t:number):number => {
		return Math.sin(t * (Math.PI / 2));
	}

	export const easeInOutSine:EasingFunction = (t:number):number => {
		return -0.5 * (Math.cos(Math.PI * t) - 1);
	}

	/**
	 * Expo
	 */
	export const easeInExpo:EasingFunction = (t:number):number => {
		if (t == 0) return 0;
		return Math.pow(2, 10 * (t - 1));
	}

	export const easeOutExpo:EasingFunction = (t:number):number => {
		if (t == 1) return 1;
		return -Math.pow(2, -10 * t) + 1;
	}

	export const easeInOutExpo:EasingFunction = (t:number):number => {
		if (t == 0) return 0;
		if (t == 1) return 1;
		if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
		return 0.5 * (-Math.pow(2, -10 * --t) + 2);
	}

	/**
	 * Circ
	 */
	export const easeInCirc:EasingFunction = (t:number):number => {
		return -(Math.sqrt(1 - (t /= 1) * t) - 1);
	}

	export const easeOutCirc:EasingFunction = (t:number):number => {
		return Math.sqrt(1 - (t = t - 1) * t);
	}

	export const easeInOutCirc:EasingFunction = (t:number):number => {
		if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
		return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	}

	/**
	 * Elastic
	 */
	export const easeInElastic:EasingFunction = (t:number):number => {
		return defaultEaseInElastic(t);
	}

	export const easeOutElastic:EasingFunction = (t:number):number => {
		return defaultEaseOutElastic(t);
	}

	export const easeInOutElastic:EasingFunction = (t:number):number => {
		return defaultEaseInOutElastic(t);
	}

	export const createEaseInElastic = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			let p:number = 0;
			let a:number = 1;
			if (t == 0) return 0;
			if ((t /= 1) == 1) return 1;
			if (p == 0) p = 0.3;
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
		}
	}

	export const createEaseOutElastic = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			let p:number = 0;
			let a:number = 1;
			if (t == 0) return 0;
			if ((t /= 1) == 1) return 1;
			if (p == 0) p = 0.3;
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
		}
	}

	export const createEaseInOutElastic = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			let p:number = 0;
			let a:number = 1;
			if (t == 0) return 0;
			if ((t /= 0.5) == 2) return 1;
			if (p == 0) p = 0.3 * 1.5;
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			if (t < 1) return -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
		}
	}

	const defaultEaseInElastic:EasingFunction = createEaseInElastic();
	const defaultEaseOutElastic:EasingFunction = createEaseOutElastic();
	const defaultEaseInOutElastic:EasingFunction = createEaseInOutElastic();

	/**
	 * Back
	 */
	export const easeInBack:EasingFunction = (t:number):number => {
		return defaultEaseInBack(t);
	}

	export const easeOutBack:EasingFunction = (t:number):number => {
		return defaultEaseOutBack(t);
	}

	export const easeInOutBack:EasingFunction = (t:number):number => {
		return defaultEaseInOutBack(t);
	}

	export const createEaseInBack = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			return (t /= 1) * t * ((s + 1) * t - s);
		}
	}

	export const createEaseOutBack = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			return (t = t - 1) * t * ((s + 1) * t + s) + 1;
		}
	}

	export const createEaseInOutBack = (s:number = 1.70158):EasingFunction => {
		return function (t:number) {
			if ((t /= 0.5) < 1) return 0.5 * t * t * (((s *= 1.525) + 1) * t - s);
			return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
		}
	}

	const defaultEaseInBack:EasingFunction = createEaseInBack();
	const defaultEaseOutBack:EasingFunction = createEaseOutBack();
	const defaultEaseInOutBack:EasingFunction = createEaseInOutBack();

	/**
	 * Bounce
	 */
	export const easeInBounce:EasingFunction = (t:number):number => {
		return 1 - easeOutBounce(1 - t);
	}

	export const easeOutBounce:EasingFunction = (t:number):number => {
		if ((t /= 1) < (1 / 2.75)) {
			return 7.5625 * t * t;
		} else if (t < (2 / 2.75)) {
			return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
		} else if (t < (2.5 / 2.75)) {
			return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
		} else {
			return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
		}
	}

	export const easeInOutBounce:EasingFunction = (t:number):number => {
		if (t < 0.5) return easeInBounce(t * 2) * 0.5;
		return easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
	}
}
