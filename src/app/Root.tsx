import { type FC } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SDKProvider } from "@telegram-apps/sdk-react";

import { App } from "@/app/App";
import { ErrorBoundary } from "@/app/ErrorBoundary";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <SDKProvider acceptCustomStyles debug={false}>
        <App />
      </SDKProvider>
    </TonConnectUIProvider>
  </ErrorBoundary>
);
