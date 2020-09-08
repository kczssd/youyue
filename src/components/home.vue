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
                        <h3 class="homefont1">
                            {{item.name}}
                            <svg
                                class="label-t"
                                v-if="item.type=='t'"
                                width="32"
                                height="16"
                                viewBox="0 0 32 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H25C28.5899 0.5 31.5 3.41015 31.5 7V9C31.5 12.5899 28.5899 15.5 25 15.5H7C3.41015 15.5 0.5 12.5899 0.5 9V1Z"
                                    stroke="#625AF8"
                                />
                                <path
                                    d="M9.33536 6.104H12.2874V5.096H13.1064V6.104H14.1504V6.869H13.1064V9.443C13.1064 10.037 12.8244 10.334 12.2604 10.334H11.2254L11.0454 9.542C11.3694 9.578 11.6814 9.596 11.9814 9.596C12.1854 9.596 12.2874 9.473 12.2874 9.227V7.094C11.6034 8.222 10.7184 9.107 9.63236 9.749L9.17336 8.993C10.2174 8.465 11.0574 7.757 11.6934 6.869H9.33536V6.104ZM15.4194 3.953V11.936H14.6004V11.594H8.78636V11.936H7.96736V3.953H15.4194ZM8.78636 10.82H14.6004V4.727H8.78636V10.82ZM21.1074 6.086V7.598H20.2614V6.086H20.2164C19.6344 6.83 18.6144 7.475 17.1564 8.021L16.6704 7.247C17.8824 6.887 18.7614 6.5 19.3074 6.086H17.0214V5.285H20.2614V4.745C19.4874 4.781 18.6594 4.799 17.7774 4.799L17.5254 4.043C19.7874 4.043 21.7284 3.905 23.3484 3.629L23.7624 4.349C22.9644 4.499 22.0794 4.613 21.1074 4.691V5.285H24.4014V6.086H22.0704C22.6824 6.548 23.5524 6.917 24.6804 7.193L24.2934 8.003C22.8474 7.511 21.8004 6.872 21.1524 6.086H21.1074ZM16.8144 8.318H19.3614L19.8294 7.616L20.6664 7.868L20.5134 8.093C20.4354 8.213 20.3844 8.288 20.3604 8.318H24.5814V9.119H22.9884C22.6704 9.665 22.3344 10.106 21.9804 10.442C22.7784 10.688 23.5374 10.952 24.2574 11.234L23.7264 11.936C22.8684 11.576 22.0344 11.264 21.2244 11C20.2704 11.576 19.0194 11.882 17.4714 11.918L16.9944 11.171C18.2484 11.171 19.3014 11.003 20.1534 10.667C19.5114 10.475 18.7914 10.289 17.9934 10.109L18.7764 9.119H16.8144V8.318ZM19.7844 9.119L19.2894 9.731C19.9194 9.857 20.5164 10.004 21.0804 10.172C21.4824 9.872 21.8124 9.521 22.0704 9.119H19.7844Z"
                                    fill="#625AF8"
                                />
                            </svg>
                            <svg
                                class="label-x"
                                v-else-if="item.type=='x'"
                                width="43"
                                height="16"
                                viewBox="0 0 43 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H36C39.5899 0.5 42.5 3.41015 42.5 7V9C42.5 12.5899 39.5899 15.5 36 15.5H7C3.41015 15.5 0.5 12.5899 0.5 9V1Z"
                                    stroke="#1678FE"
                                />
                                <path
                                    d="M17.063 5.384V7.562H16.208V6.203H10.115V7.562H9.26902V5.384H10.889C10.601 4.898 10.304 4.466 9.99802 4.088L10.772 3.71C11.09 4.142 11.39 4.604 11.672 5.096L11.096 5.384H14.471C14.831 4.838 15.149 4.235 15.425 3.575L16.307 3.899C16.001 4.499 15.701 4.994 15.407 5.384H17.063ZM10.736 6.77H15.605V7.526C15.047 7.886 14.414 8.24 13.706 8.588V8.903H17.063V9.713H13.706V11.09C13.706 11.624 13.421 11.891 12.851 11.891H11.708L11.501 11.117C11.933 11.129 12.287 11.135 12.563 11.135C12.755 11.135 12.851 11.021 12.851 10.793V9.713H9.29602V8.903H12.851V8.219C13.481 7.949 13.988 7.718 14.372 7.526H10.736V6.77ZM12.923 3.53C13.235 3.992 13.52 4.478 13.778 4.988L13.013 5.375C12.749 4.835 12.461 4.346 12.149 3.908L12.923 3.53ZM19.916 6.032C19.556 6.848 19.103 7.523 18.557 8.057L17.999 7.346C18.809 6.488 19.358 5.336 19.646 3.89L20.519 4.043C20.429 4.457 20.33 4.844 20.222 5.204H21.896V3.692H22.751V5.204H25.64V6.032H22.751V7.895H25.46V8.723H22.751V10.775H26.216V11.621H18.233V10.775H21.896V8.723H19.322V7.895H21.896V6.032H19.916ZM29.573 3.764C29.501 4.166 29.42 4.556 29.33 4.934H31.31V5.699C31.094 7.241 30.653 8.534 29.987 9.578C30.167 9.848 30.356 10.055 30.554 10.199C31.226 10.679 32.288 10.928 33.74 10.946C34.16 10.946 34.685 10.925 35.315 10.883L35.144 11.774H34.145C32.255 11.774 30.896 11.459 30.068 10.829C29.858 10.661 29.669 10.469 29.501 10.253C28.967 10.901 28.322 11.435 27.566 11.855L27.107 11.045C27.857 10.631 28.484 10.091 28.988 9.425C28.724 8.909 28.49 8.303 28.286 7.607C28.064 7.973 27.833 8.3 27.593 8.588L27.008 7.859C27.866 6.803 28.442 5.39 28.736 3.62L29.573 3.764ZM28.781 6.599C28.991 7.415 29.225 8.105 29.483 8.669C29.945 7.859 30.275 6.887 30.473 5.753H29.096C29.018 5.987 28.913 6.269 28.781 6.599ZM32.318 3.665H33.173V5.942C33.911 6.482 34.649 7.07 35.387 7.706L34.874 8.471C34.172 7.751 33.605 7.208 33.173 6.842V10.334H32.318V3.665Z"
                                    fill="#1678FE"
                                />
                            </svg>
                            <svg
                                class="label-y"
                                v-else-if="item.type=='y'"
                                width="52"
                                height="16"
                                viewBox="0 0 52 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H45C48.5899 0.5 51.5 3.41015 51.5 7V9C51.5 12.5899 48.5899 15.5 45 15.5H7C3.41015 15.5 0.5 12.5899 0.5 9V1Z"
                                    stroke="#05CBE7"
                                />
                                <path
                                    d="M17.442 4.358V6.311H16.731V6.842H13.293V6.311H12.564V4.358H14.526C14.43 4.106 14.334 3.893 14.238 3.719L15.12 3.575C15.21 3.779 15.303 4.04 15.399 4.358H17.442ZM13.392 6.077H16.623V5.168H13.392V6.077ZM12.609 7.67H17.514V8.48H16.083V10.685C16.083 10.913 16.155 11.027 16.299 11.027H16.578C16.65 11.027 16.71 10.997 16.758 10.937C16.824 10.865 16.869 10.496 16.893 9.83L17.667 10.1C17.595 10.934 17.502 11.426 17.388 11.576C17.262 11.714 17.049 11.786 16.749 11.792H16.029C15.771 11.792 15.579 11.705 15.453 11.531C15.309 11.351 15.237 11.135 15.237 10.883V8.48H14.58C14.508 9.398 14.358 10.07 14.13 10.496C13.842 11.036 13.356 11.504 12.672 11.9L12.123 11.198C12.699 10.892 13.113 10.526 13.365 10.1C13.563 9.746 13.689 9.206 13.743 8.48H12.609V7.67ZM9.639 3.926H12.357V4.592C12.117 5.378 11.838 6.194 11.52 7.04C12.018 7.862 12.285 8.582 12.321 9.2C12.321 9.614 12.237 9.92 12.069 10.118C11.829 10.346 11.403 10.466 10.791 10.478L10.512 9.605C10.692 9.641 10.848 9.659 10.98 9.659C11.178 9.641 11.316 9.602 11.394 9.542C11.46 9.464 11.493 9.35 11.493 9.2C11.493 8.606 11.226 7.928 10.692 7.166C11.046 6.254 11.322 5.441 11.52 4.727H10.467V11.936H9.639V3.926ZM26.397 5.384V7.562H25.542V6.203H19.449V7.562H18.603V5.384H20.223C19.935 4.898 19.638 4.466 19.332 4.088L20.106 3.71C20.424 4.142 20.724 4.604 21.006 5.096L20.43 5.384H23.805C24.165 4.838 24.483 4.235 24.759 3.575L25.641 3.899C25.335 4.499 25.035 4.994 24.741 5.384H26.397ZM20.07 6.77H24.939V7.526C24.381 7.886 23.748 8.24 23.04 8.588V8.903H26.397V9.713H23.04V11.09C23.04 11.624 22.755 11.891 22.185 11.891H21.042L20.835 11.117C21.267 11.129 21.621 11.135 21.897 11.135C22.089 11.135 22.185 11.021 22.185 10.793V9.713H18.63V8.903H22.185V8.219C22.815 7.949 23.322 7.718 23.706 7.526H20.07V6.77ZM22.257 3.53C22.569 3.992 22.854 4.478 23.112 4.988L22.347 5.375C22.083 4.835 21.795 4.346 21.483 3.908L22.257 3.53ZM29.25 6.032C28.89 6.848 28.437 7.523 27.891 8.057L27.333 7.346C28.143 6.488 28.692 5.336 28.98 3.89L29.853 4.043C29.763 4.457 29.664 4.844 29.556 5.204H31.23V3.692H32.085V5.204H34.974V6.032H32.085V7.895H34.794V8.723H32.085V10.775H35.55V11.621H27.567V10.775H31.23V8.723H28.656V7.895H31.23V6.032H29.25ZM40.815 3.602C41.955 4.85 43.257 5.831 44.721 6.545L44.253 7.373C43.719 7.097 43.218 6.788 42.75 6.446V7.121H38.277V6.41C37.791 6.752 37.269 7.076 36.711 7.382L36.252 6.554C37.836 5.756 39.147 4.772 40.185 3.602H40.815ZM42.57 6.311C41.79 5.729 41.1 5.081 40.5 4.367C39.912 5.081 39.216 5.729 38.412 6.311H42.57ZM36.864 8.12H44.154V8.948H39.96C39.558 9.686 39.09 10.337 38.556 10.901C39.84 10.829 41.088 10.721 42.3 10.577C42.048 10.247 41.751 9.893 41.409 9.515L42.075 9.092C42.885 9.968 43.518 10.742 43.974 11.414L43.263 11.918C43.083 11.642 42.921 11.402 42.777 11.198C41.385 11.414 39.633 11.585 37.521 11.711L37.287 10.973C37.485 10.919 37.632 10.841 37.728 10.739C38.22 10.169 38.634 9.572 38.97 8.948H36.864V8.12Z"
                                    fill="#05CBE7"
                                />
                            </svg>
                        </h3>
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
                <!-- <div>{{showList}}</div> -->
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
                        <button @click="toResult($event,items.id)" class="signResult" :class="items.state>1?null:'ban'">录取结果</button>
                        <img :src="point" v-show="items.read_is" id="statepoint" />
                    </li>
                </ul>
            </main>
            <div v-show="date<1600272000000">
                <div class="cover" v-show="iscover"></div>
                <div id="prompt">
                    <img :src="prompt" id="proimg" />
                    <p>9月17号之后才开放报名途径哦！在此之前所有报名信息将视为无效信息！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    import resetdata from '@/assets/js/resetdata.js';
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
                prompt: require('@/assets/img/prompt.png'),
                isload: true,
                titleactive: true,
                iscover: true,
                date: new Date().getTime(),
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
                    data = resetdata(data);
                    _this.difList = data;
                })
                .then(function () {
                    _this.isload = false;
                    if (_this.date < 1600272000000) {
                        setTimeout(() => {
                            document.querySelector('#prompt').style.display = 'none';
                            _this.iscover = false;
                        }, 3000);
                    }
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
.label-t {
    width: 32px;
    height: 16px;
    margin-left: 7px;
}
.label-x {
    width: 43px;
    height: 16px;
    margin-left: 7px;
}
.label-y {
    width: 52px;
    height: 16px;
    margin-left: 7px;
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
    line-height: 18px;
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
    min-height: 88px;
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: 12px;
    position: relative;
    display: block;
    overflow: hidden;
}
.diffent > h3 {
    margin-left: 18px;
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
}
.diffent > p {
    margin-left: 18px;
    margin-top: 10px;
    padding-bottom: 16px;
}
#point {
    position: absolute;
    height: 13px;
    width: 6.5px;
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
#prompt {
    z-index: 1000;
    position: fixed;
    top: 227.5px;
    left: 60px;
    width: 255px;
    height: 212px;
    background-color: #ffffff;
    border-radius: 10px;
}
#prompt > p {
    margin: 0 20px;
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