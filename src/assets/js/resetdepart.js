const sortNumber = (p) => (m, n) => m[p] - n[p];
//对象数组排序方法
function resetdepart(data, id) {
    if (id == 37) {
        data.sort(sortNumber('id'));
    }
    if (id == 9) {
        [data[0], data[1], data[2], data[3]] = [data[1], data[3], data[0], data[2], data[4]];
    }
    return data;
}
export default resetdepart;