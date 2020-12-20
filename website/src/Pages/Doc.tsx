// React Imports
import React, { FC } from "react";
import { Redirect, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Alerter from "../Components/Alerter";

//Redux Imports
import { useSelector } from "react-redux";
import {
  getIsComponentsLoading,
  getComponents,
  getIsComponentsError,
  getIsHooksLoading,
  getHooks,
  getIsHooksError,
} from "../Redux/selectors";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  component: {
    maxWidth: "85%",
    margin: "10px auto",
    padding: 10,
  },
}));

interface Params {
  id: string;
}

interface DocProps {
  type: "hooks" | "components";
}

const Doc: FC<DocProps> = ({ type }) => {
  const classes = useStyles();
  const docs = useSelector(type === "components" ? getComponents : getHooks);
  const isLoading = useSelector(
    type === "components" ? getIsComponentsLoading : getIsHooksLoading
  );
  const isError = useSelector(
    type === "components" ? getIsComponentsError : getIsHooksError
  );

  const { id } = useParams<Params>();

  if (isLoading) return <Loading />;

  if (isError && typeof isError === "string")
    return (
      <Alerter className={classes.component} severity="error">
        {isError}
      </Alerter>
    );

  let doc = Object.values(docs).find((doc) => doc.url === id);

  if (doc === undefined) return <Redirect to="/404" />;

  return (
    <div
      className={`${classes.component} markdown-body`}
      dangerouslySetInnerHTML={{ __html: doc?.text ?? "" }}
    ></div>
  );
};

export default Doc;
