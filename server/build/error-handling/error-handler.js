"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
err, req, res, _next) => {
    console.log(err);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (err.status && err.message)
        res.status(err.status).json(err.message);
    res.status(500).json('Server error, please try again later');
};
exports.default = errorHandler;
