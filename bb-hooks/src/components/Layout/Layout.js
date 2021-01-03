import React, { useState } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);


    const sideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer} close={sideDrawerHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);