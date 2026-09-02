function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-content px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
  );
}

export default Container;
