import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
   flexGrow:1,
   height: '10vh'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow:1,
  },
}));

interface Props {
  title: String;
}

const Navbar: FC<Props> = ({ title }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
        </Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </AppBar>
    </div>
  );
};

export default Navbar;
