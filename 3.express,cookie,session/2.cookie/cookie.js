var document = {
    cookies: [],
    //get set 是关键字
    //当设置cookie==>set
    //当获取cookie==>set
    get cookie() {
        return this.cookies.join('; ');
    },
    set cookie(cookie) {
        var k = cookie.split('=')[0];
        var that = this;
        this.cookies.forEach(function (item, index) {
            var key = item.split('=')[0];
            if (key === k) {
                that.cookies.splice(index, 1);
                return false;
            }
        });
        that.cookies.push(cookie);
        console.log(this.cookies);
    }
};
//当给一个对象的属性赋值的时候，会先看有没有set 属性的方法，如果有，则直接调用这个方法，会把要赋的值作为参数传递给方法
document.cookie = "age=1";
document.cookie = "name=zfpx";
document.cookie = "age=2";
//当读取一个属性值的时候，会调用 get 属性方法
console.log(document.cookie);
