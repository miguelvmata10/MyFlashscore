const ErrorBanner = ({ errorMessage }) => {
  return (
    <div className="text-center p-4 fw-bold rounded-4" style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
        {errorMessage}
    </div>
  )
}
export default ErrorBanner