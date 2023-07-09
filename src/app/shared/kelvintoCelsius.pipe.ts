import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(value: number): number {
    if (value === null || value === undefined) {
      return value;
    }
    // Convert Kelvin to Celsius
    const celsius = value - 273.15; 
    return Number(celsius.toFixed(2));
  }
}
