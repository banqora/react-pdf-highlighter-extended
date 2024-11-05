export const getDocument = (elm) => (elm || {}).ownerDocument || document;
export const getWindow = (elm) => (getDocument(elm) || {}).defaultView || window;
export const isHTMLElement = (elm) => elm instanceof HTMLElement || elm instanceof getWindow(elm).HTMLElement;
export const isHTMLCanvasElement = (elm) => elm instanceof HTMLCanvasElement ||
    elm instanceof getWindow(elm).HTMLCanvasElement;
export const asElement = (x) => x;
export const getPageFromElement = (target) => {
    const node = asElement(target.closest(".page"));
    if (!node || !isHTMLElement(node)) {
        return null;
    }
    const number = Number(asElement(node).dataset.pageNumber);
    return { node, number };
};
export const getPagesFromRange = (range) => {
    const startParentElement = range.startContainer.parentElement;
    const endParentElement = range.endContainer.parentElement;
    if (!isHTMLElement(startParentElement) || !isHTMLElement(endParentElement)) {
        return [];
    }
    const startPage = getPageFromElement(asElement(startParentElement));
    const endPage = getPageFromElement(asElement(endParentElement));
    if (!startPage?.number || !endPage?.number) {
        return [];
    }
    if (startPage.number === endPage.number) {
        return [startPage];
    }
    if (startPage.number === endPage.number - 1) {
        return [startPage, endPage];
    }
    const pages = [];
    let currentPageNumber = startPage.number;
    const document = startPage.node.ownerDocument;
    while (currentPageNumber <= endPage.number) {
        const currentPage = getPageFromElement(document.querySelector(`[data-page-number='${currentPageNumber}'`));
        if (currentPage) {
            pages.push(currentPage);
        }
        currentPageNumber++;
    }
    return pages;
};
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
export const findOrCreateContainerLayer = (container, className) => {
    // Grab the parent - same div that hold the textLayer
    let pageDiv = container.parentElement;
    if (pageDiv === null) {
        return null;
    }
    const doc = getDocument(container);
    let layer = pageDiv.querySelector(`.${className}`);
    // TODO: There used to be concern about z-indexing
    //       here when adding to textLayer div, still relevant?
    if (!layer) {
        layer = doc.createElement("div");
        // Add the PDF.js textLayer class to get styled similarly
        layer.className = `${className} textLayer`;
        // TODO: Is this needed or purely for rotation?
        //layer.style.cssText = container.style.cssText;
        pageDiv.appendChild(layer);
    }
    return layer;
};
//# sourceMappingURL=pdfjs-dom.js.map