import React from "react";

import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";
import KEY from "./api_key";

const API_KEY = KEY;

class App extends React.Component{
  state = {
    city:         undefined,
    country:      undefined,
    temperature:  undefined, 
    humidity:     undefined,
    description:  undefined,
    error:        undefined, 
  }

  getWeather = async (e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    let api_call;
    // debugger;
    if (city === "City..." || city=== undefined || city ===null){
      this.setState({
        error: "Missing non-optional input argument"
      });
      return; 
    }
    if (country !== ""){
      api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    }else{
      api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    }
    const data = await api_call.json();
    // console.log(data);
    if (city !== "City..." && data.main !== undefined){
      this.setState({
        temperature: data.main.temp - 273.15,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
      });
    }
  }

  render(){
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature} 
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />
      </div>
    );
  }
}



export default App;