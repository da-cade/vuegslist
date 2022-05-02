<template>
 <form @submit.prevent="handleSubmit()" >
   <div class="form-group">
      <label for="bedrooms" class="form-label">Bedrooms:</label>
      <input
        name="bedrooms"
        type="text"
        id="bedrooms"
        class="form-control"
        v-model="editable.bedrooms"
      >
      <!-- options -->
    </div>
    <div class="form-group">
      <label for="bathrooms" class="form-label">Bathrooms:</label>
      <input
        type="number"
        class="form-control"
        id="bathrooms"
        v-model="editable.bathrooms"
      />
    </div>
    <div class="form-group">
      <label for="levels" class="form-label">Levels:</label>
      <input
        type="number"
        class="form-control"
        id="levels"
        v-model="editable.levels"
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
      <label for="year" class="form-label">year:</label>
      <input
        type="number"
        class="form-control"
        id="year"
        v-model="editable.year"
      />
    </div>
    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea
        type="text"
        class="form-control"
        id="description"
        v-model="editable.description"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
 </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { House } from "../Models/House"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { housesService } from "../services/HousesService"
export default {
  props: {
    house: {
      type: House,
      default: () => new House()
    }
  },
  setup(props){
    const router = useRouter()
    const editable = ref({})
    watchEffect(() => {
      editable.value = {...props.house}
    })
    return {
      editable,
      async handleSubmit() {
        try {
          if(editable.value.id){
            await housesService.editHouse(editable.value)
          }else{
            await housesService.createHouse(editable.value)
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