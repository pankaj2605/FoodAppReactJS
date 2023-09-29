import { useEffect,useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem";



const  AvailableMeals=()=>{

  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState();

  useEffect(async ()=>{
    try{
      const response= await fetch('https/meals');
      if(!response.ok){
        throw new Error("Something Went wrong")
      }
      const responseData= await response.json();
  
      const loadedMeals=[];
  
      for (const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        });
      }
  
      setMeals(loadedMeals);
      setIsLoading(false);
    }catch(error){
      setIsLoading(false);
      setHttpError(error.message);
    }
    
  },[]);

  if(isLoading){
    return(
      <section className={classes.mealsLoading}>
        <p>loading...</p>
      </section>
      
    )
  }

  if(httpError){
    return(
      <section className={classes.mealsError}>
        <p>Fail to Fetch</p>
      </section>
      
    )
  }
  
    return (
        <section className={classes.meals}>
        <Card>
            <ul>
                {meals.map(meal=>(<MealItem 
                    id={meal.id}
                    key={meal.id} 
                    name={meal.name} 
                    description={meal.description} 
                    price={meal.price}

                />))}
            </ul>

        </Card>
            
        </section>
    )

}

export default AvailableMeals;