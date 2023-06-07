<script setup>
    /**
     * vue app 入口
     * 仅在此设置了默认路由，显示主页面/home
     */
    import { onMounted} from "vue"
    import {useRouter} from "vue-router"

    const router = useRouter()

    onMounted(() => {
        router.push("/home")
    })

</script>

<template>
    <div>
        <router-view></router-view>
    </div>
</template>