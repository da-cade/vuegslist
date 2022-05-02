
<template>
  <div class="component col-4 mb-3">
    <router-link :to="{ name: 'CarDetailsPage', params: { id: car.id } }">
      <img class="img-fluid shadow rounded" :src="car.imgUrl" alt=""/>
    </router-link>
  </div>
</template>


<script>
import { Car } from "../Models/Car"
export default {
  props: {
    car: {
      type: Car,
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