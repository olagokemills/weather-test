import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, WeatherList } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( 
  ) { }

 
    filerCurrentData(data:Array<WeatherList>){
        const currentDate = new Date();
        const filteredData = data.filter((item) => {
            const itemDate = new Date(item.dt_txt); // Convert the date string to a Date object
            return itemDate.getDate() === currentDate.getDate(); // Compare the date values
          });
        return(filteredData);
    }



     filterTimeAndTemperature(data:any, cityData?:City) {
        const filteredTime:any = [];
        const filteredTemperature:any = [];
      
        const currentDate = new Date(); // Get the current date
      
        // Filter the data based on the date and extract time and temperature
        data.forEach((item:any) => {
          const itemDate = new Date(item.dt_txt); // Convert the date string to a Date object
          
          // Check if the item corresponds to today's date
          if (itemDate.getDate() === currentDate.getDate()) {
            const time = itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the time
            
            filteredTime.push(time);
            filteredTemperature.push({temp:item.main.temp, icon:item?.weather[0].icon});
          }
        });
        return {
          time: filteredTime,
          temperature: filteredTemperature,
          city:cityData?.name ?? null,
          country:cityData?.country  ?? null,
        };
      }
}
