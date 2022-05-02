
export class House {
  constructor(data ={}){
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.price = data.price
    this.description = data.description
    this.id = data.id
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.year = data.year
  }
}