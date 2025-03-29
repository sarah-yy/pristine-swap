import clsx from "clsx";
import React from "react";
import { Theme } from "../constants";
import { useAppContext } from "../provider";
import { Footer, Header } from "./components";

const Layout: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const { theme } = useAppContext();

  return (
    <div
      className={clsx({
        "light-background-gradient": theme === Theme.Light,
        "dark-background-gradient": theme === Theme.Dark,
      },
      "h-full",
      "min-h-screen",
      "grid",
      "grid-rows-[68px_auto_44px]",
      "md: grid-rows-[68px_auto_38px]",
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;