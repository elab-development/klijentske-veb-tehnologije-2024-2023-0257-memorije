import { Link } from "react-router-dom";
interface CustomButtonProps {
  to: string;
  children: React.ReactNode;
}
const CustomButton = ({ to, children }: CustomButtonProps) => {
  return (
    <Link
      className="bg-secondary border border-light-gray p-2 w-14 lg:w-24 rounded-xl aspect-square flex items-center justify-center absolute lg:right-14 left-8 z-30 lg:left-auto top-10 lg:top-14"
      to={to}
    >
      {children}
    </Link>
  );
};

export default CustomButton;
