<template>
    <div class="resultpage">
        <ul>
            <li class="consequence" v-for="(items,index) in resultList">
                <img :src="dpoint" />
                <span class="tifont" v-text="setTitle(items.step)"></span>
                <div class="contentres">
                    <h2>郑志宇同学：</h2>
                    <h3>恭喜您通过了</h3>
                    <h4>红岩网校工作站—产品策划及运营</h4>
                    <p v-if="final!=1||(final==1&&step!=items.step)">
                        <span>部门的报名，请您准时于</span>
                        <span class="bold">{{items.time}}</span>
                        <span>在</span>
                        <span class="bold">{{items.location}}</span>
                        <span>进行部门面试，若因时间冲突等原因无法参加面试，请在截止时间之前与</span>
                        <span class="bold">{{items.link_name}}</span>
                        <span>联系，联系人电话号码为</span>
                        <span class="bold">{{items.link_phone}}</span>
                        <span>。预祝您面试顺利~</span>
                    </p>
                    <p v-else>
                        <span>部门的招新筛选，成为我们部门的一员，请尽快添加</span>
                        <span class="bold">{{items.group_number}}</span>
                        <span>群，入群申请时请按照格式：学院-姓名 加入本部门。</span>
                    </p>
                    <img :src="approve" class="approve" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    let betitle = process.env.NODE_ENV == 'development' ? { do: '/domain', re: '/redomain' } : { do: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter', re: 'https://cyxbsmobile.redrock.team/wxapi/cyb-teamapply' };
    let token = localStorage.getItem('young-youyue-token');
    export default {
        data() {
            return {
                step: undefined,
                final: undefined,
                resultList: [
                    //录取结果页面
                    // {
                    //     step: 1,
                    //     name: '红岩网校工作站——Web研发部',
                    //     time: '2020-07-05 15:00',
                    //     location: '红岩网校A区',
                    //     link_name: '土豆',
                    //     link_phone: '18982230408',
                    //     group_number: '511124893',
                    // },
                    // {
                    //     step: 2,
                    //     name: '红岩网校工作站——Web研发部',
                    //     time: '2020-07-05 15:00',
                    //     location: '红岩网校A区',
                    //     link_name: '土豆',
                    //     link_phone: '18982230408',
                    //     group_number: '511124893',
                    // },
                    // {
                    //     step: 4,
                    //     name: '红岩网校工作站——Web研发部',
                    //     time: '2020-07-05 15:00',
                    //     location: '红岩网校A区',
                    //     link_name: '土豆',
                    //     link_phone: '18982230408',
                    //     group_number: '511124893',
                    // },
                ],
                dpoint: require('@/assets/img/dpoint.png'),
                approve: require('@/assets/img/approve.png'),
            };
        },
        methods: {
            setTitle(step) {
                if (this.final == 1 && step == this.step) {
                    return '最终结果';
                } else {
                    switch (step) {
                        case 1:
                            return '一面结果';
                        case 2:
                            return '二面结果';
                        case 3:
                            return '三面结果';
                        case 4:
                            return '四面结果';
                        case 5:
                            return '五面结果';
                    }
                }
            },
        },
        computed: {},
        mounted: function () {
            let _this = this;
            async function getJSON(req) {
                let response = await fetch(req);
                let data = await response.json();
                return data;
            }
            let req = new Request(betitle.re + '/team/apply/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;',
                    Authorization: 'Bearer ' + token,
                },
                body: `{"id":${this.$route.query.id}}`,
            }); //获取组织信息
            getJSON(req).then(function (resolve) {
                let data = resolve.data;
                _this.step = resolve.step; //当前面试阶段
                _this.final = resolve.state; //判断当前是否为最终面试
                _this.resultList = data;
            });
        },
    };
</script>

<style>
.consequence {
    width: 355px;
    height: 325px;
    margin: 12px auto 32px;
}
.contentres {
    width: 355px;
    height: 299px;
    margin-top: 8px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
}
.contentres > h2 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #1c184c;
    position: absolute;
    top: 50px;
    left: 27px;
}
.contentres > h3 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: #777494;
    position: absolute;
    top: 92px;
    left: 27px;
    right: 25px;
}
.contentres > h4 {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #1c184c;
    position: absolute;
    top: 118px;
    left: 27px;
    right: 25px;
}
.contentres > p {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    margin-right: 10px;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: #777494;
    position: absolute;
    top: 148px;
    left: 27px;
}
.tifont {
    font-family: PingFang SC;
    font-style: normal;
    margin-left: 12px;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #777494;
}
.bold {
    font-weight: bold;
    color: #1c184c;
}
.approve {
    position: absolute;
    right: 0;
}
</style>