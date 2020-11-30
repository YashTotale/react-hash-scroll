// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  component: {},
}));

interface Params {
  id: string;
}

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();

  console.log(id);

  return <div className={classes.component}></div>;
};

export default Component;
