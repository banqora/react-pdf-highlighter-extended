import { Page } from "../types";
export declare const getDocument: (elm: any) => Document;
export declare const getWindow: (elm: any) => typeof window;
export declare const isHTMLElement: (elm: any) => boolean;
export declare const isHTMLCanvasElement: (elm: any) => boolean;
export declare const asElement: (x: any) => HTMLElement;
export declare const getPageFromElement: (target: HTMLElement) => Page | null;
export declare const getPagesFromRange: (range: Range) => Page[];
/**
 * Create a container element we can use for highlights.
 * The original textLayer will be rotated by CSS to match
 * the rotation of individual PDF pages - this is not desired.
 * To keep our highlights independent of text rotation
 * we add a dedicated div to hold our annotations as a sibling.
 * The main styling is copied over, but we omit the
 * `data-main-rotation` attribute to keep our container div
 * from being rotated.
 *
 * @param container The original textLayer div from PDF.js
 */
export declare const findOrCreateContainerLayer: (container: HTMLElement, className: string) => Element | null;
