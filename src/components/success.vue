<template>
    <div class="successpage">
        <div v-if="id==9" class="redsuc">
            <img class="iconred" :src="RedRock" />
            <p class="p1 font7">欢迎加入红岩网校！</p>
            <p class="p2 font7">记得及时查询录取结果哦</p>
        </div>
        <div v-else class="othsuc">
            <img class="iconoth" :src="success" />
            <p class="p1 font7">恭喜你！报名成功！</p>
            <p class="p2 font7">记得及时查询录取结果哦</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                success: require('@/assets/img/iconsuc.svg'),
                RedRock: require('@/assets/img/RedRock.svg'),
                id: this.$route.query.id,
            };
        },
        computed: {},
    };
</script>

<style>
.successpage {
    width: 375px;
    height: 667px;
    position: relative;
    background: #ffffff;
}
.iconoth {
    width: 194px;
    height: 580px;
    position: absolute;
    left: 77px;
    top: -64px;
}
.iconred {
    width: 216px;
    height: 214px;
    position: absolute;
    left: 80px;
    top: 30px;
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