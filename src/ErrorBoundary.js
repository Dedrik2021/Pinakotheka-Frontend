import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo,
		});
		// You can also log the error to an error reporting service
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Fallback UI when an error occurs
			return (
				<div>
					<h1>Something went wrong</h1>
					<p>{this.state.error && this.state.error.toString()}</p>
					<p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
				</div>
			);
		}
		// Render children if there's no error
		return this.props.children;
	}
}

export default ErrorBoundary;
