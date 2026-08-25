/* Fixture for the regexp jsPlugin. Each line trips a different `regexp/*` rule. */

export const preferD = /[0-9]+/;
export const uselessQuantifier = /abc{1}/;
export const preferPlus = /a{1,}/;
export const preferStar = /a{0,}/;
export const uselessEscape = /\a/;
export const emptyGroup = /(?:)/;
