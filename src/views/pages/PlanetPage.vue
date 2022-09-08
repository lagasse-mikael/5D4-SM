<template>
    <MainLayout>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-2 mb-3" v-for="planet in planets">
                            <div class="card">
                                <img :src="planet.icon" />
                                <h4>{{planet.name}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
  
<script setup>
import { inject, onMounted, ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue';

const axios = inject('axios')
const planets = ref([])

onMounted(() => {
    retrievePlanets()
})

async function retrievePlanets() {
    try {
        const response = await axios.get('https://api.andromia.science/planets')
        if(response.status == 200)
            planets.value = response.data
    }
    catch (err) {
        console.error(err)
    }
}

</script>
  
<style lang="scss" scoped>
</style>