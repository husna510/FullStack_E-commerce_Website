import { withSentryConfig } from "@sentry/nextjs";

const moduleExports = {};

const SentryWebpackPluginOptions = {
  silent: true, // suppresses all logs
};

export default withSentryConfig(moduleExports, SentryWebpackPluginOptions);
