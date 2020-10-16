import store from "../store/index";

export default {
  getCurrentUser: function() {
    return store.getters["login/getCurrentUser"];
  },

  getCurrentOrganization: function() {
    return store.getters["login/getCurrentOrganization"];
  },

  getCurrentOrganizationID: function() {
    /*
    var organizations = store.getters["login/getCurrentOrganizations"];
    if (organizations != null && organizations.length > 0) {
      return organizations[0].organizationID;
    }
    */
    //debugger;
    var organization = this.getCurrentOrganization();
    if (organization == null) return "";
    else return organization.organizationID;

    //return store.getters["login/getOrganizationID"];
  },

  getCurrentOrganizationList: function() {
    return store.getters["login/getCurrentOrganizationList"];
  },

  getCurrentOrganizationListChangedTimes: function() {
    return store.getters["login/getCurrentOrganizationListChangedTimes"];
  },

  setCurrentOrganization: function(value) {
    //debugger;
    var list = this.getCurrentOrganizationList();
    for (var i = 0; i < list.length; i++) {
      if (list[i].organizationID === value) {
        var o = list[i];
        store.commit("login/setCurrentOrganization", o);
        break;
      }
    }
  },

  /**
   * uuid
   */
  getGuid: function() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
    }
    return guid.toUpperCase();
  },

  generateDevEUI(organizationID, index) {
    var totalLength = 16;
    //左边6位
    var leftStr = (Array(6).join("0") + organizationID).slice(-6);
    //中间4位
    var centerStr = new Date().getFullYear();

    //右边6位
    var rightStr = (Array(6).join("0") + index).slice(-6);

    var result = leftStr + "" + centerStr + "" + rightStr;
    return result;
  },

  /**
   * 字符串判空
   * true：为空
   * false：不为空
   */
  isEmpty: function(str) {
    if ("" == str || null == str || undefined == str || "undefined" == str) {
      return true;
    } else {
      return false;
    }
  },

  isBase64: function(str) {
    const notBase64 = /[^A-Z0-9+=]/i;
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
      return false;
    }
    const firstPaddingChar = str.indexOf("=");
    return (
      firstPaddingChar === -1 ||
      firstPaddingChar === len - 1 ||
      (firstPaddingChar === len - 2 && str[len - 1] === "=")
    );

    /*for ie10 or above
    if (str ==='' || str.trim() ===''){ return false; }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
    */
  },

  CharToHex: function(str) {
    var hex, i, h;
    hex = "";
    i = 0;
    while (i < str.length) {
      h = str.charCodeAt(i++).toString(16);
      //hex += "\\0x" + h;
      hex += h;
      //out +=(i > 0 && i % 8 == 0)?"\r\n":", ";
    }
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    return hex;
  },

  //字节数组转十六进制字符串，对负值填坑
  Bytes2HexString: function(arrBytes) {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
      var tmp;
      var num = arrBytes[i];
      if (num < 0) {
        //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
        tmp = (255 + num + 1).toString(16);
      } else {
        tmp = num.toString(16);
      }
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      str += tmp;
    }
    return str;
  },

  base64encode: function(str) {
    var base64EncodeChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xf) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
  },

  base64decode: function(str) {
    var base64DecodeChars = new Array(
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      62,
      -1,
      -1,
      -1,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      -1,
      -1,
      -1,
      -1,
      -1
    );

    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 == -1);
      if (c1 == -1) break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 == -1);
      if (c2 == -1) break;

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == 61) return out;
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1) break;

      out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61) return out;
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1) break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  },

  getBeginTimestamp: function(date) {
    var day = this.formatDate(date, "yyyy-MM-dd");
    day += "T00:00:00Z";
    return day;
  },

  getEndTimestamp: function(date) {
    var day = this.formatDate(date, "yyyy-MM-ddTHH:mm:ssZ");
    //day += "T23:59:59Z";
    var time = this.getNowTime();
    day = day.replace("00:00:00", time);
    return day;
  },

  getDateFromStr: function(dateString) {
    //debugger
    if (dateString) {
      var date = new Date(dateString.replace(/-/, "/"));
      return date;
    }
  },

  getDateTimeFromStr: function(dateString) {
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split("-");
      var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
      return date;
    }
  },

  getNextDate: function(date, day) {
    //debugger
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    return this.formatDate(dd, "yyyy-MM-dd");
  },
  /**
   * 返回date类型的yyyy-mm-dd格式
   */
  getNowDate: function() {
    var d = new Date();
    return this.formatDate(d, "yyyy-MM-dd");

    /*
    var seperator1 = "-";
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1; //月
    var strDate = date.getDate(); //日
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
    */
  },

  getNowDateTime: function() {
    var d = new Date();
    return this.formatDate(d, "yyyy-MM-dd HH:mm:ss");
  },

  getNowTime: function() {
    var d = new Date();
    return this.formatDate(d, "HH:mm:ss");
  },

  /**
   * 日期格式化
   * @param {Object} d
   * @param {Object} formatStr
   */
  formatDate: function(d, formatStr) {
    var str = formatStr;
    var Week = ["日", "一", "二", "三", "四", "五", "六"];

    str = str.replace(/yyyy|YYYY/, d.getFullYear());
    str = str.replace(
      /yy|YY/,
      d.getYear() % 100 > 9
        ? (d.getYear() % 100).toString()
        : "0" + (d.getYear() % 100)
    );
    var dMonth = d.getMonth() + 1;

    str = str.replace(/MM/, dMonth > 9 ? dMonth.toString() : "0" + dMonth);
    str = str.replace(/M/g, dMonth);

    str = str.replace(/w|W/g, Week[d.getDay()]);

    str = str.replace(
      /dd|DD/,
      d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate()
    );
    str = str.replace(/d|D/g, d.getDate());

    str = str.replace(
      /hh|HH/,
      d.getHours() > 9 ? d.getHours().toString() : "0" + d.getHours()
    );
    str = str.replace(/h|H/g, d.getHours());
    str = str.replace(
      /mm/,
      d.getMinutes() > 9 ? d.getMinutes().toString() : "0" + d.getMinutes()
    );
    str = str.replace(/m/g, d.getMinutes());

    str = str.replace(
      /ss|SS/,
      d.getSeconds() > 9 ? d.getSeconds().toString() : "0" + d.getSeconds()
    );
    str = str.replace(/s|S/g, d.getSeconds());

    return str;
  },

  timestamp2LocalDateTime(strTimestamp) {
    if (strTimestamp) {
      var dd = new Date(strTimestamp);
      var tt = new Date(dd.setHours(dd.getHours() - 16));
      return this.formatDate(tt, "yyyy-MM-dd HH:mm:ss");
    } else {
      return "";
    }

    /*
    if (strTimestamp) {
      var arr1 = strTimestamp.split(" ");
      var arr2 = arr1[0].split("T");
      var sdate = arr2[0] + " " + arr2[1];

    }
    */
  }
};
