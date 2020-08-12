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
        created: function () {
            // 拿url上的姓名和电话
            let token = location.hash.split('&')[2].slice(2);
            console.log(token)
            if (token == 'undefined') {
                console.log('token不存在');
                token =
                    'eyJjbGFzcyI6IjEzMDAxODA3IiwiY29sbGVnZSI6Iui9r+S7tuW3peeoi+WtpumZoiIsImV4cCI6IjEwMjQzNzk0MTE5IiwiaGVhZEltZ1VybCI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ScDRyTklJWWRtU05IRTFOSHZBR215UEUzRDRQd3l4aWFubG9jZ3lwcFhQR1BoMnJ3ZG5DN1p3NklkNUxZN1k4TjVyYWIzbmNUcHFlenQ3a3hUZUJVVmcvMTMyIiwiaWF0IjoiMTU4OTA3NzIzOSIsIm1ham9yIjoiIiwibmlja25hbWUiOiJhaGFiaGdr8J+NsCIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwicmVkSWQiOiIyYzEyMmMwOTAyMzVjMzFkODI2NWQ2MWQzZjE4MGIzYTY2NWJhYmRlIiwic3R1TnVtIjoiMjAxODIxNDEzOSIsInN1YiI6InhicyJ9.g++rv4igrRn71/MtY/bXU++PHFQJ4/rxNZXoI9cG/lVd/9vs8UnGKCW/veUPY3iY5/mGfBIh3gFqOarHU6QmkMNvqe4gWxZIP7f52CmmLB3c/a9Hdhm3F+Y4pSDqHHH2PNLKvXkgco8K2+4W83ofzCMKgGUjxXSQSmE2BTghwt4oiEx423tfMjmCUtPMEHCHXGr5eiq0Ko1oJEefpzb32xwvR5hCXSXDqkQIoo1eQZEJ0tBb4v6d8+19bzBHP8kLC7QFz9HwlhDAPn614m45iyGZMo04pRNThGfd4Q5EQLQ1tCXD2W8p8Jxw3h9VTUgvuLP/PF4yozgQO1RhWVmxWA==';
            }
            localStorage.setItem('token_canteen_menu', token);
            const parseToken = (token) => JSON.parse(decodeURIComponent(escape(atob(token.split('.')[0]))));
            let infor = parseToken(token);
            console.log(infor);
            this.$store.commit('chName', infor.realName);
            this.$store.commit('chNum', infor.stuNum);
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
