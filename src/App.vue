<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/infor">Infor</router-link>
        </div>-->
        <router-view />
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {},
        computed: {},
        mounted: function () {
            // 拿url上的姓名和电话
            this.$store.commit('chName', '郑志宇');
            this.$store.commit('chNum', '2019210054');
        },
    };
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
ul,
li {
    list-style: none;
}
a {
    display: block;
    text-decoration: none;
}
button,
input {
    border: 0;
    background-color: transparent;
    outline: none;
}
body {
    background: #f6f6f9;
}
.font9 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    /* 9 */
    color: #a4a3b7;
    opacity: 0.9;
}
.font9s {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    /* 9 */
    color: #a4a3b7;
    opacity: 0.9;
}
.font1 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    /* 1 */
    color: #1c184c;
    opacity: 0.9;
}
#font1b {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 18px;
    /* 1 */
    color: #1c184c;
    opacity: 0.9;
}
.font7 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.05em;
    /* 7 */
    color: #777494;
}
.font4 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    /* 4 */
    color: #494670;
}
</style>
