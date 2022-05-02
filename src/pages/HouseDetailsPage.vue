<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <img class="img-fluid shadow rounded" :src="house.imgUrl" alt="">
      </div>
      <div class="col-md-4">
        <div class="d-flex justify-content-around p-1 mb-2">
          <p>Bedrooms: {{house.bedrooms}}</p>
          <p>Bathrooms: {{house.bathrooms}}</p>
          <p>Levels: {{house.levels}}</p>
        </div>
        <div class="d-flex justify-content-around p-1 mb-2">
          <h6>Price: {{house.price}}</h6>
          <h6>Year Built: {{house.year}}</h6>
        </div>
        <div class="p-1">
          <p class="m-0 p-0">Description: </p>
          <p>{{house.description}}</p>
        </div>
        <div v-if="house.creatorId === account.id">
          <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#edit-house-modal"></i>
          <i class="mdi mdi-delete selectable" @click="deleteHouse(house.id)"></i>
        </div>
      </div>
    </div>
  </div>

  <Modal id="edit-house-modal">
    <template #modal-title-slot>
      <h3>Edit House</h3>
    </template>
    <template #modal-body-slot>
      <HouseForm :house="house" />
    </template>
  </Modal>

</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { housesService } from "../services/HousesService"
import { useRoute, useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  
  setup(){
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      try {
        await housesService.getHouseById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      house: computed(() => AppState.house),
      async deleteHouse(){
        try {
          await housesService.deleteHouse(route.params.id)
          router.push({ name: 'HousesPage' })
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