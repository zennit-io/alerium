import type { Icon as IconType } from "@zenncore/types/components";
import {
  HomeIcon,
  MapIcon,
  SettingsIcon,
  TicketIcon,
  TimerIcon,
} from "@zennui/icons";
import type { Href } from "expo-router";

export type Route = Readonly<{
  name: string;
  Icon: IconType;
  subRoutes?: Route[];
  href: Href;
  description?: string;
}>;

export const THEME_COLORS = {
  light: {
    background: "hsl(0 0% 98%)", // background
    primary: "hsl(128 52% 47%)", // primary
    foreground: "hsl(240 3.7% 13.9%)", // foreground,
    card: "hsl(240 3.7% 13.9%)",
    text: "hsl(128 52% 47%)",
    border: "hsl(128 52% 47%)",
    notification: "hsl(240 3.7% 13.9%)",
  },
  dark: {
    background: "hsl(0 0% 10%)", // background
    primary: "hsl(128 52% 47%)", // primary
    foreground: "hsl( 0 0% 90%)", // foreground
    card: "hsl(0 0% 10%)",
    text: "hsl( 0 0% 90%)",
    border: "hsl( 0 0% 90%)",
    notification: "hsl( 0 0% 90%)",
  },
};

export const ROUTES = {
  Home: {
    name: "home",
    Icon: HomeIcon,
    href: "/home",
  },
  Timer: {
    name: "session",
    Icon: TimerIcon,
    href: "/session",
  },
  Map: {
    name: "map",
    Icon: MapIcon,
    href: "/map",
  },
  Ticket: {
    name: "ticket",
    Icon: TicketIcon,
    href: "/testing",
  },
  Settings: {
    name: "settings",
    Icon: SettingsIcon,
    href: "/settings",
    subRoutes: [
      //   {
      //     name: "Account Settings",
      //     Icon: CircleUserIcon,
      //     href: "/settings/account",
      //   },
      //   {
      //     name: "Wallet",
      //     Icon: WalletIcon,
      //     href: "/settings/wallet",
      //   },
      //   {
      //     name: "Activity",
      //     Icon: ActivityIcon,
      //     href: "/settings/activity",
      //   },
      //   {
      //     name: "Messages",
      //     Icon: ChatIcon,
      //     href: "/settings/messages",
      //   },
      //   {
      //     name: "Become a Provider",
      //     Icon: BriefcaseIcon,
      //     href: "/settings/become-a-provider",
      //   },
      //   {
      //     name: "Terms & Conditions",
      //     Icon: InfoIcon,
      //     href: "/settings/terms-and-conditions",
      //   },
      //   {
      //     name: "Help",
      //     Icon: HelpIcon,
      //     href: "/settings/help",
      //   },
      //   {
      //     name: "About LookUp",
      //     Icon: BookIcon,
      //     href: "/settings/about",
      //   },
    ],
  },
} satisfies Record<string, Route>;
