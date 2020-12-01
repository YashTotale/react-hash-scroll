//React Imports
import React from "react";
import Loading from "../Components/Loading";
import Alerter from "../Components/Alerter";

//Redux Imports
import { useSelector } from "react-redux";
import {
  getChangelog,
  getIsChangelogError,
  getIsChangelogLoading,
} from "../Redux/selectors";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  changelog: {
    maxWidth: "85%",
    margin: "10px auto",
    padding: 10,
  },
}));

const Changelog: React.FC = () => {
  const classes = useStyles();
  const changelog = useSelector(getChangelog);
  const isLoading = useSelector(getIsChangelogLoading);
  const isError = useSelector(getIsChangelogError);

  if (isLoading) return <Loading />;

  if (isError && typeof isError === "string")
    return (
      <Alerter className={classes.changelog} severity="error">
        {isError}
      </Alerter>
    );

  return (
    <div
      className={`${classes.changelog} markdown-body`}
      dangerouslySetInnerHTML={{ __html: changelog ?? "" }}
    ></div>
  );
};

export default Changelog;
