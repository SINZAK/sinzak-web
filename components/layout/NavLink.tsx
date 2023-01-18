import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { useMatch } from "@lib/hooks/useMatch";

interface INavLinkProps {
  exact?: boolean;
  match?: string;
  activeIcon: (...args: any) => JSX.Element;
  icon: (...args: any) => JSX.Element;
  text: string;
}

export const MobileNavLink = ({
  children,
  activeIcon,
  icon,
  exact,
  match,
  text,
  ...props
}: INavLinkProps & React.ComponentProps<typeof Link>) => {
  const isMatch = useMatch(match || props.href, exact);

  return (
    <li>
      <Link
        className={twMerge("grid place-items-center", isMatch && "text-red")}
        {...props}
      >
        {(isMatch ? activeIcon : icon)({
          className: "w-8 h-8",
        })}
        <p className="leading-tight">{text}</p>
      </Link>
    </li>
  );
};
