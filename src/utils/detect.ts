import { isNumber } from "./is";

/**
 * @internal
 */
export const isEnvBrowser = () => 
    typeof window !== "undefined" && typeof window.document !== "undefined";

/**
 * @internal
 */
export const isEnvNode = () => 
    typeof process !== "undefined" && process.versions != null && process.versions.node != null;

/**
 * @internal
 */
export const isApplePayAvailable = () => 
    isEnvBrowser() &&
    // @ts-ignore
    window.ApplePaySession && 
    // @ts-ignore
    ApplePaySession.canMakePayments();

/**
 * @internal
 */
export const isMobile = (width: number | string, height: number | string) => {
    if (!isEnvBrowser())
        return false;

    width = isNumber(width) ? width + 'px' : width;
    height = isNumber(height) ? height + 'px' : height;

    const query = matchMedia(`(max-width: ${ width }) or (max-height: ${ height })`);
    return query.matches;
};