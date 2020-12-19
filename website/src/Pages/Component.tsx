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

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  const classes = useStyles();
  const components = useSelector(getComponents);
  const isLoading = useSelector(getIsComponentsLoading);
  const isError = useSelector(getIsComponentsError);

  const { id } = useParams<Params>();

  if (isLoading) return <Loading />;

  if (isError && typeof isError === "string")
    return (
      <Alerter className={classes.component} severity="error">
        {isError}
      </Alerter>
    );

  let component = null;

  if (components) {
    component = Object.values(components).find(
      (component) => component.url === id
    );
  }

  if (component === undefined) return <Redirect to="/404" />;

  return (
    <div
      className={`${classes.component} markdown-body`}
      dangerouslySetInnerHTML={{ __html: component?.text ?? "" }}
    ></div>
  );
};

export default Component;
