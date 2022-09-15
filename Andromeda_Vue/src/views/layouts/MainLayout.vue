<template>
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <!-- le : indique qu'on ira faire reference a une variable : title -->
        <NavBar :title="title"/>
        <slot />
        <FooterBar />
    </main>
</template>

<script setup>
import SideBar from "../../components/layouts/SideBar.vue";
import FooterBar from "../../components/layouts/FooterBar.vue";
import NavBar from "../../components/layouts/NavBar.vue";

const props = defineProps({
    title:{
        type:String,
        required:true
    }
})

</script>

<style lang="scss" scoped>
</style>