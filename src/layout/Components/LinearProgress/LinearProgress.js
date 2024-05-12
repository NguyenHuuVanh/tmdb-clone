import React from "react";
import classNames from "classnames/bind";
import styles from "./LinearProgress.module.scss";
import {Box} from "@mui/material";

const cx = classNames.bind(styles);

const LinearProgress = () => {
  return (
    <div className={cx("container")}>
      <Box sx={{width: "100%"}}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LinearProgress;
