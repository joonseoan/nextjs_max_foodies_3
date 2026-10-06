// It is the most child component
// from the `main-header` component.
// `use client` should be implemented in the most child component

'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import style from './nav-link.module.css';

export interface NavLinkProps {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  // [IMPORTANT]
  // `usePathname` can be used only for `use client`
  const path = usePathname();

  return (
    <Link href={href}
      className={ 
        // style.active should be the second class name.
        `${style.link} ${path === href ? style.active : undefined}`
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;