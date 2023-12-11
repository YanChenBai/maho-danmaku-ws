"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intToColorHex = void 0;
const intToColorHex = (int) => {
    const hex = int.toString(16);
    return `#${hex.padStart(6, '0')}`;
};
exports.intToColorHex = intToColorHex;
