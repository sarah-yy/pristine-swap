import clsx from "clsx";
import React from "react";
import { Theme, useAppContext } from "../provider";
import { Footer, Header } from "./components";

const Layout: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const { theme } = useAppContext();

  return (
    <div
      className={clsx({
        "light-background-gradient": theme === Theme.Light,
        "dark-background-gradient": theme === Theme.Dark,
      }, "full-height")}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;