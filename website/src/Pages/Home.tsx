//React Imports
import React from "react";

//Redux Imports
import { useSelector } from "react-redux";
import { getReadme } from "../Redux/selectors";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    maxWidth: "85%",
    margin: "auto",
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const readme = useSelector(getReadme);

  return (
    <div
      className={`${classes.home} markdown-body`}
      dangerouslySetInnerHTML={{ __html: readme ?? "" }}
    ></div>
  );
};

export default Home;
