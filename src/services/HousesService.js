import { AppState } from "../AppState";
import { House } from "../Models/House";
import { api } from "./AxiosService";

class HousesService {
  async getAllHouses(){
    const res = await api.get('api/houses')
    console.log(res.data)
    AppState.houses = res.data.map(h => new House(h))
  }
  async getHouseById(id){
    const res = await api.get('api/houses/' + id)
    console.log(res.data)
    AppState.house = new House(res.data)
  }
  async createHouse(houseToCreate){
    const res = await api.post('api/houses', houseToCreate)
    console.log(res.data)
    AppState.houses.push(new House(res.data))
  }
  async editHouse(houseToEdit){
    const res = await api.put('api/houses/' + houseToEdit.id, houseToEdit) 
    console.log(res.data)
    AppState.house = new House(res.data)
  }
  async deleteHouse(id){
    const res = await api.delete('api/houses/' + id)
    console.log(res.data)
  }
}

export const housesService = new HousesService();