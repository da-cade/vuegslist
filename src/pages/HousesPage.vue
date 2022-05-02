<template>
  <div class="container-fluid">
    <div>
      <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#create-house-modal" v-if="user.isAuthenticated"
      >New House</button>
    </div>
    <div class="row">
      <House v-for="h in houses" :key="h.id" :house= h />
    </div>
  </div>

  <Modal id="create-house-modal">
    <template #modal-title-slot>
      <h3>Create House</h3>
    </template>
    <template #modal-body-slot>
      <HouseForm />
    </template>
  </Modal>
</template>



<script>
import { computed, onMounted } from "@vue/runtime-core"
import { housesService } from "../services/HousesService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup(){
    onMounted(async () => {
      try {
        await housesService.getAllHouses()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      user: computed(() => AppState.user),
      houses: computed(() => AppState.houses)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>