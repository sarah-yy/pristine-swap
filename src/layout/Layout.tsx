import clsx from "clsx";
import React, { Suspense } from "react";
import { Theme } from "../constants";
import { useSelect } from "../hooks";
import { Header } from "./components";

const Footer = React.lazy(() => import("./components/Footer"));

const Layout: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const theme = useSelect((store) => store.app.theme);

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

      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;