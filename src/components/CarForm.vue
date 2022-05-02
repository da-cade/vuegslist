<template>
 <form @submit.prevent="handleSubmit()" >
   <div class="form-group">
      <label for="make" class="form-label">Make:</label>
      <input
        name="make"
        type="text"
        id="make"
        class="form-control"
        v-model="editable.make">
    </div>
    <div class="form-group">
      <label for="year" class="form-label">Year:</label>
      <input
        type="text"
        class="form-control"
        id="year"
        v-model="editable.year"
      />
    </div>
    <div class="form-group">
      <label for="model" class="form-label">Model:</label>
      <input
        type="text"
        class="form-control"
        id="model"
        v-model="editable.model"
      />
    </div>
    <div class="form-group">
      <label for="price" class="form-label">Price:</label>
      <input
        type="number"
        class="form-control"
        id="price"
        v-model="editable.price"
      />
    </div>
    <div class="form-group">
      <label for="img" class="form-label">Img:</label>
      <input
        type="text"
        class="form-control"
        id="img"
        v-model="editable.imgUrl"
      />
    </div>
    <div class="form-group">
      <label for="color" class="form-label">Color:</label>
      <input
        type="color"
        class="form-control"
        id="color"
        v-model="editable.color"
      />
    </div>
    <div class="form-group">
      <label for="year" class="form-label">Description:</label>
      <textarea
        type="text"
        class="form-control"
        id="year"
        v-model="editable.description"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
 </form>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap";
import Pop from "../utils/Pop"
import { carsService } from "../services/CarsService"
import { Car } from "../Models/Car";
export default {
  props:{
    car: {
      type: Object,
      default: () => new Car(),
    }
  },
  setup(props){
    const router = useRouter()
    const editable = ref({})
    watchEffect(() => {
      editable.value = {...props.car}
    })
    return {
      editable,
      async handleSubmit(){
        try {
          if(editable.value.id){
            logger.log(editable.value)
            await carsService.editCar(editable.value)
            Pop.toast('Car edited', 'success')
            Modal.getOrCreateInstance(document.getElementById("edit-car-modal")).toggle();
          } else{
            const createdCar = await carsService.createCar(editable.value)
            router.push({
              name: "CarDetailsPage",
              params: { id: createdCar.id }
            })
            Pop.toast('Car added', 'success')
            Modal.getOrCreateInstance(document.getElementById("create-car-modal")).toggle();
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>