// React Imports
import React, { FC } from "react";
import { Redirect, useParams } from "react-router-dom";

//Redux Imports
import { useSelector } from "react-redux";
import { getComponents } from "../Redux/selectors";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  component: {
    maxWidth: "85%",
    margin: "10px auto",
  },
}));

interface Params {
  id: string;
}

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  const classes = useStyles();
  const components = useSelector(getComponents);

  const { id } = useParams<Params>();

  const component = Object.values(components ?? {}).find(
    (component) => component.url === id
  );

  if (!component) return <Redirect to="/404" />;

  return (
    <div
      className={`${classes.component} markdown-body`}
      dangerouslySetInnerHTML={{ __html: component.text }}
    ></div>
  );
};

export default Component;
