"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPositionString = (position) => {
    const positionString = `${position[0]}-${position[1]}`;
    return positionString;
};
exports.default = getPositionString;
