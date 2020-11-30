//React Imports
import React from "react";

//Redux Imports
import { useSelector } from "react-redux";
import { getChangelog } from "../Redux/selectors";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    maxWidth: "85%",
    margin: "10px auto",
  },
}));

const Changelog: React.FC = () => {
  const classes = useStyles();
  const changelog = useSelector(getChangelog);

  return (
    <div
      className={`${classes.home} markdown-body`}
      dangerouslySetInnerHTML={{ __html: changelog ?? "" }}
    ></div>
  );
};

export default Changelog;
