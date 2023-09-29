import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty =value=>{
   return( value.trim()==='');
};
const isFiveChars =value=>{
   return( value.trim().length === 5);
};

const Checkout = (props) => {

    const [formInputValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputref=useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostal=postalInputRef.current.value;
        const enteredCity=cityInputref.current.value;

        const enteredNameValid=!isEmpty(enteredName);
        const enteredStreetValid=!isEmpty(enteredStreet);
        const enteredPostalValid=isFiveChars(enteredPostal);
        const enteredCityValid=!isEmpty(enteredCity);

        setFormInputsValidity({
            name:enteredNameValid,
            street:enteredStreetValid,
            postalCode:enteredPostalValid,
            city:enteredCityValid,
        });

        const formIsvalid=(enteredNameValid&&enteredStreetValid&&enteredPostalValid&&enteredCityValid);

        if(!formIsvalid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostal

        });

    };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name?"":classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street?"":classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode?"":classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputValidity.postalCode && <p>Please enter a valid PostalCode!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city?"":classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputref}/>
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;