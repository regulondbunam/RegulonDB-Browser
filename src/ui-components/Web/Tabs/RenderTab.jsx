import React from "react";

const TabComponent = React.memo(({ component }) => {
  return <div>{component}</div>;
});

export default TabComponent;
