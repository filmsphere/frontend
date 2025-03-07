import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-4"
          role="alert"
          aria-live="polite"
        >
          <strong className="font-bold">Something went wrong.</strong>
          <span className="block sm:inline ml-1">
            {error?.message || "Please refresh the page."}
          </span>
          {import.meta.env.MODE === "development" && errorInfo && (
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="mt-1 text-xs overflow-auto">
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleRetry}
              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
