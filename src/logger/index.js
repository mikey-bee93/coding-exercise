const { createLogger, format, transports } = require("winston");

const { label } = format;

const errorStackTracerFormat = format(info => {
    if (info.meta && info.meta instanceof Error) {
        info.message = `${ info.message } ${ info.meta.stack }`;
    }

    return info;
});

const withLabel = (customLabel) => createLogger({
    format: format.combine(
        label({ label: customLabel } ),
        format.splat(),
        errorStackTracerFormat(),
        format.simple(),
    ),
    transports: [new transports.Console()]
});

const logger = createLogger({
    format: format.combine(
        format.splat(),
        errorStackTracerFormat(),
        format.simple(),
    ),
    transports: [new transports.Console()]
});

module.exports = {
    logger: logger,
    withLabel: withLabel
}