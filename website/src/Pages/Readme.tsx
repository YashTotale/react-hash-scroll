//React Imports
import React from "react";
import Loading from "../Components/Loading";
import Alerter from "../Components/Alerter";

//Redux Imports
import { useSelector } from "react-redux";
import {
  getIsReadmeError,
  getIsReadmeLoading,
  getReadme,
} from "../Redux/selectors";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    maxWidth: "85%",
    margin: "10px auto",
  },
}));

const Readme: React.FC = () => {
  const classes = useStyles();
  const readme = useSelector(getReadme);
  const isLoading = useSelector(getIsReadmeLoading);
  const isError = useSelector(getIsReadmeError);

  if (isLoading) return <Loading />;

  if (isError && typeof isError === "string")
    return (
      <Alerter className={classes.home} severity="error">
        {isError}
      </Alerter>
    );

  return (
    <div
      className={`${classes.home} markdown-body`}
      dangerouslySetInnerHTML={{ __html: readme ?? "" }}
    ></div>
  );
};

export default Readme;
