
export class Car {
  constructor(data = {}){
    this.id = data.id
    this.creatorId = data.creatorId
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.color = data.color
    this.price = data.price
    this.description = data.description
    this.imgUrl = data.imgUrl
  }
}