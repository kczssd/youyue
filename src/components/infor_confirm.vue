<template>
    <div v-if="departList!=undefined" class="infor_confirm">
        <div id="afterChange">
            <div class="unchangeInfor font7">
                <div :class="'un'+items.classname" v-for="(items,index) in inforList.slice(0,2)">
                    {{items.name}}
                    <span class="unfont font1">{{items.data}}</span>
                </div>
            </div>
            <div class="chphoneInfor font7">
                <div class="chphone">
                    联系电话
                    <span v-if="isphone" @click="chinput" class="font9s" style="margin-right:16px">请填写电话号码</span>
                    <input
                        v-else
                        id="contentPhone"
                        class="chfont font1"
                        type="number"
                        pattern="[0-9]*"
                        @blur="isempty"
                        @keyup="chphone(nowphone)"
                        v-model="nowphone"
                        oninput="value=value.replace(/[^\d]/g,'')"
                    />
                </div>
            </div>
            <div class="chdepartInfor font7">
                <div class="chdepart">
                    报名部门
                    <div @click="chAll" id="contentdepart" class="defont">
                        <p class="font9s" v-if="nowChosen.length==0">请选择报名部门</p>
                        <p class="font1" v-else v-for="(item) in nowChosen">{{item}}</p>
                        <img :src="union" id="union" />
                    </div>
                </div>
            </div>
            <!-- 选择部门 -->
            <button id="confirmMyInfor" @click="chCover" :class="style">确认提交</button>
            <!-- 蒙版 -->
            <div class="cover" v-show="iscover"></div>
            <div class="departments font4" :class="isconfirm?'show':null">
                <div id="title">选择部门</div>
                <p>可以选择多个部门</p>
                <div id="coulcontainer">
                    <ul id="coul">
                        <li class="department" v-for="(items,index) in departList" :id="'department'+index">
                            {{items.name}}
                            <!-- <img @click="chChoose(index)" :src="items.ischoose?haschoose:nochoose" /> -->
                            <svg
                                @click="chChoose(index)"
                                v-if="items.ischoose"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="#625AF8" stroke="#625AF8" />
                                <path
                                    d="M6 10.5L9 13.5L14.5 8"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <svg
                                @click="chChoose(index)"
                                v-else
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#A4A3B7" />
                            </svg>
                        </li>
                    </ul>
                </div>
                <img @click="chClose" id="close" :src="close" alt />
                <button @click="chConfirm" id="confirmDepart" :class="style">确认提交</button>
            </div>
            <div class="confirm" :class="!isconfirm&&iscover?'show':null">
                <div id="cotitle">信息核对</div>
                <ul class="coinfors">
                    <li class="coinfor font7" v-for="(items,index) in inforList.slice(0,3)">
                        {{items.name+'：'}}
                        <span class="font1 cofont">{{items.data}}</span>
                    </li>
                    <li class="coinfor font7">
                        <span style="white-space: nowrap;">{{inforList[3].name+'：'}}</span>
                        <div class="inforlist">
                            <span class="font1 cofont" v-for="item in nowChosen">{{item}}</span>
                        </div>
                    </li>
                </ul>
                <img @click="chClose" id="close" :src="close" />
                <!-- 手动跳转 -->
                <button @click="chosenList" id="lastconfirm" :class="style">确认提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    let betitle = process.env.NODE_ENV == 'development' ? { do: '/domain', re: '/redomain' } : { do: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter', re: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply' };
    let token = localStorage.getItem('young-youyue-token');
    export default {
        data() {
            return {
                isphone: true,
                iscover: false,
                isconfirm: false,
                inforList: this.$store.state.inforList,
                nowChosen: [],
                nowphone: '',
                departList: [
                    //组织部门列表
                    // { id: 1, name: '产品运营及策划部', ischoose: false },
                    // { id: 2, name: '视觉设计部', ischoose: false },
                    // { id: 3, name: '移动开发部', ischoose: false },
                    // { id: 4, name: 'Web研发部', ischoose: false },
                    // { id: 5, name: '运维安全部', ischoose: false },
                ],
                union: require('@/assets/img/union.png'),
                close: require('@/assets/img/close.png'),
            };
        },
        methods: {
            chChoose(index) {
                this.departList[index].ischoose = !this.departList[index].ischoose;
                this.nowChosen = this.departList.filter((item) => item.ischoose == true);
                this.nowChosen = this.nowChosen.map((item) => {
                    return item.name;
                });
                this.chdepart(this.nowChosen);
            },
            chinput() {
                this.isphone = !this.isphone;
                setTimeout(() => {
                    document.querySelector('#contentPhone').focus();
                }, 100);
            },
            isempty() {
                if (this.nowphone.length == 0) {
                    this.isphone = !this.isphone;
                }
            },
            chAll() {
                this.iscover = !this.iscover;
                this.isconfirm = !this.isconfirm;
            },
            chConfirm() {
                this.isconfirm = !this.isconfirm;
            },
            chCover() {
                if (this.nowChosen.length != 0 && this.nowphone.length == 11) this.iscover = !this.iscover;
            },
            chClose() {
                this.iscover = false;
                this.isconfirm = false;
            },
            ...mapMutations(['chChosenList', 'chdepart', 'chphone']),
            chosenList() {
                let nowArray = new Array();
                this.departList.filter((items, index) => {
                    if (items.ischoose == true) nowArray.push(items.id);
                });
                try {
                    if (this.nowphone.length == 11) {
                        return this.sendJSON(nowArray, this.nowphone);
                    }
                } catch (e) {}
            },
            sendJSON(array, phone) {
                fetch(betitle.re + '/team/apply/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;',
                        Authorization: 'Bearer ' + token,
                    },
                    body: `{"ids":[${array}],"phone":"${phone}"}`,
                }) //提交报名信息
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == 10000) {
                            this.$router.replace({ path: './success' });
                        }
                    }); //若提交成功则返回报名成功页
            },
        },
        computed: {
            style: function () {
                return this.nowphone.length != 11 || this.nowChosen.length == 0 ? 'styleDis' : 'stylebutton';
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
                    'Content-Type': 'application/json;',
                    Authorization: 'Bearer ' + token,
                },
                body: `{"id":${this.$route.query.id}}`,
            }); //拿到组织旗下部门列表
            getJSON(req).then(function (resolve) {
                let data = resolve.data;
                data.forEach((item) => {
                    _this.departList.push({ id: item.id, name: item.name.match('—') ? item.name.split('—')[1] : item.name, ischoose: false }); //组织id
                });
            });
        },
    };
</script>

<style>
#close {
    width: 13px;
    height: 13px;
    position: absolute;
    top: 22px;
    right: 22px;
}
.show {
    transform: translateY(0) !important;
}
.confirm {
    min-height: 337px;
    width: 375px;
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translate3d(0, 150%, 0);
    transition: transform 0.2s ease-in-out;
    z-index: 100;
}
#cotitle {
    width: 328px;
    height: 34px;
    margin: 19px 22px 0 25px;
    text-align: center;
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #777494;
}
.coinfors {
    width: 328px;
    min-height: 194px;
    margin: 0 auto;
    padding-top: 16px;
    margin-bottom: 90px;
    border-top: 1px rgba(0, 0, 0, 0.05) solid;
    border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.coinfor {
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.03em;
    margin-top: 4px;
}
.inforlist {
    /* max-width: 132px; */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.cofont {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
    letter-spacing: 0.03em;
}
.defont {
    margin-right: 31px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
}
#contentdepart > p {
    margin-bottom: 8px;
}
#coulcontainer {
    overflow-y: auto;
    width: 375px;
    max-height: 280px;
    margin-bottom: 100px;
}
#coulcontainer::-webkit-scrollbar {
    display: none;
}
/* #coul {
    float: left;
} */
</style>