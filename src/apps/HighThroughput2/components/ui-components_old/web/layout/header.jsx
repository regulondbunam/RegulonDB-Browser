/*Testing Version 0.0.1 */

import React from "react";
import { Image } from "../../ui_components";
import * as logo from "./resources/regulonDB.png";

const Header = () => {
  return (
    <div>
      <Image
        id={"logoRegulon"}
        imgTitle="RegulonDB logo"
        imgAlt="Logo of RegulonDB"
        urlImage={logo.default}
        imgStyle={{ maxWidth: "239px", maxHeight: "48px" }}
      />
    </div>
  );
};

export default Header;
