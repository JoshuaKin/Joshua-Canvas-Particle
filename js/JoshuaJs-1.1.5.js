/**************************
 * Joshua.js
 * author:Joshua/金书阳
 * discribtion:兼容性插件库
 * version:1.1.5
 * 增加Animiation方法
 * version:1.0.5
 * 修复innerText,Html函数的bug
 **************************/

var joshuaJs = {
    //去除空格 type 1-所有空格 2-前后空格 3-前空格 4-后空格
    delSpace: function(str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, " ");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, " ");
            case 4:
                return str.replace(/(\s*$)/g, " ");
        };
    },
    //大小写切换 1-首字母大写 2-首字母小写 3-大小写切换 4-全部大写 5-全部小写
    changeCase: function(str, type) {
        switch (type) {
            case 1:
                return str.replace(/(\w)(\w+)/g, function(p, p1, p2) {
                    return p1.toUpperCase() + p2.toLowerCase();
                });
            case 2:
                return str.replace(/(\w)(\w+)/g, function(p, p1, p2) {
                    return p1.toLowerCase() + p2.toUpperCase();
                });
            case 3:
                return (function(str) {
                    var item = ' ';
                    str.split('').forEach(
                        function(data) {
                            if (/^[a-z]+/g.test(data)) {
                                item += data.toUpperCase();
                            } else if (/^[A-Z]+/g.test(data)) {
                                item += data.toLowerCase();
                            } else {
                                item += data;
                            }
                        }
                    );
                    return item;
                })(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
        };
    },
    //字符串循环复制
    repeatStr: function(str, count) {
        var item = '';
        for (var i = 0; i < count; i++) {
            item += str;
        };
        return item;
    },
    //字符串替换
    replaceStr: function(str, chgStr, toStr) {
        var aRegExp = new RegExp(chgStr, 'g');
        return str.replace(aRegExp, toStr);
    },
    //检测字符串类型
    checkType: function(str) {
        if (/^[0-9.]+$/g.test(str)) {
            if (/^1[0-9]{10}$/g.test(str)) {
                return "phone or number";
            } else {
                return "number";
            }
        } else if (/^0[0-9]{2,3}\-[1-9][0-9]{6,7}$/g.test(str)) {
            return "tel";
        } else if (/^[a-zA-Z]+$/g.test(str)) {
            if (/^[A-Z]+$/g.test(str)) {
                return "upper english";
            } else if (/^[a-z]+$/g.test(str)) {
                return "lower english";
            } else {
                return "mixed english";
            }
        } else if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g.test(str)) {
            return "email";
        } else if (/[\u4E00-\u9FA5]/g.test(str)) {
            return "chinese";
        } else {
            return "mixed";
        }
    },
    //检测密码强度
    checkPwd: function(str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv;
        };
        if (/[0-9]/g.test(str)) {
            nowLv++;
        };
        if (/[a-z]/g.test(str)) {
            nowLv++;
        };
        if (/[A-Z]/g.test(str)) {
            nowLv++;
        };
        if (/(\.)||(\-)||(\_)/g.test(str)) {
            nowLv++;
        };
        return nowLv;
    },
    //随机码  0<=count<=36
    randomKey: function(count) {
        return Math.random().toString(count).substring(2);
    },
    //查找字符串出现次数
    countFindStr: function(str, findstr) {
        return str.split(findstr).length - 1;
    },
    //数组去重
    //          delRepeat:function (str) {
    //              var arr = [];
    //              for(var i = 0; i < str.length; i++) {
    //                  if(arr.indexOf(str[i]) == -1) {
    //                      arr.push(str[i]);
    //                  };
    //              };
    //              return arr;
    //          },
    //
    //          delRepeat:function (str) {
    //              var arr = [];
    //              var json = {};
    //              for(var i = 0; i < str.length; i++) {
    //                  if(!json[str[i]]) {
    //                      arr.push(str[i]);
    //                      json[str[i]] = 1;
    //                  };
    //              };
    //              return arr;
    //          },
    delRepeat: function(str) {
        if (typeof Array.from == "function" && typeof Set == "function") {
            //ES6
            return Array.from(new Set(str));
        } else {
            var arr = [];
            var json = {};
            for (var i = 0; i < str.length; i++) {
                if (!json[str[i]]) {
                    arr.push(str[i]);
                    json[str[i]] = 1;
                };
            };
            return arr;
        };
    },
    //数组顺序打乱
    upsetArr: function(arr) {
        return arr.sort(function() {
            return Math.random() - 0.5;
        })
    },
    //数组最大值
    maxArr: function(arr) {
        return Math.max.apply(null, arr)
    },
    //数组最小值
    minArr: function(arr) {
        return Math.min.apply(null, arr)
    },
    //数组求和
    sumArr: function(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        };
        return sum;
    },
    //数组求均值
    covArr: function(arr) {
        var sum = sumArr(arr);
        return sum / arr.length;
    },
    //随机获取数组元素
    delRandArr: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    //返回数组/字符串某个元素出现次数
    countArrorStr: function(data, find) {
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (find == data[i]) {
                count++;
            };
        };
        return count;
    },
    //返回数组/字符串出现最多的几次元素和出现次数
    getCount: function(data, rank, rankStyle) {
        var record = {},
            k, arr = [];
        for (var i = 0; i < data.length; i++) {
            k = data[i];
            if (record[k]) {
                record[k]++;
            } else {
                record[k] = 1;
            };
        };
        //保存结果
        for (var x in record) {
            arr.push({
                el: x,
                count: record[x]
            });
        };
        //排序
        arr.sort(function(n1, n2) {
            return n2.count - n1.count;
        });
        //rankStyle
        if (rankStyle === 1) {
            arr = arr.reverse();
        };
        var rank1 = rank || arr.length;
        return arr.slice(0, rank1);
    },
    //返回数组内俩下标间的值
    getNumInArr: function(arr, n1, n2) {
        var arr1 = [],
            len = n2 || arr.length - 1;
        for (var i = n1; i <= len; i++) {
            arr1.push(arr[i]);
        };
        return arr1;
    },
    //筛选数组
    delValueInArr: function(arr, val, type) {
        //只有arr为字符串时候才能有type输入
        return arr.filter(function(item) {
            return type ? item.indexOf(val) === -1 : item !== val;
        });
    },
    //检测对象是否有哪个class名
    hasClass: function(obj, classStr) {
        var arr = obj.className.split(/\s+/);
        return (arr.indexOf(classStr) === -1) ? false : true;
    },
    //添加class名
    addClass: function(obj, classStr) {
        if (!(this.hasClass(obj, classStr))) {
            obj.className += " " + classStr;
        };
    },
    //删除class名
    delClass: function(obj, classStr) {
        if (this.hasClass(obj, classStr)) {
            var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)')
            obj.className = obj.className.replace(reg, '');
        };
    },
    //替换class名
    replaceClass: function(obj, oldClass, newClass) {
        this.delClass(obj, oldClass);
        this.addClass(obj, newClass);
    },
    //获取兄弟节点
    siblings: function(obj) {
        var a = [];
        var p = obj.previousSibling;
        while (p) {
            if (p.nodeType === 1) {
                a.push(p);
            };
            p = p.previousSibling;
        };
        a.reverse();
        var n = obj.nextSibling;
        while (n) {
            if (n.nodeType === 1) {
                a.push(n);
            };
            n = n.nextSibling;
        };
        return a;
    },
    //获取css样式
    getCss: function(obj, type) {
        if (obj.currentStyle) {
            return obj.currentStyle[type];
        } else {
            return getComputedStyle(obj, null)[type];
        };
    },
    //设置css样式
    setCss: function(obj, json) {
        for (var x in json) {
            obj.style[x] = json[x];
        };
    },
    //轮播向右按钮
    carouselToRight: function(obj, index, maxTimes, autoCarouselCtr, strBefore, strAfter) {
        var tmpNumber = Number(joshuaJs.getCss(obj, 'src').charAt(index)) + 1;
        if (tmpNumber > maxTimes - 1) {
            tmpNumber = 0;
        };
        clearInterval(autoCarouselCtr);
        var tmp = strBefore + tmpNumber + strAfter;
        joshuaJs.setCss(obj, {
            'src': tmp
        });
    },
    //获取window对象
    getW: function() {
        var w = window;
        return w;
    },
    //获取html对象
    getDom: function(str) {
        //暂时只能取id开头的dom
        var finnalObj = null;
        var getOne = function(str, obj) {
            var tmpStr = [];
            var regId = /#/;
            var regSpace = /\s/;
            //      var regChild = />/;
            //      var regSpot = /./;
            var nowObj = null;
            if (str.search(regId) == 0) {
                tmpStr[0] = str.substr(1, str.search(regSpace) - 1);
                tmpStr[1] = str.substr(str.search(regSpace), str.length);
                if (arguments.length > 1) {
                    nowObj = obj.getElementById(tmpStr[0].toString());
                    getOne(tmpStr[1], nowObj);
                } else {
                    nowObj = document.getElementById(tmpStr[0].toString());
                    getOne(tmpStr[1], nowObj);
                };
            } else {
                finnalObj = obj;
            };
        };
        getOne(str);
        return finnalObj;
        //else if(str == ' ') {
        //          return obj;
        //      };
    },
    //jquery对象转化为dom对象
    toDom: function(obj) {
        if (obj.length == 1) {
            return obj[0];
        } else {
            return obj;
        };
    },
    Animiation: function(obj, tmpJson, tmpFn) {
        clearInterval(obj.ctr);
        obj.ctr = setInterval(function() {
            var ifStop = true;
            for (var x in tmpJson) {
                var tmpValue = 0;
                if (x == 'opacity') {
                    tmpValue = Math.round(parseFloat(joshuaJs.getCss(obj, x)) * 100);
                } else {
                    tmpValue = parseInt(joshuaJs.getCss(obj, x));
                };
                var tmpSpeed = (tmpJson[x] - tmpValue) / 6;
                tmpSpeed = tmpSpeed > 0 ? Math.ceil(tmpSpeed) : Math.floor(tmpSpeed);

                if (tmpValue != tmpJson[x]) { ifStop = false; };
                if (x == 'opacity') {
                    obj.style.opacity = (tmpValue + tmpSpeed) / 100;
                } else { obj.style[x] = tmpValue + tmpSpeed + 'px'; };
                if (ifStop) {
                    clearInterval(obj.ctr);
                    if (tmpFn) { tmpFn() };
                };
            };
        });
    },
    //阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        };
    },
    //阻止浏览器默认事件
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        };
    },
    //获取浏览器信息{'操作系统','浏览器类型','浏览器版本'}
    getBom: function() {
        var BrowserMatch = {
            init: function() {
                this.browser = this.getBrowser().browser || "An Unknown Browser";
                this.version = this.getBrowser().version || "An Unknown Version";
                this.OS = this.getOS() || "An Unknown OS";
            },
            getOS: function() {
                if (navigator.platform.indexOf("Win") != -1) return "Windows";
                if (navigator.platform.indexOf("Mac") != -1) return "Mac";
                if (navigator.platform.indexOf("Linux") != -1) return "Linux";
                if (navigator.userAgent.indexOf("iPhone") != -1) return "iPhone/iPod";
            },
            getBrowser: function() {
                var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
                var rTrident = /(trident)\/([\w.]+)/;
                var rFirefox = /(firefox)\/([\w.]+)/;
                var rOpera = /(opera).+version\/([\w.]+)/;
                var rNewOpera = /(opr)\/(.+)/;
                var rChrome = /(chrome)\/([\w.]+)/;
                var rSafari = /version\/([\w.]+).*(safari)/;
                var ua = navigator.userAgent.toLowerCase();
                var matchBS, matchBS2;
                matchBS = rMsie.exec(ua);
                if (matchBS != null) {
                    matchBS2 = rTrident.exec(ua);
                    if (matchBS2 != null) {
                        switch (matchBS2[2]) {
                            case "4.0":
                                return {
                                    browser: "IE",
                                    version: "8"
                                };
                                break;
                            case "5.0":
                                return {
                                    browser: "IE",
                                    version: "9"
                                };
                                break;
                            case "6.0":
                                return {
                                    browser: "IE",
                                    version: "10"
                                };
                                break;
                            case "7.0":
                                return {
                                    browser: "IE",
                                    version: "11"
                                };
                                break;
                            default:
                                return {
                                    browser: "IE",
                                    version: "Undefined"
                                };
                        }
                    } else {
                        return {
                            browser: "IE",
                            version: matchBS[2] || "0"
                        };
                    }
                }
                matchBS = rFirefox.exec(ua);
                if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                    return {
                        browser: matchBS[1] || "",
                        version: matchBS[2] || "0"
                    };
                }
                matchBS = rOpera.exec(ua);
                if ((matchBS != null) && (!(window.attachEvent))) {
                    return {
                        browser: matchBS[1] || "",
                        version: matchBS[2] || "0"
                    };
                }
                matchBS = rChrome.exec(ua);
                if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
                    matchBS2 = rNewOpera.exec(ua);
                    if (matchBS2 == null) {
                        return {
                            browser: matchBS[1] || "",
                            version: matchBS[2] || "0"
                        };
                    } else {
                        return {
                            browser: "Opera",
                            version: matchBS2[2] || "0"
                        };
                    }
                }
                matchBS = rSafari.exec(ua);
                if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                    return {
                        browser: matchBS[2] || "",
                        version: matchBS[1] || "0"
                    };
                }
            }
        };
        BrowserMatch.init();
        var Bomjson = {};
        return Bomjson = {
            'Os': BrowserMatch.getOS(),
            'Browser': BrowserMatch.getBrowser().browser,
            'Version': BrowserMatch.getBrowser().version
        };
    },
    //键盘事件
    getKeyDowm: function() {
        var keysDown = {};
        var keyDown = function(key) {
            if (key in keysDown) {
                console.log(key);
            };
        };
        addEventListener("keydown", function(e) {
            keysDown[e.keyCode] = true;
            keyDown()
        }, false);
        addEventListener("keyup", function(e) {
            delete keysDown[e.keyCode];
        }, false);
    },
    //获取鼠标按键
    //对于mousedown 和mouseup 事件来说，则在其event 对象存在一个button 属性，
    // 表示按下或释放的按钮。DOM的button 属性可能有如下3 个值：0 表示主鼠标按钮，1 表示中间的鼠
    // 标按钮（鼠标滚轮按钮），2 表示次鼠标按钮。在常规的设置中，主鼠标按钮就是鼠标左键，而次鼠标
    // 按钮就是鼠标右键。
    // IE8 及之前版本也提供了button 属性，但这个属性的值与DOM 的button 属性有很大差异。
    //  0：表示没有按下按钮。
    //  1：表示按下了主鼠标按钮。
    //  2：表示按下了次鼠标按钮。
    //  3：表示同时按下了主、次鼠标按钮。
    //  4：表示按下了中间的鼠标按钮。
    //  5：表示同时按下了主鼠标按钮和中间的鼠标按钮。
    //  6：表示同时按下了次鼠标按钮和中间的鼠标按钮。
    //  7：表示同时按下了三个鼠标按钮。
    getMouseButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            };
        };
    },
    // //能够取得鼠标滚轮增量值（delta）的方法
    // getWheelDelta: function(event) {
    //     if (event.wheelDelta) {
    //         return (client.engine.opera && client.engine.opera < 9.5 ?
    //             -event.wheelDelta : event.wheelDelta);
    //     } else {
    //         return -event.detail * 40; //firefox中的值为+3表示向上滚，-3表示向下滚
    //     };
    // },
    // //跨浏览器的方式取得字符编码
    // getCharCode: function(event) {
    //     if (typeof event.charCode == "number") {
    //         return event.charCode;
    //     } else {
    //         return event.keyCode;
    //     };
    // },
    // //访问剪切板中的数据
    // getClipboardText: function(event){
    //     var clipboardData = (event.clipboardData || window.clipboardData);
    //     return clipboardData.getData("text");
    // },
    // 
    // 监听事件兼容性
    on: function(obj, type, fn) {
        if (obj.attachEventLister) {
            //FF,Chrome,IE9-10
            obj.attachEventLister(type, fn, false);
        } else if (ele.attachEvent) {
            //IE8以下
            obj.attachEvent('on' + type, fn);
        } else {
            //在addEventListener和attachEvent都不存在的情况下，用此代码  
            ele["on" + str] = fn;
        };
    },
    remove: function(obj, type, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn);
        } else if (ele.detachEvent) {
            obj.detachEvent("on" + type, fn);
        } else {
            obj["on" + str] = null;
        };
    },
    //获取、设置文本内容
    // innerHtml: function(obj, str) {
    //     var newStr=str;
    //     if (arguments.length == 1) {
    //         return obj.innerHtml;
    //     } else {
    //         obj.innerHtml = newStr;
    //     };
    // },
    //获取、设置innerText
    innerText: function(obj, str) {
        if (arguments == 1) {
            return (typeof obj.textContent == "string") ? obj.textContent : obj.innerText;
        } else {
            if (typeof obj.textContent == "string") {
                obj.textContent = str;
            } else {
                obj.innerText = str;
            };
        };
    },
    //显示隐藏
    show: function(obj) {
        obj.style.display = 'block';
    },
    hide: function(obj) {
        obj.style.display = 'none';
    },
    //cookie
    //设置cookie
    setCookie: function(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie: function(name) {
        var arr = document.cookie.split(';');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            };
        };
        return '';
    },
    //删除cookie
    delCookie: function(name) {
        setCookie(name, 1, -1);
    },
    //清除对象中值为空的属性
    filterParams: function(obj) {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newParp[key] = obj[key];
            };
        };
        return _newPar;
    },
    //中式金额
    toCHNumber: function(number) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = number < 0 ? '欠人民币:' : '人民币:';
        number = Math.abs(number);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        };
        s = s || '整';
        number = Math.floor(number);
        for (var i = 0; i < unit[0].length && number > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && number > 0; j++) {
                p = digit[number % 10] + unit[1][j] + p;
                number = Math.floor(number / 10);
            };
            s = p + unit[0][i] + s;
        };
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //英式金额
    toEnNumber: function(number) {
        number = number.toString();
        var arr = [],
            arrL = [];
        var str = '';
        arr = number.split('.');
        arrL = arr[0].split('');
        for (var i = 0; i < arrL.length; i++) {
            if (i % 4 == 0 && i != 0) {
                arrL.splice((arrL.length - i + 1), 0, ',')
            };
        };
        for (var i = 0; i < arrL.length; i++) {
            str += arrL[i];
        };
        if (arr[1]) {
            str += '.' + arr[1];
        };
        return str;
    },
    //获取,设置url参数
    getUrlParam: function(url) {
        url = url ? url : window.location.href;
        let _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (let i = 0, _len = _arrS.length; i < _len; i++) {
            let pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            };
            let name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        };
        return _rs;
    },
    setUrlParam: function(obj) {
        let _rs = [];
        for (let p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p])
            };
        };
        return _rs.join('&');
    },
    //随机返回一个范围内的数字
    randomNumber: function(n1, n2) {
        if (arguments.length == 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        } else if (arguments.length == 1) {
            return Math.round(Math.random() * n1);
        } else {
            return Math.round(Math.random() * 255)
        };
    },
    //随进产生颜色
    randomColor: function() {
        //写法1
        return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
        //              //写法2
        //              return '#' + Math.random().toString(16).substring(2).substr(0, 6);
        //              //写法3
        //              var color = '#';
        //              for(var i = 0; i < 6; i++) {
        //                  color += '0123456789abcdef' [this.randomNumber(15)];
        //              }
        //              return color;
    },
    //倒计时
    getEndTime: function(endTime) {
        var startDate = new Date();
        var endDate = new Date(endTime);
        var t = endDate.getTime() - startDate.getTime();
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        };
        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
    },
    //适配rem
    getFontSize: function() {
        var doc = document,
            win = window;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                if (clientWidth > 750) {
                    clientWidth = 750
                };
                //设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            };
        //屏幕大小改变，或者横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    //使用方式很简单，比如效果图上，有张图片。宽高都是100px;
    //样式写法就是
    //          img {
    //              width: 1 rem;
    //              height: 1 rem;
    //          }
    //这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
    //比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;
};