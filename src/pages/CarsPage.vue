<template>
  <div class="container">
    <div>
      <button class="btn btn-success square-left" data-bs-target="#create-car-modal" data-bs-toggle="modal" 
      v-if="user.isAuthenticated">Create</button>
    </div>
    <div class="row">
      <Car v-for="c in cars" :key="c.id" :car = c />
    </div>
  </div>

  <Modal id="create-car-modal">
    <template #modal-title-slot>
      <h3>Create a Car!</h3>
    </template>
    <template #modal-body-slot>
      <CarForm />
    </template>
  </Modal>

</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { carsService } from "../services/CarsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup(){
    onMounted(async () => {
      try {
        await carsService.getCars();
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, 'error');
      }
    })
    return {
      user: computed(() => AppState.user),
      cars: computed(() => AppState.cars)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>