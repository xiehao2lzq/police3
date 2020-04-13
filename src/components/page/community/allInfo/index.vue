<template>
    <div>
        <LeftBaseInfo/>
        <Map/>
        <RightWebsocket/>
    </div>
</template>

<script>
    import LeftBaseInfo from "./leftBaseInfo"
    import Map from "./map"
    import RightWebsocket from "./rightWebsocket"
    export default {
        components: {
           LeftBaseInfo,
           Map,
           RightWebsocket
        },
         beforeRouteEnter(to, from, next) {
        next(vm => {
        // 通过 `vm` 访问组件实例
        vm.$store.state.common.animation = false;
    });
  }
    }
</script>

<style lang="scss" scoped>

</style>