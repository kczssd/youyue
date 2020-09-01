<template>
    <div>
        <img v-if="isload" :src="loading" id="load" />
        <div v-else class="intropage">
            <header @scroll="handleScroll" class="choose font9">
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
                        <!-- <img id="hu" :src="active" v-if="titleactive==index" /> -->
                        <svg
                            id="hu"
                            v-if="titleactive==index&&difdepartsList.length>1"
                            width="26"
                            height="9"
                            viewBox="0 0 26 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 2C21.0826 5.20145 17.1258 7 13 7C8.8742 7 4.91738 5.20145 2 2"
                                stroke="#817BF9"
                                stroke-width="4"
                                stroke-linecap="round"
                            />
                        </svg>
                    </li>
                </ul>
            </header>
            <main v-if="difdepartsList!=undefined" class="maincontent">
                <img class="styleimg" :src="difdepartsList[titleactive].avatar" />
                <h3 class="infont1">{{difdepartsList[titleactive].name}}</h3>
                <p class="infont7">{{difdepartsList[titleactive].detail}}</p>
            </main>
            <!-- 手动跳转 -->
            <button @click="toConfirm" class="signin">立即报名</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    let betitle = process.env.NODE_ENV == 'development' ? { do: '/domain', re: '/redomain' } : { do: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter', re: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply' };
    let token = localStorage.getItem('young-youyue-token');
    export default {
        data() {
            return {
                difdepartsList: [
                    //  组织的部门信息
                    { id: 1, name: '', detail: '', avatar: '/' },
                ],
                titleactive: 0,
                loading: require('@/assets/img/loading.gif'),
                isload: true,
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
            handleScroll(e) {
                let chooseLeft = e.currentTarget.scrollLeft;
                let chooseWidth = e.currentTarget.scrollWidth;
                let nowChoose = document.querySelector('#introfont');
                let width = nowChoose.offsetWidth;
                if (nowChoose.offsetLeft + width / 2 < chooseLeft) {
                    this.titleactive++;
                } else if (nowChoose.offsetLeft + width / 2 > chooseLeft + window.innerWidth) {
                    this.titleactive--;
                }
            },
        },
        computed: {
            // ...mapGetters(['showAll']),
        },
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
            //对象数组排序方法
            const sortNumber = (p) => (m, n) => m[p] - n[p];
            let req = new Request(betitle.do + '/team/apply/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: `{"id":${this.$route.query.departid}}`,
            }); //获取组织的部门信息
            getJSON(req)
                .then(function (resolve) {
                    let data = resolve.data;
                    if (_this.$route.query.departid == 37) {
                        data.sort(sortNumber('id'));
                    }
                    data = data.map((item) => {
                        return { id: item.id, name: item.name.match('—') ? item.name.split('—')[1] : item.name, detail: item.detail, avatar: item.avatar };
                    });
                    _this.difdepartsList = data;
                })
                .then(function () {
                    _this.isload = false;
                });
        },
    };
</script>

<style>
.choose {
    width: 100%;
    height: 65px;
    background: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
}
.choose::-webkit-scrollbar {
    display: none;
}
#container {
    min-width: 100%;
    margin-top: 22px;
    height: 43px;
    display: flex;
    justify-content: center;
    float: left;
}
.difdeparts {
    height: 43px;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    margin-left: 16px;
    margin-right: 16px;
    /* 字体 */
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    letter-spacing: 0.03em;
    color: #a4a3b7;
    opacity: 0.9;
}
#introfont {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #1c184c;
    letter-spacing: 0;
    opacity: 0.9;
}
#hu {
    width: 26px;
    height: 9px;
    margin-bottom: 10px;
    opacity: 1;
}
.infont1 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 16px;
    /* 1 */
    color: #1c184c;
    opacity: 0.9;
}
.infont7 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
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
    overflow: hidden;
}
.maincontent > h3 {
    margin-left: 16px;
    margin-top: 22px;
}
.maincontent > p {
    margin-left: 16px;
    margin-top: 7px;
    margin-bottom: 20px;
}
.signin {
    margin-top: 66px;
    margin-left: 98px;
    margin-bottom: 20px;
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