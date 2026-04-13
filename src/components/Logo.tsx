interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <img
      src="/lovable-uploads/WaLen_Logo_magnifier.png"
      alt="WaLens – Business Intelligence for Global Executives"
      className={`${sizeClasses[size]} w-auto transition-transform dark:invert ${className}`}
      loading="eager"
    />
  );
};

export default Logo;
