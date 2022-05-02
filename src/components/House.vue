<template>
  <div class="col-4">
    <router-link :to="{ name: 'HouseDetailsPage', params: { id: house.id } }">
      <img class="img-fluid rounded shadow mb-2 selectable" :src="house.imgUrl" alt="">
    </router-link>
  </div>
</template>


<script>
import { House } from "../Models/House"
export default {
  props: {
    house: {
      type: House,
      required: true
    }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>