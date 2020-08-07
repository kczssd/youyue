<template>
    <div class="successpage">
        <img class="iconsuc" :src="success" />
        <p class="p1 font7">恭喜你！报名成功！</p>
        <p class="p2 font7">记得及时查询录取结果哦</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                success: require('@/assets/img/iconsuc.png'),
            };
        },
        methods: {},
        computed: {},
    };
</script>

<style>
.successpage {
    position: relative;
}
.iconsuc {
    position: absolute;
    left: 77px;
    top: -64px;
}
.p1 {
    position: absolute;
    top: 252px;
    left: 113px;
    font-size: 16px;
    line-height: 28px;
}
.p2 {
    position: absolute;
    top: 280px;
    left: 93px;
    font-size: 16px;
    line-height: 28px;
}
</style>