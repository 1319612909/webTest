var SKIN_PATH = "/Skins/Default/";
function $j(elmId) { return $("#" + elmId); }
function $v(elmId, val) {
    if (val == null) {
        var o = $j(elmId).attr("value");
        if (o == null || o == undefined) {
            return "";
        }
        return o;
    } else {
        return $j(elmId).attr("value", val);
    }
}
function $tv(elmId) { return $.trim($v(elmId)); };
function getChecked(elmId) { return $("#" + elmId).attr("checked"); };
 
$(function () {
    //var _url = location.href.toLowerCase();
    //if (_url.indexOf("http://www") == -1) {
    //    _url = _url.replace("http://", "http://www.");
    //    window.location.href = _url;
    //}
    browserRedirect();
    //initCommonHeader();
//    $(".top_list .weixin").hover(function () {
//        $('.block1000 .code').css({ visibility: "visible", display: "none" }).slideDown("normal");
//    }, function () {
//        $('.block1000 .code').css({ visibility: "hidden" });
//    });

    muneCur2();
    // initCommonHeaderKeywords(MARK);
    action();
})


//判断手机访问pc推广页面的时候跳转到手机页面，如果没有开启手机就不访问pc页面
function browserRedirect() {
    var system ={  
    win : false,  
    mac : false,  
    xll : false  
    };  
    var p = navigator.platform;  
    system.win = p.indexOf("Win") == 0;  
    system.mac = p.indexOf("Mac") == 0;  
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);  
    if(system.win||system.mac||system.xll){  
        //alert("pc");  
    }else{  
        window.location.href="/mobile";  
    }   
     
}



function action() {
    $(document.body).append("<div id=\"roll\" style='display:none;'><div title=\"回到顶部\" id=\"roll_top\"></div></div>");
    $('#roll_top').click(function () {
        $('html,body').animate({ scrollTop: '0px' }, 800)
    });
    $('#ct').click(function () {
        $('html,body').animate({ scrollTop: $('.ct').offset().top }, 800)
    });
    $(window).scroll(function (event) { 
       
        if ($(this).scrollTop() > 260) {
            $('#roll').show()
        } else {
            $('#roll').hide()
        }
         
    })
}



function $j(elmId) { return $("#" + elmId); }
function gav(xMsg, key) {
    var jMsg = $(xMsg);
    var s = $(jMsg.find("node[key=" + key + "]")).text();
    return s;
}
function checkAll(src, cntrId) {
    var chks = $j(cntrId).find("input[type=checkbox]");
    chks.each(function (i) {
        this.checked = src.checked;
    });
}
/********************
* 限制文本框只能输入数字
* src : 触发事件的源元素
* 使用方法如 <input onkeyup="digiOnly(this)" />
********************/
function digiOnly(src) {
    src.value = src.value.replace(/[^0-9]/g, '');
}
function JianNum(id) {
    var num = $("#num" + id).val();
    if (num > 1) {
        $("#num" + id).val(parseInt(num) - 1);
    }
    else {
        //alert("不能为0");
    }
}
function AddNum(id) {
    var num = $("#num" + id).val();

    if (num > 0) {

        $("#num" + id).val(parseInt(num) + 1);
    }

}


var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//首页发送留言
function SendLiuyan(src) {

    var stxtContact = $j("txtContact").val();  
    var stxtMobileNo = $j("txtMobile").val();  
    var stxtEmail = $j("txtEmails").val();  
    var stxtContent = $j("txtContent").val(); 
    var err = "";

    var reg = /^\s*$/;
    if (reg.test(stxtContact)) {
        err += "姓名不可为空";
        $a(err);
        return false;
    }
   
    if (reg.test(stxtMobileNo) ) {
        err += "手机不可为空";
        $a(err);
        return false;
         
    }
    else {
        var ptns = /^\d{11,13}$/;
        var Mobile = /^((13|14|15|18)+\d{9})$/;

        if (!ptns.test(stxtMobileNo) || !Mobile.test(stxtMobileNo)) {
            err += "手机格式错误";
           $a(err);
            return false; 
        }
    }
    if (reg.test(stxtEmail) ) {
        err += "邮箱不可为空";
        $a(err);
        return false;  
    }
     else {
        if (!PTN_EMAIL.test(stxtEmail)) {
            err += "邮箱格式错误";
            $a(err);
            return false;  
        }
    }
     if (reg.test(stxtContent) ) {
        err += "留言不可为空";
        $a(err);
        return false;
         
    }
    
    $.post("/ajax.ashx?action=SendLiuyan&t=" + Math.random(), {

        contact: stxtContact,  
        mobileNo: stxtMobileNo,
        content: stxtContent,
        email: stxtEmail

    }, function (msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            emptyText('ly');
            $a(sMsg, 1);

        } else {
            
            $a(sMsg);
        }
    });

}


/********************
* 搜索订单
********************/
function searchOrder() {
    var orderNo = $("#txOrderNo").val();
    var startDate = $("#txtStartDate").val();
    var endDate = $("#txtEndDate").val();
    var orderState = $("#ddlOrderStates").val();
    var orderType = $("#ulOrderTypeTabs").find(".cur").attr("ordertype");
    if (orderNo.length == 0 && startDate.length == 0 && endDate.length == 0 && orderState.length == 0) {
        $a("至少需要一个查询条件。");
        return;
    }
    var flag = false;
    var url = "orderlist.aspx?";
    if (orderNo.length > 0) {
        url += "no=" + orderNo;
        flag = true;
    }
    if (startDate.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "start=" + startDate;
        flag = true;
    }
    if (endDate.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "end=" + endDate;
        flag = true;
    }
    if (orderState.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "state=" + orderState;
        flag = true;
    }
    if (orderType != undefined && orderType.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "type=" + orderType;
        flag = true;
    }
    location.href = url;
}

function addToCart(src, _pid, qutiElmId, _atts, _pidlist, reloadCartPage, redirectUrl) {
    showProc(src);

    if (reloadCartPage == null) {
        reloadCartPage = false;
    }
    _atts = $j(_atts).html();
    _pidlist = $j(_pidlist).val();

    var _quti = $("#num" + _pid).val();

    if (_pidlist == null) {
        _pidlist = "";
    }
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: _quti,
        atts: _atts,
        pidlist: _pidlist,
        type: ""
    }, function (msg) {
        var sMsg = gav(msg, "msg");
        var sCount = gav(msg, "count");
        var sta = gav(msg, "state");
        if (redirectUrl != null) {
            location.href = redirectUrl;
            return;
        }
        if (sta == "2") {
            $a2(sMsg);
            showProc(src, false);
            return;
        }
        if (sta != "1") {
            $a(sMsg);
            showProc(src, false);
            return;
        }
        $confirm(sMsg, { title: "去结算", toDo: "/paycenter/cart.aspx" }, { title: "再选购", toDo: function () {
            hideConfirm();
        }
        });
        $j("headerCartCount").html(sCount);
        if (reloadCartPage && (gav(msg, "state") == 1) && confirm("添加到购物车成功，是否马上刷新页面购物车页面？\r\n\r\n是 - 刷新本页面查看最新结果\r\n否 - 保留当前页面状态")) {
            location.href = "cart.aspx?t=" + Math.random();
            return;
        }
        showProc(src, false);
    });
}
function emptyCart(src) {
    showBgProc();
    $.get("/ajax.ashx?action=emptycart&t=" + Math.random(), function(msg) {
        if (msg == "1") {
            $a("清空购物车成功，单击确认返回产品中心。", 1, false, null, "消息", function() {
                location.href = "/product/";
            });
        } else {
            $a("清空购物车失败，请稍候重试。");
        }
        showBgProc(false);
    });
}

function delCartProduct(src, _pid, _atts) {
    showBgProc();
    var _quti = 0;
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: 0,
        atts: _atts,
        pidlist: "",
        type: "update"
    }, function (msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("商品已删除，是否马上刷新页面查看结果？\n\n\r\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            }
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}


function altRow(escapeRows, tabName, odd, even) {
    var rows = $tag(tabName, "tr");
    for (var i = escapeRows; i < rows.length; ++i) {
        var argSty;
        if (i % 2 == 0) argSty = even;
        else argSty = odd;
        if (typeof (argSty) == "object") {
            for (var sty in argSty) {
                rows[i].style[sty] = argSty[sty];
            }
        } else {
            rows[i].className = argSty;
        }
    }
}

function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object) { o = $g(cntr); }
    return o.getElementsByTagName(tagName);
}
function $g(elmId) { return document.getElementById(elmId); };

/********************
* 隐藏消息提示层
********************/
function hideConfirm() {
    showDdl();
    var jShadow = $j("mesbook1_c");
    hideFullBg();
    jShadow.fadeOut(80);
}


/********************
* 提示选择对话框
* msg : 消息内容（必传递参数）
* obj : 对话框属性
********************/
function $confirm(sMsg, yesObj, noObj) {
    hideDdl();
    var sTitle = "消息对话框";
    var jMesbook1 = $j("mesbook1_c");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1_c'>"
				+ "<div><img onclick='hideMsg()' id='mesbook1_cImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam' /><span id='mesbook1_cTitle'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1_cIcon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title=''  /></dt>"
					+ "<dd class='l_25' id='mesbook1_cMsg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1_cAutoClose'>此窗口<span id='mesbook1_cDelay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>"
					+ "<dd id='mesbook1_cBtns'>"
						+ "<input type='button' class='b15' value='确 定' />"
						+ "<input type='button' class='b15' value='取 消' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1_c");
    var jMesbook1ImgClose = $j("mesbook1_cImgClose");
    var jMesbook1Icon = $j("mesbook1_cIcon");
    var jMesbook1Msg = $j("mesbook1_cMsg");
    var jMesbook1AutoClose = $j("mesbook1_cAutoClose");
    var jMesbook1Delay = $j("mesbook1_cDelay");
    var jMesbook1Title = $j("mesbook1_cTitle");
    var jMesbook1Btns = $j("mesbook1_cBtns");

    jMesbook1Title.html(sTitle);
    //消息内容
    jMesbook1Msg.html(sMsg);
    //图标
    var iconPath = SKIN_PATH + "Img/ico_ques.gif";
    jMesbook1Icon.attr("src", iconPath);

    //关闭按钮
    var yesBtn = jMesbook1Btns.find("input:eq(0)");
    var noBtn = jMesbook1Btns.find("input:eq(1)");
    yesBtn.removeAttr("onclick");
    noBtn.removeAttr("onclick");
    //yes
    if (yesObj.title != null) {
        yesBtn.val(yesObj.title);
    }
    if (typeof (yesObj.toDo) == "string") {
        yesBtn.click(function () {
            location.href = yesObj.toDo;
        });
    } else {
        yesBtn.click(function () {
            yesObj.toDo();
        })
    }
    //no
    if (noObj.title != null) {
        noBtn.val(noObj.title);
    }

    if (typeof (noObj.toDo) == "string") {
        noBtn.click(function () {
            location.href = noObj.toDo;
        });
    } else {
        noBtn.click(function () {
            noObj.toDo();
        })
    }
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function () {
        hideConfirm();
    });

    //显示
    showFullBg();
    setCM("mesbook1_c");
    relocation("mesbook1_c");
    jMesbook1.fadeIn(80);
}


function $a2(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    if (boxType == null) {
        boxType = 2;
    }
    if (autoClose == null) {
        autoClose = -1;
    }
    //标题
    if (sTitle == null) {
        sTitle = "消息提示";
    }

    hideDdl();
    var jMesbook1 = $j("mesbook1s");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1s'>"
+ "<div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>"
+ "<dl class='b1'>"
+ "<div class=\"login_dl_left mt10\" id='tbForm'>"
+ "<div class=\"lefttit\">"
+ "<span class=\"sp_1\">提示：</span>请直接输入<span>用户名</span>和<span>密码</span>进行登录</div>"
+ "<div class=\"leftinfo\">"
+ "<table class=\"login_tab\">"
+ "<tbody><tr>"
+ "<td width=\"72\" height=\"24\" class=\"tr\">用户名：</td>"
+ "<td width=\"203\">"
+ "<input type=\"text\"  class=\"txtboxcs\" id=\"txtEmail\" maxlength=\"16\" name=\"txtEmail\">"

+ "</td>"
+ "</tr>"
+ "<tr>"
+ "<td height=\"27\" class=\"tr\">密 码："
+ "</td>"
+ "<td>"
+ "<input type=\"password\" class=\"txtboxcs\" id=\"txtPin\" name=\"txtPin\">"

+ "</td>"
+ "</tr>"
+ "<td>"
+ "</td>"
+ "<td>"
+ "<input type=\"submit\" class=\"b f14 cWhite b17\" id=\"btnSubmit\" onclick=\"LoginUser(this)\" value=\"登录\" name=\"btnSubmit\">"
+ "<input type=\"button\" onclick=\"emptyText('tbForm')\" value=\"重填\" class=\"b f14 cWhite b18\">"
+ "</td>"
+ "</tr>"
+ "<tr>"
+ "<td>"
+ "</td>"
+ "<td>"
+ "[ <a href=\"/user/GetPassword.aspx\">忘记密码？</a> ]<br>"
+ "[ <a href=\"/user/register.aspx\">没有帐号？</a> ]"
+ "</td>"
+ "</tr>"
+ "</tbody></table>"
+ "</div>"
+ "</div>"
+ "</dl>"
+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1");
    var jMesbook1ImgClose = $j("mesbook1ImgClose");
    var jMesbook1Icon = $j("mesbook1Icon");
    var jMesbook1Msg = $j("mesbook1Msg");
    var jMesbook1AutoClose = $j("mesbook1AutoClose");
    var jMesbook1Delay = $j("mesbook1Delay");
    var jMesbook1Title = $j("mesbook1Title");
    var jMesbook1Btns = $j("mesbook1Btns");

    jMesbook1Title.html(sTitle);
    //消息内容
    jMesbook1Msg.html(sMsg);
    //图标
    var iconPath = SKIN_PATH + "Img/";
    switch (boxType) {
        case 1: iconPath += "ico_ok.gif"; break;
        case 2: iconPath += "ico_info.gif"; break;
        case 3: iconPath += "ioc_ques.gif"; break;
        case -1: iconPath += "ico_error.gif"; break;
        default: iconPath += "ico_normal.gif"; break;
    }
    jMesbook1Icon.attr("src", iconPath);

    //关闭按钮
    var okBtn = jMesbook1Btns.find("input");
    okBtn.removeAttr("onclick");
    okBtn.click(function () {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function () {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    okBtn.focus();

    //显示
    showFullBg();
    setCM("mesbook1s");
    relocation("mesbook1s");
    jMesbook1.fadeIn(80);
}

function LoginUser(src) {
    var url = window.location.href;
    var username = $j("txtEmail").val();
    var userpwd = $j("txtPin").val();
    var err = "";

    var reg = /^\s*$/;
    if (reg.test(username)) {
        alert("用户名不可为空");
        return;
    }
    if (reg.test(userpwd)) {
        alert("密码不可为空");
        return;
    }
    $.post("/ajax.ashx?action=LoginUser&t=" + Math.random(), {

        username: username,
        userpwd: userpwd

    }, function (msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            hideMsg();
            emptyText('tbForm');
            setTimeout("window.location='" + url + "'", 1000);
            //$a(sMsg, 1);

        } else {
            alert(sMsg);
        }
    });
}

function changeQuantity(src, _pid, _attrs) {

    var newVal = $(src).parent().find("input").val();
    if (!/^\d+$/.test(newVal)) {
        $a("数量必须是一个整数。");
        return;
    }
    if (parseInt(newVal) == 0) {
        $a("数量必须大于0，若要删商品，请点操作中的‘删除’。");
        return;
    }
    showBgProc();


    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: newVal,
        atts: _attrs,
        pidlist: "",
        type:"update"
    }, function (msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("数量修改成功，是否马上刷新页面查看购物车结果？\n\n是 - 刷新页面查看结果\n否 - 保留当前页面状态")) {
                location.href = "cart.aspx?t=" + Math.random();
            } else {
                showBgProc(false);
                //$(src).hide();
            }
        } else {
            $a(msg);
            showBgProc(false);
        }
    });
}


function delFav(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("无选中项。");
        return;
    }

    showProc();
    $.post("/ajax.ashx?action=delfav&t=" + Math.random(), {
        ids: _ids
    }, function (msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function (i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showProc(false);
    });
}

function getCheckedVal(cntrId, escapeRows) {
    if (escapeRows == null) {
        escapeRows = -1;
    }
    var chks = $j(cntrId).find("input:checked");
    var rtnVal = "";
    var flag = false;
    chks.each(function (i) {
        if (i > escapeRows) {
            if (flag) {
                rtnVal += ",";
            }
            rtnVal += $(this).val();
            flag = true;
        }
    });
    return rtnVal;
}
/********************
* 保存用户名
********************/
function keepUsername(keep, emailElmId) {
    var sName = $j(emailElmId).attr("value");
    if (keep != null && sName != undefined) {
        if (keep) { $cookie("__oran__k_username", sName, 99999999999) }
        else { $cookie("__oran__k_username", false) };
        return;
    }
    if (!$j("chkKeep").attr("checked")) { return };
    if (sName != undefined) { $cookie("__oran__k_username", sName, 99999999999) };
}
function checkRadio(val, cntrId) {
    var rdos;
    if (cntrId == null) {
        rdos = $(document.body).find("input[type=radio]");
    } else {
        rdos = $j(cntrId).find("input[type=radio]");
    }
    rdos.each(function (i) {
        var jT = $(this);
        jT.attr("checked", jT.attr("value") == val);
    });
}


function cancelOrder(src, _orderNo) {
    showBgProc();
    $.post("/ajax.ashx?action=cancelorder&t=" + Math.random(), {
        no: _orderNo
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $(src).parent().parent().parent().find("td[name=orderstate]").html("已取消");
            $(src).hide();
        } else {
            $a("<p>取消订单操作失败。</p><p>非‘待审核’状态、已锁定等订单不可取消。</p>");
        }
        showBgProc(false);
    });
}

//填加友情连接
function AddApply(src) {
    var s_Type = document.getElementById("TxtType").selectedIndex;
    var s_Url = $("#TxtUrl").val();
    var s_Name = $("#TxtName").val();
    var s_PhotoPath = $("#imgPhotoPath_txt").val();
    var s_Content = $("#TxtMsg").val();
    var s_UserName = $("#TxtUserName").val();
    var s_Phone = $("#TxtTel").val();
    var s_Email = $("#TxtEmail").val();
    var s_QQ = $("#TxtQQ").val();

    if (s_Url == "" || s_Url == "http://") {
        $a("请输入网址！", "TxtUrl");
        return;
    }
    if (s_Name == "") {
        $a("请输入网站名称！", "TxtName");
        return;
    }
    if (s_Content.length > 400) {
        $a("网站简况不能大于400字！", "txtUsername");
        return;
    }
    
    $.post("/ajax.ashx?action=apply&t=" + Math.random(), {
        Type: s_Type,
        Url: s_Url,
        Name: s_Name,
        PhotoPath: s_PhotoPath,
        Content: s_Content,
        UserName: s_UserName,
        Phone: s_Phone,
        Email: s_Email,
        QQ: s_QQ
    },
       function (msg) {
           if (gav(msg, "state") == "1") {
               emptyText('tbForm');
               $a(gav(msg, "msg"));

           }
           else {
               $a(gav(msg, "msg"));
           }
           ;
       });
}
function SearchObjectByGet() {
    var key = $("#seachkeywords").val();
    if(key=="请输入产品名称搜索")
    {
        key="";
    }
    window.location.href = "/Search/index.aspx?1=1&objtype=product&kwd=" + key + "";
}

function productLoad() {
    initImages(ProductID);
    productSelectCurrentPosition(SID);
    hits(ProductID, "product");
    writeComment(ProductID, MARK);
    getRecommentProductByHistory(ProductID);
}

function productSelectCurrentPosition(sid) {
    if(sid.length>9)
     {
        $(".cplb .cpzl li[sid='" + sid.substring(0,9) + "']").addClass("cur"); 
        $(".cpfl ul li[sid='" + sid + "']").addClass("cur"); 
     }
     $(".cplb .cpzl li[sid='" + sid + "']").addClass("cur"); 
}

function projectLoad()
{ 
    projectSelectCurrentPosition(SID);
    getRecommentProjectByHistory();
}
function projectSelectCurrentPosition(sid) {
    $(".leib2 .nr dt[sid='" + sid + "']").addClass("cur");
    $(".leib2 .nr dd a[sid='" + sid + "']").addClass("cur");
}

function newsSelectCurrentPosition(sid) {
     if(sid.length>9)
     {
        $(".cplb .cpzl li[sid='" + sid.substring(0,9) + "']").addClass("cur"); 
        $(".cpfl ul li[sid='" + sid + "']").addClass("cur"); 
     }
     $(".cplb .cpzl li[sid='" + sid + "']").addClass("cur"); 
}
function helpSelectCurrentPosition() {
 
    $(".cplb .cpzl li[sid='" + OBJ_ID + "']").addClass("cur"); 
}
function getRecommentProjectByHistory() {
    $.post("/ajax.ashx?action=GetRecommentProjectByHistory&t=" + Math.random(), {
    }, function (msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

function helpLoad() {
    helpSelectCurrentPosition(SID);
}
function newsLoad() {
    hits(OBJ_ID, MARK);
    newsSelectCurrentPosition(SID);
    writeComment(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK)
    getNewProduct();

}
function getRecommentProductByHistory(_oid) {
    $.post("/ajax.ashx?action=GetRecommentProductByHistory&t=" + Math.random(), {
        oid: _oid
    }, function (msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}
function initImages(oid) {
    var fmt = "<li {$co$}><a href=\"{$path$}\" target=\"_blank\" title=\"{$title$}\"><img title=\"{$title$}\" alt=\"{$title$}\" longdesc=\"{$path$}\" src=\"{$path$}\"  width=\"60\" height=\"60\"></a></li>";
    var oHtml = "";
    for (var i = 0; i < ARR_IMG_PATH.length; ++i) {
        if (i == 0) {
            oHtml = fmt.replace(/\{\$co\$\}/ig, "class='now'").replace(/\{\$path\$\}/ig, ARR_IMG_PATH[i]).replace(/\{\$title\$\}/ig, OBJ_TITLE);
        }
        else {
            oHtml += fmt.replace(/\{\$co\$\}/ig, "").replace(/\{\$path\$\}/ig, ARR_IMG_PATH[i]).replace(/\{\$title\$\}/ig, OBJ_TITLE);
        }
    }
    $("#img_list").html(oHtml);
}

function getHits(_oid, _mark) {
    $.post("/ajax.ashx?action=gethits", {
        mark: _mark,
        oid: _oid
    }, function (msg) {
        $j("cntrHits").html(msg);
    });
}

function hits(_oid, _mark) {
    $.post("/ajax.ashx?action=hits&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    })
}




function postComment(src, _oid, _mark) {
    var reg = /^\s*$/;
    showProc(src);
    var _content = $("#txtCmtContent").val();
    var _verCode = $("#txtCmtVerCode").val();
    if (reg.test(_content)) {
        $a("内容必填。");
        showProc(src, false);
        return;
    }
    if (reg.test(_verCode)) {
        $a("验证码不可空。");
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=postcomment&t=" + Math.random(), {
        content: _content,
        oid: _oid,
        verCode: _verCode,
        mark: _mark
    }, function (msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");

        if (sta == "") {

            $a(msg, -1);
            document.getElementById('imgVali').src = '/Tools/ValidCodes.aspx?' + new Date().getTime();
        } else if (sta == "2") {
            $a(sMsg, 1);
            emptyText('tbCmt');
        } else if (sta == "1") {
            var sTime = gav(msg, "time");
            var sUserface = gav(msg, "title");
            var sUsername = gav(msg, "username");
            var sIp = gav(msg, "ip");
            var sComment = gav(msg, "comment");
            var sfeedback = gav(msg, "feedback") == "" ? "暂无回复" : gav(msg, "feedback");
            var num = gav(msg, "num");

            var htmlFmt = "<div class=\"comment-user\"><img src=\"{$userface$}\"><span>{$username$}</span></div>"
						+ "<div class=\"comment-detail\"><b class=\"contentbox-arrow\"></b><h4><span class=\"n-buylog\">IP：{$ip$}</span><span class=\"n-datetime fr\"> 时间：{$time$}</span></h4>"
                        + "<div class=\"comment-content\">{$content$}<div class=\"comment2\"><b class=\"contentbox-arrow\"></b><span>管理员回复：</span>{$feedback$}</div></div></div>";
            var sHtml = htmlFmt
                .replace("{$userface$}", sUserface)
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$feedback$}", sfeedback)
                .replace("{$content$}", sComment);
            var oldComments = $j("divComments").html();
            if (oldComments == "暂无评论") {
                oldComments = "";
            }
            $j("divComments").html(sHtml + oldComments);
            $j("spCommentCount").html(num);
            $a(sMsg, 1);
            $("#nodata").hide();
            emptyText('tbCmt')

        } else {

            $a(sMsg);

        }
        showProc(src, false);
    });
}


function writeComment(_oid, _mark) {
    $.post("/ajax.ashx?action=getcomment&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    }, function (msg) {
        var iCount = $(msg).find("count").text();
        $j("spCommentCount").html(iCount);
        var commtns = $(msg).find("comment");
        var sHtml = "";
        var htmlFmt = "<div class=\"comment-user\"><img src=\"{$userface$}\"><span>{$username$}</span></div>"
						+ "<div class=\"comment-detail\"><b class=\"contentbox-arrow\"></b><h4><span class=\"n-buylog\">IP：{$ip$}</span><span class=\"n-datetime fr\"> 时间：{$time$}</span></h4>"
                        + "<div class=\"comment-content\">{$content$}<div class=\"comment2\"><b class=\"contentbox-arrow\"></b><span>管理员回复：</span>{$feedback$}</div></div></div>";
        for (var i = 0; i < commtns.length; ++i) {
            var jCmt = $(commtns[i]);

            var sUserface = jCmt.find("title").text();
            var sUsername = jCmt.find("username").text();
            var sContent = jCmt.find("content").text();
            var sIp = jCmt.find("ip").text();
            var sTime = jCmt.find("inputTime").text();
            var sfeedback = jCmt.find("feedback").text();
            sHtml += htmlFmt
                .replace("{$userface$}", sUserface)
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$content$}", sContent)
                 .replace("{$feedback$}", sfeedback);
        }
        if (sHtml.length > 0) {
            $("#nodata").hide();
            $j("divComments").html(sHtml);
        } else {
            $j("divComments").html("<div id=\"nodata\">还在等什么，赶紧来评论！</div>");
        }
    });
}


var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
function submitOrder(src, _oid) {
    var reg = /^\s*$/;
    showProc(src);
    var _contact = $j("txtContact").val();
    var _mobile = $j("txtMobile").val();
    var _email = $j("txtEmail").val();
    var _content = $j("txtContent").val();
    var _verCode = $j("txtVerCode").val();
    var errorMsg = "";
    if (reg.test(_contact)) {
        errorMsg += "<p>联系人不可为空</p>";
    }
    if (reg.test(_mobile)) {
        errorMsg += "<p>手机不可为空</p>";
    }
    else {
        var ptns = /^\d{11,13}$/;
        var Mobile = /^((13|14|15|18)+\d{9})$/;

        if (!ptns.test(_mobile) || !Mobile.test(_mobile)) {
            errorMsg += "<p>手机格式错误</p>";
        }
    }
    if (!reg.test(_email)) {
        if (!PTN_EMAIL.test(_email)) {
            errorMsg += "<p>电子邮箱格式错误</p>";
        }
    }

    if (reg.test(_verCode)) {
        errorMsg += "<p>验证码不可为空</p>";
    }
    if (errorMsg.length > 0) {
        $a(errorMsg);
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=submitorder&t=" + Math.random(), {
        oid: _oid,
        contact: _contact,
        mobile: _mobile,
        email: _email,
        verCode: _verCode,
        content: _content
    }, function (msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
            emptyText('tbForm1');
            document.getElementById("txtVerCode").src = '/Tools/ValidCodes.aspx?' + new Date().getTime();
        } else {
            $a(sMsg);
            if ($.trim(sMsg).indexOf("验证码错误") != -1) {
                document.getElementById("txtVerCode").src = '/Tools/ValidCodes.aspx?' + new Date().getTime();
            } else {
                emptyText('tbForm1');
            }
        }
    });
    showProc(src, false);
}

function ChangeFontSize(src, size) {
    $(src).addClass("cur").siblings("a").removeClass("cur");
    $j('cntrBody').css('font-size', size).find("*").css('font-size', size);
}

//获取新闻详细页面的最新产品
function getNewProduct() {
    $.post("/ajax.ashx?action=getnewproduct&t=" + Math.random(), function (msg) {
        $("#newpro").html(msg);
        $("#newpro h5").mouseover(function () {
            $(this).addClass("cur").siblings("h5").removeClass("cur").end().next("dl").show().siblings("dl").hide();
        }).eq(0).trigger("mouseover");
    });
}

//初始化头部热门关键词
// function initCommonHeaderKeywords(_s) {
//     if (_s == "") _s = "6";
//     $.post("/ajax.ashx?action=initcommonheaderkeywords&t=" + Math.random(), {
//         s: _s
//     }, function (msg) {
//         $j("commonHeaderkeywords").html(msg);
//     });
// }
//导航菜单选中
function muneCur2() {
    var lis2 = $(".nav").find("li .erj");
    var htmlName =location.pathname;// location.href.toLowerCase();

    if (htmlName.indexOf("-") > 0) {
        htmlName =location.pathname.substring(0, location.pathname.indexOf("-"));// htmlName.substring(0, htmlName.indexOf("-"));
    }
    var lis = $(".nav").find("li");
    var href = "";
    $(".nav ul").find("li:first").addClass("cur");
    //$(".h_nav ul").find("li:last").addClass("last");
    for (var i = 0; i < lis.length; ++i) {
    
        href = $(lis[i]).find("a").attr("href").toLowerCase();

        $(".nav  li").removeClass("cur");
        $(".nav  li a").removeClass("cur");
         
        if (href == htmlName) { 
            $(lis[i]).addClass("cur"); //nobor01
            return;
        }
        else {
            $(lis[0]).addClass("cur"); //nobor01

        }
    }
}


function showVerifyCode(elmId, msgElmId, imgId, chgLnkId) {
    if (elmId == null) {
        elmId = "spVerCode";
    }
    if (msgElmId == null) {
        msgElmId = "spVerCodeMsg";
    }
    if (imgId == null) {
        imgId = "imgVerCode";
    }
    if (chgLnkId == null) {
        chgLnkId = "spChgVerCode";
    }
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    var jChgLnk = $j(chgLnkId);
    if (jImg.html() == "") {
        jMsg.html("正在加载验证码...");
        jMsg.show();
        jImg.html("<img src='/Tools/ValidCode.aspx' style='display:none;' id='" + imgId + "' alt='验证码' />");
    }
    var jVerCode = $j(imgId);
    jVerCode.load(function () {
        jMsg.hide();
        jVerCode.show();
        jChgLnk.show();
    });
}

function initCommonHeader() {
    $.get("/ajax.ashx?action=initcommonheader&t=" + Math.random(), function (rsp) {
        var username = gav(rsp, "username");
        if (username.length > 0) {
            $j("commonHeaderGuest").hide();
            $j("commonHeaderUsername").html(username);
            $j("commonHeaderUser").fadeIn(80);
        }
    });
}




var isIE = /msie/i.test(navigator.userAgent);
function gID(id) {
    return document.getElementById(id)
};
function ScrollDiv(id, pScrollY) {
    var ScrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (pScrollY == null) {
        pScrollY = 0
    };
    var moveTop = .1 * (ScrollY - pScrollY);
    moveTop = (moveTop > 0) ? Math.ceil(moveTop) : Math.floor(moveTop);
    gID(id).style.top = parseInt(gID(id).style.top) + moveTop + "px";
    pScrollY = pScrollY + moveTop;
    setTimeout("ScrollDiv('" + id + "'," + pScrollY + ");", 50);
};
function addObjEvent(obj, eventName, eventFunc) {
    if (obj.attachEvent) {
        obj.attachEvent(eventName, eventFunc)
    }
    else if (obj.addEventListener) {
        var eventName2 = eventName.toString().replace(/on(.*)/i, '$1');
        obj.addEventListener(eventName2, eventFunc, false);
    }
    else { obj[eventName] = eventFunc }
};
function delObjEvent(obj, eventName, eventFunc) {
    if (obj.detachEvent) {
        obj.detachEvent(eventName, eventFunc)
    }
    else if (obj.removeEventListener) {
        var eventName2 = eventName.toString().replace(/on(.*)/i, '$1');
        obj.removeEventListener(eventName2, eventFunc, false);
    }
    else {
        obj[eventName] = null
    }
};




function MoveDiv(obj, e) {
    e = e || window.event;
    var ie6 = isIE;
    if (/msie 9/i.test(navigator.userAgent)) {
        ie6 = false
    };
    if (ie6 && e.button == 1 || !ie6 && e.button == 0) { }
    else {
        return false
    };
    obj.style.position = 'absolute';
    obj.ondragstart = function () { return false };
    var x = e.screenX - obj.offsetLeft;
    var y = e.screenY - obj.offsetTop;
    addObjEvent(document, 'onmousemove', moving);
    addObjEvent(document, 'onmouseup', endMov);
    e.cancelBubble = true;
    if (isIE) {
        obj.setCapture();
    }
    else { window.captureEvents(Event.mousemove); };
    if (e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
    };
    e.returnValue = false;
    return false;
    function moving(e) {
        obj.style.left = (e.screenX - x) + 'px';
        obj.style.top = (e.screenY - y) + 'px';
        return false;
    };
    function endMov(e) {
        delObjEvent(document, 'onmousemove', moving);
        delObjEvent(document, 'onmouseup', arguments.callee);
        if (isIE) {
            obj.releaseCapture();
        }
        else {
            window.releaseEvents(Event.mousemove);
        }
    }
};
jQuery(function () {
    $(".close_QQ").click(function () {
        $(".serviceL").hide();
        $(".qq_small").show()
    });
    $(".qq_small").hover(function () {
        $(".serviceL").show();
        $(".qq_small").hide()
    })
});


$(function () {
    function kefuDivPosition() {
        if ($("#KeFuDiv").length > 0) {
            gID("KeFuDiv").style.top = (document.documentElement.clientHeight - gID("KeFuDiv").offsetHeight - 200) / 2 + "px";
            //gID("KeFuDiv").style.left = document.documentElement.clientWidth - gID("KeFuDiv").offsetWidth - 20 + "px"
        }
    };
    $(window).resize(function () {
        kefuDivPosition()
    });
    if ($("#KeFuDiv").length > 0) {
        //kefuDivPosition();
        //ScrollDiv('KeFuDiv')
    };
    $(".qqlist").hover(function () {

        $(this).find(".c2").hide();
        $(this).stop(true, true).find(".kfQQ").show()
    },
       function () {
           $(this).find(".c2").show();
           $(this).stop(true, true).find(".kfQQ").hide()
       });
    $(".gotop").click(function () {
        $('html,body').animate({ scrollTop: '0px' }, 800)
    });
    $("#KeFuDiv .c1").click(function () {
        $('#iconDivMain1 div').eq(1).click()
    })
});

function showProc(src, show) {
    var oImg = $j("imgProc");
    if (show == null) {
        show = true;
    }
    if (show) {
        $(src).hide();
        if (oImg.length > 0) {
            oImg.remove();
        }
        $("<img src='" + SKIN_PATH + "img/processing.gif' id='imgProc' alt='正在处理' />").insertAfter(src);
    } else {
        $(src).show();
        oImg.remove();
    }
}
function $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    if (boxType == null) {
        boxType = 2;
    }
    if (autoClose == null) {
        autoClose = -1;
    }
    //标题
    if (sTitle == null) {
        sTitle = "消息提示";
    }

    hideDdl();
    var jMesbook1 = $j("mesbook1");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1'>"
				+ "<div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1Icon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title='' /></dt>"
					+ "<dd class='l_25' id='mesbook1Msg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1AutoClose'>此窗口<span id='mesbook1Delay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>"
					+ "<dd id='mesbook1Btns'>"
						+ "<input type='button' class='b15' value='关 闭' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1");
    var jMesbook1ImgClose = $j("mesbook1ImgClose");
    var jMesbook1Icon = $j("mesbook1Icon");
    var jMesbook1Msg = $j("mesbook1Msg");
    var jMesbook1AutoClose = $j("mesbook1AutoClose");
    var jMesbook1Delay = $j("mesbook1Delay");
    var jMesbook1Title = $j("mesbook1Title");
    var jMesbook1Btns = $j("mesbook1Btns");

    jMesbook1Title.html(sTitle);
    //消息内容
    jMesbook1Msg.html(sMsg);
    //图标
    var iconPath = SKIN_PATH + "Img/";
    switch (boxType) {
        case 1: iconPath += "ico_ok.gif"; break;
        case 2: iconPath += "ico_info.gif"; break;
        case 3: iconPath += "ioc_ques.gif"; break;
        case -1: iconPath += "ico_error.gif"; break;
        default: iconPath += "ico_normal.gif"; break;
    }
    jMesbook1Icon.attr("src", iconPath);

    //关闭按钮
    var okBtn = jMesbook1Btns.find("input");
    okBtn.removeAttr("onclick");
    okBtn.click(function () {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function () {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    okBtn.focus();

    //显示
    showFullBg();
    setCM("mesbook1");
    relocation("mesbook1");
    jMesbook1.fadeIn(80);
}
function hideDdl(cntrId) {
    var arrTags = ["select", "iframe", "applet", "object"];
    var jCntr;
    if (cntrId != null) {
        jCntr = $j(cntrId);
    } else {
        jCntr = $(document.body);
    }
    for (var i = 0; i < arrTags.length; ++i) {
        jCntr.find(arrTags[i]).css("visibility", "hidden");
    }
}

function emptyText(cntrId) {
    var jTxts;
    if (cntrId == null) {
        jTxts = $("body").find("input[type=text]");
    } else {
        jTxts = $j(cntrId).find("input[type=text]");
    }
    var jTxtss;
    if (cntrId == null) {
        jTxtss = $("body").find("input[type=password]");
    } else {
        jTxtss = $j(cntrId).find("input[type=password]");
    }
    jTxts.each(function () {
        $(this).val("");
    });
    jTxtss.each(function () {
        $(this).val("");
    });
    if (cntrId == null)
        jTxts = $("body").find("textarea");
    else
        jTxts = $j(cntrId).find("textarea");
    jTxts.each(function () {
        $(this).val("");
    });
}
/********************
* 显示一个全屏灰度背景
* elmId : 元素ID或元素
********************/
function showFullBg(elmId, isHideDdl, opacity, bgColor, zIndex, speed, behavior) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $j(elmId);
    if (jElm.length == 0) {
        var sHtml = "<div style='position:absolute;top:0;left:0;display:none;' id='" + elmId + "'></div>";
        $(document.body).append(sHtml);
    }
    if (opacity == null) {
        opacity = 0.75;
    }
    if (bgColor == null) {
        bgColor = "#777";
    }
    if (zIndex == null) {
        zIndex = "9";
    }
    if (speed == null) {
        speed = 80;
    }
    if (isHideDdl == null) {
        isHideDdl = true;
    }
    var jElm = $j(elmId);
    var dd = document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH) {
        sHeight = cH;
    }
    if (sWidth < cW) {
        sWidth = cW;
    }
    jElm.css({ "z-index": zIndex, "background": bgColor, "opacity": opacity, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity * 100 + ")" });
    jElm.css({ "height": sHeight, "width": sWidth });
    if (isHideDdl) {
        hideDdl(null, behavior);
    }
    jElm.fadeIn(speed);
    if (behavior != null) {
        behavior();
    }
}
/********************
* 设置层绝对居中（水平，垂直）setCenterMiddle
* elmId : 元素ID或元素
* speed : (可选)渐变进入的速度
********************/
function setCM(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}
/********************
* 重置一个层为绝对居中于窗口的位置
* elmId : 元素ID或元素
********************/
function relocation(elmId) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (jElm.length == 0) {
        return;
    }
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var t = (top - (jElm.height() / 2) + "px");
    jElm.css({ "margin-top": t/*, "left": l */ });
}
/********************
* 缩放窗口或拖动滚动条时，保持弹出层消息框于窗口居中
********************/
$(function () {
    //--
    $(window).resize(function () {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    $(window).scroll(function () {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    //--
});
/********************
* 对应$a(...)，用于在服务端显示弹出层消息框，针对IE的补丁
********************/
function oran_msg(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    window.onload = function () {
        $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior);
    }
}
/********************
* 隐藏消息提示层
********************/
function hideMsg() {
    showDdl();
    var jShadow = $j("mesbook1");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* 隐藏下拉框函数
********************/
function showDdl() {
    var arrTags = ["select", "iframe", "applet", "object"];
    for (var i = 0; i < arrTags.length; ++i) {
        $(arrTags[i]).css("visibility", "visible");
    }
}
/********************
* 隐藏全屏灰度背景
* speed : (可选)渐变消退的速度
********************/
function hideFullBg(elmId, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    if (speed == null) {
        speed = 80;
    }
    var jElm = $j(elmId);
    jElm.fadeOut(speed);
    showDdl();
}
function showBgProc(show, msg) {
    if (msg == null) {
        msg = "正在处理...";
    }
    var sElmId = "oran_div_processing";
    var oImg = $j(sElmId);
    if (oImg.length == 0) {
        $(document.body).append("<div id='" + sElmId + "'><p><img src='" + SKIN_PATH + "img/processing_2.gif' id='imgProc' alt='" + msg + "' /></p>"
        + "<p class='mt10'>" + msg + "</p></div>");
    }
    oImg = $j(sElmId);
    if (show == null) {
        show = true;
    }
    if (show) {
        showFullBg("oran_full_bg_2");
        setCM(sElmId);
        relocation(sElmId);
        oImg.fadeIn(80);
    } else {
        oImg.fadeOut(80);
        hideFullBg("oran_full_bg_2");
    }
}

function signUp(src) {
    showBgProc(true, "正在注册，请稍候...");
    var errorMsg = "";
    var reg = /^\s*$/;
     
    var s_mobile = $("#txtMobile").val(); 
    var s_pin = $("#txtPin2").val();
    var c_pin = $("#txtConfirmPin").val();
    var s_verCode = $("#txtCmtVerCode").val();
    
    var ptns = /^\d{11,13}$/;
    var Mobile = /^((13|14|15|18)+\d{9})$/;
    if (reg.test(s_mobile)) {
        errorMsg += "<p>手机不可为空</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
    if (!ptns.test(s_mobile) || !Mobile.test(s_mobile)) {
        errorMsg += "<p>手机格式错误</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
     
    if (reg.test(s_pin)) {
        errorMsg += "<p>密码不可为空</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
    if (s_pin.length<6) {
        errorMsg += "<p>密码长度不能小于6位</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
    if (reg.test(c_pin)) {
        errorMsg += "<p>确认密码不可为空</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
    if (c_pin != s_pin) {

        errorMsg += "<p>两次输入不一致</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
    if (reg.test(s_verCode)) {
        errorMsg += "<p>验证码不可为空</p>";
        $a(errorMsg);
        showBgProc(false);
        return false;
    }
   var url=window.location.href;
    $.post("/ajax.ashx?action=register&t=" + Math.random(), {
        mobile: s_mobile,
        pin: s_pin, 
        verCode: s_verCode,
    }, function (msg) {
        if (gav(msg, "state") == "1") {
            $a(gav(msg, "msg"));
            setTimeout("Gourl('"+url+"')", 1000);
            
           
        } else {
            $a(gav(msg, "msg"));
            document.getElementById('img1').src = '/Tools/ValidCodes.aspx?' + new Date().getTime();
        }
        showBgProc(false);
    });

}
function Gourl(url)
{
 window.location.href=url;
}

//加入收藏
var addBookmark = function (obj) {
    var title = document.title;
    var url = document.URL;
    var e = window.event || arguments.callee.caller.arguments[0];
    var B = {
        IE: /MSIE/.test(window.navigator.userAgent) && !window.opera
        , FF: /Firefox/.test(window.navigator.userAgent)
        , OP: !!window.opera
    };
    obj.onclick = null;
    if (B.IE) {
        obj.attachEvent("onclick", function () {
            try {
                window.external.AddFavorite(url, title);
                window.event.returnValue = false;
            } catch (exp) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        });
    } else {
        if (B.FF || obj.nodeName.toLowerCase() == "a") {
            if (B.FF) {
                obj.setAttribute("rel", "sidebar"), obj.title = title, obj.href = url;
            }
            else {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
            //obj.setAttribute("rel", "sidebar"), obj.title = title, obj.href = url;
        } else if (B.OP) {

            var a = document.createElement("a");
            a.rel = "sidebar", a.title = title, a.href = url;
            obj.parentNode.insertBefore(a, obj);
            a.appendChild(obj);
            a = null;
        }
        else {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
};


//自动设置大宽度图片水平居中
function TopImg(obj) {
    this.wrap = obj;
    this.init(this);
};
TopImg.prototype = {
    init: function (_this) {
        if (!this.wrap.length) return false;
        for (var i = 0, l = this.wrap.length; i < l; i++) {
            (function (i) {
                var img = _this.wrap[i].find("img").eq(0),
					src = img.attr("src"),
					newImg = new Image();
                newImg.onload = function () {
                    var width = newImg.width, height = newImg.height, Pwidth = _this.wrap[i].width();
                    _this.wrap[i].height(height + "px");
                    img.css({ left: Math.floor((Pwidth - width) / 2) + "px", position: "absolute" });
                };
                newImg.src = src;
            })(i);

        };
    }
};


/*======新banner切换代码=======*/
//全屏滚动
$(function () {
    var n = 0;
    var imgLength = $(".b-img a").length;
    var ctWidth = imgLength * 100;
    var itemWidth = 1 / imgLength * 100;
    $(".b-img").width(ctWidth + "%");
    $(".b-img a").width(itemWidth + "%");
    $(".b-list").width(imgLength * 30);
    if (imgLength > 1) {
        for (var i = 0; i < imgLength; i++) {
            var listSpan = $("<span></span>")
            $(".b-list").append(listSpan);
        }
    }
    $(".b-list span:eq(0)").addClass("spcss").siblings("span").removeClass("spcss");
    $(".bar-right em").click(function () {
        if (n == imgLength - 1) {
            var ctPosit = (n + 1) * 100;
            $(".banner").append($(".b-img").clone());
            $(".b-img:last").css("left", "100%");
            $(".b-img:first").animate({ "left": "-" + ctPosit + "%" }, 1000);
            $(".b-img:last").animate({ "left": "0" }, 1000);
            var setTime0 = setTimeout(function () {
                $(".banner .b-img:first").remove();
            }, 1000);
            n = 0;
            $(".b-list span:eq(" + n + ")").addClass("spcss").siblings("span").removeClass("spcss");
        }
        else {
            n++;
            var ctPosit = n * 100;
            $(".b-img").animate({ "left": "-" + ctPosit + "%" }, 1000);
            $(".b-list span:eq(" + n + ")").addClass("spcss").siblings("span").removeClass("spcss");
        }
    })
    $(".bar-left em").click(function () {
        if (n == 0) {
            var stPosit = imgLength * 100;
            var etPosit = (imgLength - 1) * 100;
            $(".banner").prepend($(".b-img").clone());
            $(".b-img:first").css("left", "-" + stPosit + "%");
            $(".b-img:last").animate({ "left": "100%" }, 1000);
            $(".b-img:first").animate({ "left": "-" + etPosit + "%" }, 1000);
            var setTime0 = setTimeout(function () {
                $(".banner .b-img:last").remove();
            }, 1000);
            n = imgLength - 1;
            $(".b-list span:eq(" + n + ")").addClass("spcss").siblings("span").removeClass("spcss");
        }
        else {
            n--;
            var ctPosit = n * 100;
            $(".b-img").animate({ "left": "-" + ctPosit + "%" }, 1000);
            $(".b-list span:eq(" + n + ")").addClass("spcss").siblings("span").removeClass("spcss");
        }
    })
    $(".b-list span").click(function () {
        var lsIndex = $(this).index();
        n = lsIndex;
        var ctPosit = n * 100;
        $(".b-img").animate({ "left": "-" + ctPosit + "%" }, 1000);
        $(this).addClass("spcss").siblings("span").removeClass("spcss");
    })
    function rollEnvent() {
        if (n == imgLength - 1) {
            var ctPosit = (n + 1) * 100;
            $(".banner").append($(".b-img").clone());
            $(".b-img:last").css("left", "100%");
            $(".b-img:first").animate({ "left": "-" + ctPosit + "%" }, 1000);
            $(".b-img:last").animate({ "left": "0" }, 1000);
            var setTime0 = setTimeout(function () {
                $(".banner .b-img:first").remove();
            }, 1000);
            n = 0;
            $(".b-list span:eq(0)").addClass("spcss").siblings("span").removeClass("spcss");
        }
        else {
            n++;
            var ctPosit = n * 100;
            $(".b-img").animate({ "left": "-" + ctPosit + "%" }, 1000);
            $(".b-list span:eq(" + n + ")").addClass("spcss").siblings("span").removeClass("spcss");
        }
    }
    var slidesetInterval = setInterval(rollEnvent, 4000);
    $(".banner").hover(function () { clearInterval(slidesetInterval); }, function () { slidesetInterval = setInterval(rollEnvent, 4000); });
    $(".bar-left").mouseover(function () {
        $(this).css("background", "url(images/arr-bg.png)");
        $(this).find("em").addClass("emcss");
    }).mouseleave(function () {
        $(this).css("background", "none");
        $(this).find("em").removeClass("emcss");
    })
    $(".bar-right").mouseover(function () {
        $(this).css("background", "url(images/arr-bg.png)");
        $(this).find("em").addClass("emcss");
    }).mouseleave(function () {
        $(this).css("background", "none");
        $(this).find("em").removeClass("emcss");
    })
})

/*======新banner切换代码=======*/