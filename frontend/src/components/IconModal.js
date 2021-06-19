import React, { useEffect, useState } from "react";
import { MainWrapper, IconWrapper, IconSize } from "../styled/StyledComponents";

import { iconsData } from "../helpers/Fetch-API";

const IconModal = ({ onSelectIcon }) => {
  //const [loading, setLoading] = useState(true);
  const [iconData, setIconData] = useState([]);

  const fetchingIcon = async () => {
    const getIcon = await iconsData();
    await setIconData(getIcon);
  };

  useEffect(() => {
    fetchingIcon();
  }, []);

  return (
    <MainWrapper style={{ padding: "30px 0" }}>
      <IconWrapper>
        {iconData.length &&
          iconData.map((icon) => (
            <IconSize
              onClick={() => onSelectIcon(icon)}
              key={icon._id}
              src={icon.url}
              alt={icon.name}
            />
          ))}
      </IconWrapper>
    </MainWrapper>
  );
};
export default IconModal;
