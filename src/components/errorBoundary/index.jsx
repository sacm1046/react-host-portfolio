import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error en módulo remoto:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <div>Error al cargar el módulo remoto.</div>;
    return this.props.children;
  }
}