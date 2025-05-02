import clsx from "clsx";
import React from "react";

import { useAppContext } from "../../hooks";
import ThemedSvgIcon from "../ThemedSvgIcon";

export interface MenuItem {
  icon?: SVGComponent;
  label: string;
  onClick: () => void;
}

interface Props {
  items: [MenuItem, ...MenuItem[]];
}

export const MenuList: React.FC<Props> = (props: Props) => {
  const { items } = props;
  const { theme } = useAppContext();
  return (
    <div className="flex flex-col gap-1">
      {items.map((item: MenuItem, index: number) => {
        const { label, icon, onClick } = item;
        return (
          <div
            className={clsx(
              theme,
              "px-2",
              "py-[0.75rem]",
              "flex",
              "items-center",
              "gap-2",
              "text-nowrap",
              "menu-list-item",
            )}
            onClick={onClick}
            key={`${item.label}-${index}`}
          >
            {typeof icon !== "undefined" && (
              <ThemedSvgIcon svgComponent={icon} />
            )}
            {label}
          </div>
        );
      })}
    </div>
  )
};