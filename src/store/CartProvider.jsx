import {useReducer} from "react";
import CartContext from "./Cart-Context";
const defaultCartState={
    items:[],
    totalAmount:0
};

const cartReducer =(state,action)=>{
    if(action.type==="ADD"){
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        const exitingCartItemIndex=state.items.findIndex(item=>item.id === action.item.id);
        const exitingCartItem=state.items[exitingCartItemIndex];
        // const updatedItems=state.items.concat(action.item);
        
        let updatedItems;
        

        if(exitingCartItem){
          const  updatedItem ={
                ...exitingCartItem,
                amount:exitingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=updatedItem;

        } else{
            
            updatedItems=state.items.concat(action.item);
        }

        
        
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount

        };
    }
    if(action.type === 'REMOVE'){
        
        const exitingCartItemIndex=state.items.findIndex(item=>item.id === action.id);
        const exitingItem=state.items[exitingCartItemIndex];
        const updatedTotalAmount=state.totalAmount-exitingItem.price; 
        let updatedItems;

        if(exitingItem.amount === 1){
            updatedItems=state.items.filter(item=>item.id !== action.id);
        }else{
            const updatedItem= {...exitingItem,amount:exitingItem.amount -1};
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=updatedItem;
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type==="CLEAR"){
        return defaultCartState;
    }
    return defaultCartState;
}
const CartProvider=props=>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);


    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type:'ADD',item:item})
    };

    const removeItemFromCartHandler=id=>{
        dispatchCartAction({type:'REMOVE',id:id})
    };
    const clearcartHandler=()=>{
        dispatchCartAction({type:"CLEAR"});

    };

    const cartContext ={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearcartHandler
    };

    return( <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>)

};

export default CartProvider;