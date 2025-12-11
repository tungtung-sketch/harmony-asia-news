import { useTheme } from '@/contexts/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const { theme } = useTheme();
  
  // Determine if dark mode is active
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <picture className={`flex items-center ${className}`}>
      <source
        srcSet="/lovable-uploads/WaLen_Logo_magnifier_dark_mode.png"
        media="(prefers-color-scheme: dark)"
      />
      <img
        src={isDark 
          ? "/lovable-uploads/WaLen_Logo_magnifier_dark_mode.png" 
          : "/lovable-uploads/WaLen_Logo_magnifier_light_mode.png"
        }
        alt="WaLens – Business Intelligence for Executives in Thailand"
        className={`${sizeClasses[size]} w-auto transition-transform`}
        loading="eager"
      />
    </picture>
  );
};

export default Logo;
