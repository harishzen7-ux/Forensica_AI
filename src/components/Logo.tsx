// filepath: src/components/Logo.tsx
import logo from "../assets/logo.png";  // Adjusted path assuming standard structure

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Forensica Logo"
      className={className}
    />
  );
}