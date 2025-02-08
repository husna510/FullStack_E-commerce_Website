const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {

};

const SentryWebpackPluginOptions = {
    silent: true, //supresses all logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);