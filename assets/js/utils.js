function getRootElementFontSize () {
    return parseFloat(getComputedStyle(
        document.documentElement).fontSize);
}

export function rems2px(value) {
    return value * getRootElementFontSize();
}

console.log('utilzzzz');
