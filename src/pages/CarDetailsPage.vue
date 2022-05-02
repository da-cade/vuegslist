
<template>
  <div v-if="car" class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8 d-flex">
        <div>
          <img class="img-fluid" :src="car.imgUrl" alt="" />
        </div>
        <div class="col-md-3 d-flex flex-column m-2">
          <div class="d-flex justify-content-around p-1">
            <p>{{car.make}}</p>
            <p>{{car.model}}</p>
            <p>{{car.year}}</p>
          </div>
          <div class="d-flex justify-content-around p-1">
            <h6>{{car.price}}</h6>
            <h6>{{car.color}}</h6>
          </div>
          <div class="p-1">
            <p>{{car.description}}</p>
          </div>
          <div v-if="car.creatorId === account.id">
            <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#edit-car-modal"></i>
            <i class="mdi mdi-delete selectable" @click="deleteCar()"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="edit-car-modal">
    <template #modal-title-slot>
      <h3>Edit Car</h3>
    </template>
    <template #modal-body-slot>
      <CarForm :car="car" />
    </template>
  </Modal>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { carsService } from "../services/CarsService"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      try {
        AppState.car = null
        await carsService.getCarById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    
    return {
      car: computed(() => AppState.car),
      account: computed(() => AppState.account),
      async deleteCar(){
        try {
          await carsService.deleteCar(route.params.id)
          router.push({ name: 'CarsPage' })
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