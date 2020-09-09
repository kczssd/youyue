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
            <button @click="toConfirm" :class="style">立即报名</button>
            <div>
                <div class="cover" v-show="secover"></div>
                <div id="prompt">
                    <img :src="prompt" id="proimg" />
                    <p>未到报名时间</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import resetdepart from '@/assets/js/resetdepart.js';
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
                prompt: require('@/assets/img/prompt.png'),
                isload: true,
                secover: false,
                date: new Date().getTime(),
            };
        },
        methods: {
            reactive(index) {
                this.titleactive = index;
            },
            async showprompt() {
                await setTimeout(() => {
                    document.querySelector('#prompt').style.display = 'none';
                    this.secover = false;
                }, 2000);
            },
            toConfirm() {
                if (this.date < 1600272000000) {
                    document.querySelector('#prompt').style.display = 'block';
                    this.secover = true;
                    this.showprompt();
                } else {
                    let id = this.$route.query.departid; //组织id
                    this.$router.replace({ path: `/infor_confirm?id=${id}` }); //向报名信息确认页传入组织id
                }
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
            style: function () {
                return this.date < 1600272000000 ? 'signDis' : 'signin';
            },
        },
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
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
                    data = resetdepart(data, _this.$route.query.departid);
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
.signDis {
    margin-top: 66px;
    margin-left: 98px;
    margin-bottom: 20px;
    width: 180px;
    height: 44px;
    background-color: #cecde8;
    border-radius: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.1em;
    color: #ffffff;
}
#prompt {
    z-index: 1000;
    position: fixed;
    top: 227.5px;
    left: 60px;
    width: 255px;
    height: 212px;
    background-color: #ffffff;
    border-radius: 10px;
    display: none;
}
#prompt > p {
    text-align: center;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
}
#proimg {
    width: 115px;
    height: 92px;
    margin: 20px auto;
    display: block;
}
</style>