"use strict";
const arithmetics = (first, second, last) => {
    const difference = second - first;
    const sequences = [];
    for (let el = first; el <= last; el += difference) {
        sequences.push(el);
    }
    return sequences;
};
const geometric = (first, second, last) => {
    const difference = second / first;
    const terms = [];
    for (let el = first; el <= last; el *= difference) {
        terms.push(el);
    }
    return terms;
};
