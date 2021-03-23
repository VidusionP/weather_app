import './App.scss';
import React, { Component } from 'react';
import axios from "axios";

export default class App extends Component {
  state ={
    city: [],
    location: [],
    astro: [],
    current: [],
    forecast: []
  }

  citySearch =() => {
    const vidu = document.getElementById('city').value
    this.setState({
      city: vidu
    })
    document.getElementById('city').value = ''
  }
  getDayOfWeek(date) {
    const x = new Date(date).getDay();
    return x
  }
  
  
  componentDidMount() {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=da37fcb43d64499483b135715211903&q=Toronto&days=3`)
      .then(response =>{
        this.setState({
          location: response.data.location,
          current: response.data.current,
          forecast: response.data.forecast
        })
        console.log(this.state.forecast.forecastday)
      })
      
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=da37fcb43d64499483b135715211903&q=${this.state.city}&days=3`)
      .then(response =>{
        // console.log(response.data)
        this.setState({
          location: response.data.location,
          current: response.data.current,
          forecast: response.data.forecast
        })
        console.log(this.state.current)
      })
    }
  }

  render() {
    const loc = this.state.location
    const forecast = this.state.forecast.forecastday
    const current = this.state.current
    const daysOfWeek = ["MON", "TUES", "WED", "THU", "FRI", "SAT", "SUN"]
    const x = new Date().getDay() -1 
    // console.log(vidu)
    if (this.state.current.condition) {
      return (
        <div className='App'>
          <div className='hero'>
            <h1 className='hero__title'>Weather App</h1>
            <div className='hero__city'>
              <input placeholder='City'className='hero__city--search' id='city'/>
              <button className='hero__click--button' onClick={this.citySearch}>Search</button>
            </div>
            <div className='hero__card'>
              <div className='hero__card--city'>
                {loc.name}, {loc.region}
              </div>
              <div className='hero__card--today'>
                <img className='hero__card--today--icon' src={current.condition.icon} />
                <div className='hero__card--today--weath'>{current.condition.text}</div>
              </div>
              <div className='hero__card--weather'>
                {current.temp_c}°C
              </div>
            </div>
          </div>
          <div className='main'>
            {forecast.map((item, i) => {
              return(
                <div key={i} className='main__card'>
                  <div className='main__card--day'>{this.getDayOfWeek(item.date) === x?"TODAY":daysOfWeek[this.getDayOfWeek(item.date)]}</div>
                  <div className='main__card--weath'>
                    <img className='main__card--weath--icon' src={item.day.condition.icon}/>
                    <div className='main__card--weath--adj'>{item.day.condition.text}</div>
                  </div>
                  <div className='main__card--temp'>{item.day.avgtemp_c}</div>
                  <div className='main__card--avg'>
                    <div className='main__card--avg--temp'>
                      <div className='main__card--avg--temp--max'>Hi: {item.day.maxtemp_c}</div>
                      <div className='main__card--avg--temp--min'>Lo: {item.day.mintemp_c}</div>
                    </div>
                    <div className='main__card--avg--wind'>Wind: {item.day.avgvis_km}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (

        <div>Loading</div>
      )
    }
   
  }
}


