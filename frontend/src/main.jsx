import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './utils/toast'
import { store } from './store'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error("App Render Error:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', background: '#09090b', color: '#ef4444', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '16px' }}>Application Render Error</h1>
          <pre style={{ background: '#18181b', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ color: '#a1a1aa', marginTop: '12px', fontSize: '12px', overflowX: 'auto' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
