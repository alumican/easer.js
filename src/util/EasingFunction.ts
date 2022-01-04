/**
 * Easing equation interface
 * @param t input value [0, 1]
 * @return eased value [0, 1]
 */
export type EasingFunction = (t:number) => number;
