import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Link,
    withRouter
} from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import "./../Drawer/Drawer.css"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props: any) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [select, setSelect] = React.useState(1);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // useEffect(() => {
    //     switch (check) {
    //         case `/home`: setSelect(1)
    //             break;
    //         case `/history`: setSelect(2)
    //             break;
    //         case `/faq`: setSelect(3)
    //             break;
    //         case `/account`: setSelect(4)
    //             break;
    //         case `/account`: setSelect(5)
    //             break;
    //         case `/account`: setSelect(6)
    //             break;
    //         default: setSelect(1)
    //             break;
    //     }
    // }, [check]);
    const changeDrawer = (key: any) => {
        setMobileOpen(false)
        switch (key) {
            case `1`: setSelect(1)
                break;
            case `2`: setSelect(2)
                break;
            case `3`: setSelect(3)
                break;
            case `4`: setSelect(4)
                break;
            case `5`: setSelect(5)
                break;
            case `6`: setSelect(6)
                break;
            default: setSelect(1)
                break;
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List className='custom-list' >
                <Link to={`/all-wallet`} className="click-history">
                    <div onClick={() => changeDrawer("1")}>
                        <ListItem button className={(select === 1) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"All Wallets"} />
                        </ListItem>
                    </div>

                </Link>
                <Link to={`/new-wallet`} className="click-history">
                    <div onClick={() => changeDrawer("2")}>
                        <ListItem button className={(select === 2) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"New Wallet"} />
                        </ListItem>
                    </div>
                </Link>
                <Link to={`/check-balance`} className="click-history">
                    <div onClick={() => changeDrawer("3")}>
                        <ListItem button className={(select === 3) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"Check Balance"} />
                        </ListItem>
                    </div>
                </Link>
                <Link to={`/add-funds`} className="click-history">
                    <div onClick={() => changeDrawer("4")}>
                        <ListItem button className={(select === 4) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"Add Funds"} />
                        </ListItem>
                    </div>
                </Link>
                <Link to={`/spend-funds`} className="click-history">
                    <div onClick={() => changeDrawer("5")}>
                        <ListItem button className={(select === 5) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"Spend Funds"} />
                        </ListItem>
                    </div>
                </Link>
                <Link to={`/all-trans`} className="click-history">
                    <div onClick={() => changeDrawer("6")}>
                        <ListItem button className={(select === 6) ? "active" : ''}>
                            <ListItemIcon> <ArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={"All Transactions"} />
                        </ListItem>
                    </div>
                </Link>

            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />

            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >

                {(mobileOpen) ?
                    (<CloseIcon />) : (<MenuIcon />)}
            </IconButton>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
