//React Imports
import React from "react";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  loadingSkeleton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  mainSkeleton: {
    width: "80vw",
    height: "40vmin",
    marginBottom: "3%",
  },
  rowSkeleton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80vw",
    height: "40vmin",
  },
  cellSkeleton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    width: "33%",
    height: "100%",
    margin: "0px 10px",
  },
  boxSkeleton: {
    height: "60%",
    width: "100%",
  },
  bioSkeleton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
  },
  circleSkeleton: {
    height: 0,
    paddingBottom: "20%",
    marginRight: "2%",
    width: "20%",
  },
  bioTextSkeleton: {
    flexGrow: 1,
    height: "50%",
  },
  textSkeleton: {
    width: "100%",
    height: "5%",
    marginTop: "5%",
  },
}));

const Loading: React.FC = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.loadingSkeleton}>
        <Skeleton className={classes.mainSkeleton} variant="rect" />
        <div className={classes.rowSkeleton}>
          {[...Array(3)].map((x, i) => (
            <div key={i} className={classes.cellSkeleton}>
              <Skeleton className={classes.boxSkeleton} variant="rect" />
              {[...Array(4)].map((x, i) => {
                return i ? (
                  <Skeleton
                    key={i}
                    variant="text"
                    className={classes.textSkeleton}
                  />
                ) : (
                  <div key={i} className={classes.bioSkeleton}>
                    <Skeleton
                      variant="circle"
                      className={classes.circleSkeleton}
                    />
                    <Skeleton
                      variant="text"
                      className={classes.bioTextSkeleton}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
