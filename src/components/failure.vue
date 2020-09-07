<template>
    <div class="failpage">
        <img class="iconfai" :src="failure" />
        <p class="contfai font7">该板块报名仅软件工程学院学生可使用哦</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                failure: require('@/assets/img/wrong.png'),
            };
        },
    };
</script>

<style>
.failpage {
    position: relative;
}
.iconfai {
    position: absolute;
    left: 41.5px;
}
.contfai {
    position: absolute;
    top: 252px;
    left: 36px;
    font-size: 16px;
    line-height: 28px;
}
</style>