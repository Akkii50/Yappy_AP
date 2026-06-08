const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden items-center justify-center bg-gradient-to-br from-primary/15 via-base-200 to-secondary/15 p-12 lg:flex">
      <div className="max-w-md text-center">
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-3xl border border-base-content/10 bg-base-100/60 shadow-lg shadow-primary/10 ${
                index % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="mb-4 text-3xl font-black yappy-gradient-text">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
