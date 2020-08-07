<template>
    <div class="intropage">
        <header class="choose font9">
            <ul id="container">
                <li
                    class="difdeparts"
                    @click="reactive(index)"
                    v-for="(items,index) in difdepartsList"
                    :id="titleactive==index?'introfont':null"
                    :key="items.id"
                    :index="items.id"
                >
                    {{items.name}}
                    <img id="hu" :src="active" v-if="titleactive==index" />
                </li>
            </ul>
        </header>
        <main v-if="difdepartsList!=undefined" class="maincontent">
            <img class="styleimg" :src="difdepartsList[titleactive].avatar" />
            <h3 class="font1">{{difdepartsList[titleactive].name}}</h3>
            <p class="infont7">{{difdepartsList[titleactive].detail}}</p>
        </main>
        <!-- 手动跳转 -->
        <button @click="toConfirm" class="signin">立即报名</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                difdepartsList: [
                    //  组织的部门信息
                    { id: 1, name: '', detail: '', avatar: '/' },
                    { id: 2, name: '', detail: '', avatar: '/' },
                    { id: 3, name: '', detail: '', avatar: '/' },
                    { id: 4, name: '', detail: '', avatar: '/' },
                    { id: 5, name: '', detail: '', avatar: '/' },
                ],
                titleactive: 0,
                active: require('@/assets/img/active.png'),
            };
        },
        methods: {
            reactive(index) {
                this.titleactive = index;
            },
            toConfirm() {
                let id = this.$route.query.departid; //组织id
                this.$router.replace({ path: `/infor_confirm?id=${id}` }); //向报名信息确认页传入组织id
            },
        },
        computed: {
            // ...mapGetters(['showAll']),
        },
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                console.log(req);
                let data = await response.json();
                return data;
            }
            let req = new Request('/domain/team/apply/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    Authorization:
                        'Bearer eyJjbGFzcyI6IjEzMDAxODA3IiwiY29sbGVnZSI6Iui9r+S7tuW3peeoi+WtpumZoiIsImV4cCI6IjEwMjQzNzk0MTE5IiwiaGVhZEltZ1VybCI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ScDRyTklJWWRtU05IRTFOSHZBR215UEUzRDRQd3l4aWFubG9jZ3lwcFhQR1BoMnJ3ZG5DN1p3NklkNUxZN1k4TjVyYWIzbmNUcHFlenQ3a3hUZUJVVmcvMTMyIiwiaWF0IjoiMTU4OTA3NzIzOSIsIm1ham9yIjoiIiwibmlja25hbWUiOiJhaGFiaGdr8J+NsCIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwicmVkSWQiOiIyYzEyMmMwOTAyMzVjMzFkODI2NWQ2MWQzZjE4MGIzYTY2NWJhYmRlIiwic3R1TnVtIjoiMjAxODIxNDEzOSIsInN1YiI6InhicyJ9.g++rv4igrRn71/MtY/bXU++PHFQJ4/rxNZXoI9cG/lVd/9vs8UnGKCW/veUPY3iY5/mGfBIh3gFqOarHU6QmkMNvqe4gWxZIP7f52CmmLB3c/a9Hdhm3F+Y4pSDqHHH2PNLKvXkgco8K2+4W83ofzCMKgGUjxXSQSmE2BTghwt4oiEx423tfMjmCUtPMEHCHXGr5eiq0Ko1oJEefpzb32xwvR5hCXSXDqkQIoo1eQZEJ0tBb4v6d8+19bzBHP8kLC7QFz9HwlhDAPn614m45iyGZMo04pRNThGfd4Q5EQLQ1tCXD2W8p8Jxw3h9VTUgvuLP/PF4yozgQO1RhWVmxWA==',
                },
                body: `{"id":${this.$route.query.departid}}`,
            }); //获取组织的部门信息
            getJSON(req).then(function (resolve) {
                let data = resolve.data;
                _this.difdepartsList = data;
            });
        },
    };
</script>

<style>
.choose {
    width: 100%;
    height: 69px;
    background: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
}
.choose::-webkit-scrollbar {
    display: none;
}
#container {
    min-width: 100%;
    height: 69px;
    display: flex;
    justify-content: center;
    float: left;
}
.difdeparts {
    height: 69px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    white-space: nowrap;
    margin-left: 16px;
    margin-right: 16px;
    /* 字体 */
    font-family: PingFang SC Light;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0.03em;
    color: #a4a3b7;
    opacity: 0.9;
}
#introfont {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #1c184c;
    letter-spacing: 0;
    opacity: 0.9;
}
#hu {
    width: 26px;
    height: 9px;
    position: absolute;
    bottom: 10px;
    text-align: center;
    box-sizing: border-box;
    opacity: 1;
}
.infont7 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #777494;
}
.maincontent {
    width: 355px;
    min-height: 392px;
    background: #ffffff;
    border-radius: 8px;
    margin: 12px auto;
    position: relative;
}
.maincontent > h3 {
    position: absolute;
    left: 16px;
    bottom: 151px;
}
.maincontent > p {
    position: absolute;
    left: 16px;
    top: 248px;
}
.signin {
    position: absolute;
    bottom: 20px;
    left: 98px;
    width: 180px;
    height: 44px;
    background: #625af8;
    border-radius: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.1em;
    color: #ffffff;
}
</style>