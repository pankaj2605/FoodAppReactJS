
import React,{useContext} from "react";
import classes from "./Cart.module.css"
import Modal from "../UI/Modal"
import CartContext from "../../store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";
import { Fragment } from "react";

const Cart=(props)=>{
    const cartCtx=useContext(CartContext);
    const totalAmount= `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems= cartCtx.items.length>0;
    const [isCheckout,SetIsCheckout]=useState(false);
    const [isSubmitting,setIssubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);

    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler=item=>{
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler=()=>{
        SetIsCheckout(true);

    }

    const submitOrderHandler=async (userdata)=>{
        setIssubmitting(true);
        await fetch("https://react-/orders.json",{
            method:"POST",
            body:JSON.stringify({
                user:userdata,
                orderedItems: cartCtx.items
            })
        });
        setIssubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    };

    const cartitems=<ul className={classes['cart-items']}>{
                    cartCtx.items.map((item)=>(<CartItem 
                                                key={item.id}
                                                name={item.name} 
                                                amount={item.amount} 
                                                price={item.price} 
                                                onRemove={cartItemRemoveHandler.bind(null,item.id)} 
                                                onAdd={cartItemAddHandler.bind(null,item)}

                                                />))
                    }</ul>;

    const modalActions=(
        <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>

    )
    
    const cartModalContent= <Fragment>
                                {cartitems}
                                    <div className={classes.total}>
                                        <span>Total Amount</span>
                                        <span>{totalAmount}</span>
                                    </div>
                                    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
                                    {!isCheckout && modalActions}

                            </Fragment>
    const isSubmittingModalContent=<Fragment>
                                        <p>Sending Order Data.....</p>
                                        
                                    </Fragment>
    
    const didSubmitModalContent= <Fragment>
                                    <p>Successfully sent the order!</p>
                                    <div className={classes.actions} >
                                    <button className={classes.button} onClick={props.onClose} >Close</button>
                                    </div>
                                    
                                    </Fragment>
    return(
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent }
            
        </Modal>
    );
}
export default Cart;