import React from "react";

import NoSsr from "@components/atoms/NoSsr";

const MobileLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <NoSsr>
      <div className="container flex flex-col">{children}</div>
    </NoSsr>
  );
};

export default MobileLayout;
