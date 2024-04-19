"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometric = exports.arithmetics = void 0;
const arithmetics = (first, second, last) => {
    const difference = second - first;
    const sequences = [];
    for (let el = first; el <= last; el += difference) {
        sequences.push(el);
    }
    return sequences;
};
exports.arithmetics = arithmetics;
const geometric = (first, second, last) => {
    const difference = second / first;
    const terms = [];
    for (let el = first; el <= last; el *= difference) {
        terms.push(el);
    }
    return terms;
};
exports.geometric = geometric;
