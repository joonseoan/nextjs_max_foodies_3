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
  const path = usePathname();

  return (
    <Link href={href}
      className={ path.startsWith('/community') ?  `${style.link} ${style.active}` : `${style.link}` }
    >
      {children}
    </Link>
  );
}

export default NavLink;