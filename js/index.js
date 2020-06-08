$(function () {
    new Banner({
        bannerUl: $("#bannerUl"), 						//UL对象
        banIco: $("#ban_ico"), 							//图标对象
        banIcoClick: true, 								//设置是否通过图标点击
        banIcoShow: true, 								//设置是否显示图标
        bannerPrev: $("#bannerPrev"), 					//上一步按钮
        bannerNext: $("#bannerNext"), 					//下一步按钮
        bannerLi: $("#bannerUl").find("li"), 			//LI对象
        length: $("#bannerUl").find("li").length, 		//长度对象
        speed: 5000, 									//间隔时间
        limit: 1000										//限制宽度
    });

    $(".md1nr ul li").hover(function () {
        $(this).find("img").css({ "opacity": ".9", "filter": "alpha(opacity=90)" })
    }, function () {
        $(this).find("img").css({ "opacity": ".2", "filter": "alpha(opacity=20)" })
    });

    //pk划上效果
    $("#alnr li:first").find("p").css("color", "#cbad8b");
    $("#alnr li:first").find("span").css("background", "url(Skins/Default/Img/Index/hua1_s.png) center top no-repeat");
    $("#alnr li").hover(function () {
        if ($(this).find("span").css("background-image").lastIndexOf("_") < 0) {
            var src = $(this).find("span");
            var str = src.css("background-image").substring(src.css("background-image").lastIndexOf("/"), src.css("background-image").lastIndexOf("."));
            $(this).find("span").css({ "background-image": "url(Skins/Default/Img/Index" + str + "_s.png)" }).end();
            $(this).find("p").css("color", "#c6a47e").end().siblings().find("p").css({ "color": "#666666" });
            $(this).siblings().each(function () {
                src = $(this).find("span");
                if (src.css("background-image").lastIndexOf("_") > 0) {
                    str = src.css("background-image").substring(src.css("background-image").lastIndexOf("/"), src.css("background-image").lastIndexOf("_"));
                    src.css({ "background-image": "url(Skins/Default/Img/Index" + str + ".png)" });
                }
            });
        }
    });

    //划上效果
    $("#anlibtm ul li").hover(function () {
        $(this).find("div").slideToggle(2000);
    });

    //布依案例
    $("#anlibtm ul:first-child").show();
    $("#alnr li").hover(function () {
        var i = $(this).index();
        $("#anlibtm ul:eq(" + i + ")").show().siblings().hide();
    })
    //团队风采
    $("#tdxg ul li").hover(function () {
        $(this).find("div").animate({ "bottom": "0px" }, "show");
    }, function () {
        $(this).find("div").animate({ "bottom": "-118px" }, "show");
    });

    //他们都选择布依凡
    new Slither({
        elem: $("#ysqh"), 	//ul对象
        findType: "li", 			//需要查找的子对象
        //active : $(""),	//激活对象（不需要激活对象，可以删除此项）
        prev: $("#zjzuo"), 		//往左/前运动的点击按钮
        next: $("#zjyou"), 		//往右/后运动的点击按钮
        number: 4, 					//每一屏显示个数，当个数与屏幕显示相同，为 1;(竖直情况为每一屏的个数)
        height: 415, 				//每一个的高度，加上下边距（水平移动可以删除此项）
        timespan: 200, 				//移动所需时间
        value: 0, 					//对象位置初始值， 默认为0
        distance: 251, 				//每次移动的距离
        direction: "left", 			//移动的方向，上或者左 top（垂直） 或者 left（水平）
        autoSlide: true, 			//是否自动滚动
        autoTime: 3000					//移动时间间隔，默认为200毫秒
    });


    //新闻中心
    new Slither({
        elem: $("#xwqhdiv"), 	//ul对象
        findType: "ul", 			//需要查找的子对象
        active: $("#yuan"), //激活对象（不需要激活对象，可以删除此项）
        //prev : $("#pxzxPrev"),			//往左/前运动的点击按钮
        //next : $("#pxzxNext"),			//往右/后运动的点击按钮
        number: 1, 					//每一屏显示个数，当个数与屏幕显示相同，为 1;(竖直情况为每一屏的个数)
        height: 180, 				//每一个的高度，加上下边距（水平移动可以删除此项）
        timespan: 800, 				//移动所需时间
        value: 0, 					//对象位置初始值， 默认为0
        distance: 480, 				//每次移动的距离
        direction: "left", 			//移动的方向，上或者左 top（垂直） 或者 left（水平）
        autoSlide: true, 			//是否自动滚动
        autoTime: 5000					//移动时间间隔，默认为200毫秒
    });
    //常见问题
    new Slither({
        elem: $("#wdqhdiv"), 	//ul对象
        findType: "ul", 			//需要查找的子对象
        active: $("#yuan2"), //激活对象（不需要激活对象，可以删除此项）
        //prev : $("#pxzxPrev"),			//往左/前运动的点击按钮
        //next : $("#pxzxNext"),			//往右/后运动的点击按钮
        number: 1, 					//每一屏显示个数，当个数与屏幕显示相同，为 1;(竖直情况为每一屏的个数)
        height: 157, 				//每一个的高度，加上下边距（水平移动可以删除此项）
        timespan: 800, 				//移动所需时间
        value: 0, 					//对象位置初始值， 默认为0
        distance: 470, 				//每次移动的距离
        direction: "left", 			//移动的方向，上或者左 top（垂直） 或者 left（水平）
        autoSlide: true, 			//是否自动滚动
        autoTime: 5000					//移动时间间隔，默认为200毫秒
    });
});