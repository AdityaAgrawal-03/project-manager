"use client";
import { Grid, Calendar, Settings, User } from "react-feather";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const icons = {
  Grid,
  Calendar,
  Settings,
  User,
};

// function or component can't be serialized, they can't cross network barrier between server & client
// this file is on client while it's parent is a server component, hence we need to use the Icon component in below way

const SidebarLink = ({ link }) => {
  let isActive = false;
  const pathname = usePathname();

  if (link.route === pathname) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.route}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
