<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import Api from '@/api/Api'
    
    const data = ref()

    onMounted(async () => {
        await init()
    })

    const init = async () => {
        await getData()
    }

    const getData = async () => {
        const res = await Api.setTable('user').get()
        console.log(res.data)
    }
</script>

<template>
    home show<br />
    <router-view />
</template>

<style lang="scss" scoped>
    
</style>