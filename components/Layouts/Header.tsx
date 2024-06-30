import { ReactNode } from "react";

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return <header className="min-h-16 bg--400 border-b">{children}</header>;
};

export default HeaderLayout;
