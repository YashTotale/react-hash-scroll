// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEqual from "lodash.isequal";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getComponents, getIsSideBarOpen, getHooks } from "../Redux/selectors";
import { toggleSidebar } from "../Redux/actions";

//Utils
import { SIDEBAR_WIDTH } from "../Utils/constants";

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Toolbar,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import { NestedDocs } from "../Redux/reducers/docs.reducers";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
  list: {
    width: SIDEBAR_WIDTH,
  },
  listItem: {
    fontWeight: theme.typography.fontWeightBold,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  const open = useSelector(getIsSideBarOpen);

  return (
    <nav className={classes.drawer}>
      {isSmall ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={() => dispatch(toggleSidebar(false))}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </Drawer>
      )}
    </nav>
  );
};

interface ContentsProps {}

const Contents: React.FC<ContentsProps> = () => {
  const components = useSelector(getComponents, isEqual);
  const hooks = useSelector(getHooks, isEqual);
  const classes = useStyles();

  return (
    <>
      <Toolbar />
      <Divider />
      <List component="nav" className={classes.list}>
        <ListLink to="/home" name="Home" />
        <DropdownDocs name="Components" docs={components} />
        <DropdownDocs name="Hooks" docs={hooks} />
        <ListLink to="/changelog" name="Changelog" />
      </List>
    </>
  );
};

interface ListLinkProps {
  to: string;
  name: string;
}

const ListLink: React.FC<ListLinkProps> = ({ to, name }) => {
  const classes = useStyles();

  return (
    <ListItem component={Link} to={to} button>
      <ListItemText primary={name} classes={{ primary: classes.listItem }} />
    </ListItem>
  );
};

interface DropdownDocsProps {
  name: string;
  docs: NestedDocs;
}

const DropdownDocs: React.FC<DropdownDocsProps> = ({ docs, name }) => {
  const names = Object.keys(docs);

  return names.length > 0 ? (
    <Category
      name={name}
      items={names.map((name) => ({
        name: name,
        to: docs[name].url,
      }))}
    />
  ) : null;
};

interface CategoryStyleProps {
  open: boolean;
}

const useCategoryStyles = makeStyles<Theme, CategoryStyleProps>((theme) => ({
  arrow: ({ open }) => ({
    transform: open ? "rotate(0deg)" : "rotate(180deg)",
    transition: "0.5s",
  }),
}));

interface CategoryItems {
  name: string;
  to: string;
}

interface CategoryProps {
  name: string;
  items: CategoryItems[];
}

const Category: React.FC<CategoryProps> = ({ name, items }) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const categoryClasses = useCategoryStyles({
    open,
  });

  const base = `/${name.toLowerCase()}`;

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText classes={{ primary: classes.listItem }} primary={name} />
        <ExpandLess className={categoryClasses.arrow} />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {items.map(({ to, name }, i) => (
            <ListItem
              className={classes.nested}
              component={Link}
              to={`${base}/${to}`}
              button
              key={i}
            >
              <ListItemText
                primaryTypographyProps={{ variant: "body2" }}
                primary={name}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SideBar;
