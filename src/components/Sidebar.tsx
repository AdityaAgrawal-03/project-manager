import Card from "./Card";
import SidebarLink from "./SidebarLink";

export type RouteLink = {
  label: string,
  icon: string,
  route: string
}

const links = [
  {
    label: "Home",
    icon: "Grid",
    route: "/home",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    route: "/calendar",
  },
  {
    label: "Settings",
    icon: "Settings",
    route: "/settings",
  },
];

const SideBar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink key={link.label} link={link} />
      ))}
    </Card>
  );
};

export default SideBar;
