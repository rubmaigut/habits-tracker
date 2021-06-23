import React, { useEffect, useState } from "react";
import {
  HabitCard,
  GoogleIcon,
  Paragraph,
  HabitInnerWrapper,
} from "../styled/StyledComponents";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CircularProgress from "@material-ui/core/CircularProgress"

const ProgressHabit = ({
  iconUrl,
  name,
  onClicK,
  count,
  goal,
  hasOptions,
  onClickOptions,
  showProgress
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(showProgress);
  }, [showProgress]);

  return (
    <HabitCard
      onClick={onClicK}
      style={{ justifyContent: "center", padding: "0px 15px" }}
    >
      <HabitInnerWrapper style={{ width: "50%" }}>
      <GoogleIcon src={iconUrl} style={{width:"30px", height:"30px", padding: "0px" }} />
        <Paragraph style={{ marginLeft: "10px" }}>{name}</Paragraph>
      </HabitInnerWrapper>
      {count && goal && (
        <HabitInnerWrapper style={{ width: "50%" }}>
          <HabitInnerWrapper
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <Paragraph>{`${count} ${goal}`}</Paragraph>
          </HabitInnerWrapper>
          <HabitInnerWrapper
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            {hasOptions && (
              <>
                <CircularProgress
                  variant="determinate"
                  color="primary"
                  value={progress}
                  size="33px"
                />
                <MoreVertIcon
                  style={{ marginLeft: 8 }}
                  onClick={onClickOptions}
                />
              </>
            )}
          </HabitInnerWrapper>
        </HabitInnerWrapper>
      )}
    </HabitCard>
  );
};
export default ProgressHabit;
