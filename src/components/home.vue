<template>
    <div>
        <img v-if="isload" :src="loading" id="load" />
        <div v-else class="homepage">
            <header id="choose">
                <span class="zuzhi" @click="titleactive=true" :id="titleactive?'font1b':null">组织选择</span>
                <span class="yibao" @click="titleactive=false;" :id="!titleactive?'font1b':null">已报部门</span>
                <!-- <img :src="active" :id="titleactive?'hu1':'hu2'" /> -->
                <svg :id="titleactive?'hu1':'hu2'" width="26" height="9" viewBox="0 0 26 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 2C21.0826 5.20145 17.1258 7 13 7C8.8742 7 4.91738 5.20145 2 2"
                        stroke="#817BF9"
                        stroke-width="4"
                        stroke-linecap="round"
                    />
                </svg>
            </header>
            <main id="diffences" v-show="titleactive">
                <ul>
                    <!-- 向部门介绍页传入组织id -->
                    <router-link :to="'/intro?departid='+item.id" class="diffent" v-for="(item,index) in difList" :key="item.id">
                        <h3 class="homefont1">{{item.name}}</h3>
                        <p class="homefont7">{{item.introduction}}</p>
                        <svg id="point" width="6" height="13" viewBox="0 0 6 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.6"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 12.9811V0.0189514C3.35622 0.274264 6 3.07839 6 6.50001C6 9.92162 3.35622 12.7257 0 12.9811Z"
                                fill="#D1CEFF"
                            />
                        </svg>
                    </router-link>
                </ul>
            </main>
            <main id="haschoose" v-show="!titleactive">
                <div>{{showList}}</div>
                <ul>
                    <li class="chosen" v-for="(items,index) in showList">
                        <img class="styleimg" :src="items.avatar" />
                        <h3 id="font1b">{{items.name}}</h3>
                        <p class="font7">{{items.detail}}</p>
                        <router-link :to="'/infor_change?id='+items.id">
                            <!-- 传给信息修改页部门名字 -->
                            <button class="signInfor">报名信息</button>
                        </router-link>
                        <!-- 打开录取结果页手动跳转 -->
                        <button @click="toResult($event,items.id)" class="signResult" :class="items.state!=0?null:'ban'">录取结果</button>
                        <img :src="point" v-show="items.read_is" id="statepoint" />
                    </li>
                </ul>
            </main>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    let betitle = process.env.NODE_ENV == 'development' ? { do: '/domain', re: '/redomain' } : { do: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter', re: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply' };
    let token = localStorage.getItem('young-youyue-token');
    export default {
        data() {
            return {
                difList: [
                    // 部门信息页列表
                ],
                showList: [
                    //已报部门页列表
                    // { id: 1, name: '产品运营及策划部', detail: '守护全世界最好的Web研发部', avatar: '/', state: 0, new: 0 },
                    // { id: 2, name: 'Web研发部', detail: '守护全世界最好的Web研发部', avatar: '/', state: 1, new: 1 },
                ],
                point: require('@/assets/img/point.png'),
                loading: require('@/assets/img/loading.gif'),
                isload: true,
                titleactive: true,
            };
        },
        methods: {
            toResult(event, id) {
                if (!event.target.className.match('ban')) this.$router.push({ path: './result?id=' + id }); //传入部门id
            },
        },
        computed: {},
        beforeMount: function () {
            this.$store.commit('chphone', undefined);
        },
        mounted: function () {
            let _this = this; //拿到data中的数据

            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
            let req = new Request(betitle.do + '/team/apply/group', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }); //获取组织信息
            getJSON(req)
                .then(function (resolve) {
                    let data = resolve.data;
                    data.forEach(function (item, index, arr) {
                        if (item.id == 9) {
                            arr.splice(index, 1);
                            arr.unshift(item);
                        }
                    });
                    _this.difList = data;
                })
                .then(function () {
                    _this.isload = false;
                });
            let myinfro = new Request(betitle.re + '/team/apply/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }); //获取已报部门信息
            getJSON(myinfro).then(function (resolve) {
                let data = resolve.data;
                _this.showList = data;
            });
        },
    };
</script>

<style>
.homepage {
    height: 69px;
    width: 375px;
}
#choose {
    background: #ffffff;
    height: 67px;
    width: 100%;
    position: sticky;
    top: 0;
}
.zuzhi,
.yibao {
    position: absolute;
    bottom: 24px;
    white-space: nowrap;
    /* 字体 */
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: rgb(174, 173, 191);
    opacity: 0.9;
}
.zuzhi {
    left: 68px;
    right: 237px;
}
.yibao {
    left: 235px;
    right: 72px;
}
.homefont1 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #494670;
}
.homefont7 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0.02em;
    color: #777494;
}
#hu1 {
    width: 26px;
    height: 9px;
    position: absolute;
    left: 88px;
    top: 50px;
    box-sizing: border-box;
}
#hu2 {
    width: 26px;
    height: 9px;
    position: absolute;
    left: 254px;
    top: 50px;
    box-sizing: border-box;
}
#diffences {
}
.diffent {
    width: 355px;
    height: 88px;
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: 12px;
    position: relative;
    display: block;
}
.diffent > h3 {
    position: absolute;
    left: 18px;
    top: 24px;
}
.diffent > p {
    position: absolute;
    left: 18px;
    bottom: 24px;
}
#point {
    position: absolute;
    top: 39px;
}
.chosen {
    width: 355px;
    min-height: 369px;
    border-radius: 8px;
    background: #ffffff;
    margin: 12px auto;
    position: relative;
}
.styleimg {
    width: 355px;
    height: 199px;
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
}
.chosen > h3 {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 24px;
}
.chosen > p {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 8px;
    padding-bottom: 96px;
}
.signInfor {
    width: 120px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #1678fe;
    box-sizing: border-box;
    border-radius: 32px;
    position: absolute;
    bottom: 24px;
    left: 87px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #1678fe;
}
.signResult {
    width: 120px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #625af8;
    box-sizing: border-box;
    border-radius: 32px;
    position: absolute;
    right: 16px;
    bottom: 24px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #625af8;
}
#statepoint {
    position: absolute;
    bottom: 61px;
    right: 16px;
}
.ban {
    color: #cdcce0;
    border: 1px solid #cdcce0;
}
</style>