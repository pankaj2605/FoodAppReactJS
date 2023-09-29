import React,{ Fragment } from "react";
import mealsImage from "../../assets/meals.jpg"
import classes from "./Header.module.css"
import HeadercartButton from "./HeadercartButton";

const Header=(props)=>{
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeadercartButton onClick={props.onShowCard}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table is full of deleicious food!"/>
            </div>
        </Fragment>
    )
};

export default Header;