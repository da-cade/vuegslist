import { AppState } from "../AppState";
import { Car } from "../Models/Car";
import { api } from "./AxiosService";

class CarsService {

  async getCars(){
    const res = await api.get('api/cars')
    console.log(res.data)
    AppState.cars=res.data.map(c => new Car(c))
  }
  async getCarById(id){
    const res = await api.get('api/cars/' + id)
    console.log(res.data)
    AppState.car = new Car(res.data)
  }
  async createCar(car){
    const res = await api.post('api/cars', car)
    AppState.cars.push(new Car(res.data))
    return res.data
  }
  async editCar(car){
    const res = await api.put('api/cars/' +car.id, car)
    console.log(res.data)
    AppState.car = new Car(res.data)
  }
  async deleteCar(id){
    await api.delete('api/cars/'+id)
  }
}

export const carsService = new CarsService();