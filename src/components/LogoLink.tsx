import Link from "next/link";
// import Logo from './ui/Logo';

interface LogoLinkProps {
  showText?: boolean;
}

const LogoLink = ({ showText = true }: LogoLinkProps) => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      {showText && (
        <span className="hidden md:block  font-bold text-2xl text-foreground ">
          <span className=" text-primary">Offer</span>Mart
        </span>
      )}
    </Link>
  );
};

export default LogoLink;
