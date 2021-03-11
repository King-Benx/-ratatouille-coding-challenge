import { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
   flexGrow:1,
   backgroundColor:'#49796b'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow:1,
    textAlign: 'center'
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
      
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
