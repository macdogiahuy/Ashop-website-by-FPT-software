import React, { ReactNode } from "react";

export interface StandardProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}
