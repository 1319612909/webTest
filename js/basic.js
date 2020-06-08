function Banner(obj){
	this.bannerUl = obj.bannerUl;
	this.bannerLi = obj.bannerLi;
	this.banIco = obj.banIco;
	this.banIcoClick = obj.banIcoClick;
	this.banIcoShow = obj.banIcoShow;
	this.bannerPrev = obj.bannerPrev;
	this.bannerNext = obj.bannerNext;
    this.Img = {};
    this.length = obj.length;
    this.speed = obj.speed;
    this.limit = obj.limit;
    this.width = obj.bannerUl.parent().width();
    this.timer = null;
    this.now = 0;
    this.left = 0;
    this.num = 0;
	this.init(this);
};
Banner.prototype = {
	init : function(_this){
		this.Position(this);
		this.Resize(this);
	},
	Position : function(_this){			//初始化定位
		var frag = document.createDocumentFragment();
		this.bannerLi.css({ width : this.width + "px"});
		this.bannerUl.css({ width : this.width * this.length * 2 + "px" });
		//往UL内部插入复制的内容
		this.bannerLi.clone().appendTo(this.bannerUl);
		this.Img = this.bannerUl.find("img");
		for(var i=0, l=this.bannerUl.find("li").length; i<l; i++){
			var src = this.Img.eq(i).attr("src");
			this.Img.eq(i).attr({ "class" : "disN" });
			this.loadImg(this, this.Img.eq(i), src);
		};

		if(this.banIcoShow){
			this.banIco.css({width: this.limit + "px", marginLeft: -this.limit/2 + "px"});
			for(var i=0; i<this.length; i++){
				var ico = document.createElement("i");
				if(i == 0){
					ico.className = "active";
				};
				frag.appendChild(ico);
			};
			this.banIco[0].appendChild(frag);
		};
		var ls = setInterval(function(){
			if(_this.num > 0){
				_this.Move();
				clearInterval(ls);
			};
		}, 100);
	},
	Resize : function(){				//动态改变浏览器窗口
		var _this = this;
		$(window).on("resize", function(){
			_this.width = (_this.width < _this.limit) ? _this.limit : _this.bannerUl.parent().width();
			clearInterval(_this.timer);
			_this.bannerLi.css({width: _this.width + "px"});
			_this.bannerUl.css({left: -_this.now * _this.width + "px", width: _this.length * _this.width * 2 + "px"});
			_this.left = -_this.now * _this.width;
			for(var i=0; i<_this.length; i++){
				var Width = _this.Img[i].offsetWidth;
				_this.Img[i].style.left = Math.ceil((_this.width - Width)/2) + "px";
			};

			_this.timer = setInterval(function(){
				_this.nextClicks(_this);
			}, _this.speed);
		});
	},
	Move : function(){					//自动开始运动
		var _this = this;
		this.timer = setInterval(function(){
			_this.nextClicks(_this);
		}, _this.speed);
		this.Custom();
		this.btnClick();
	},
	Custom : function(){				//激活点的事件添加
		var _this = this;
		if (!this.banIcoClick) return false;
		this.banIco.find("i").each(function(i){
			$(this).on("click", function(){
				_this.Click(_this, i);
			});
		}).on({
			mouseover : function(){
				clearInterval(_this.timer);
			},
			mouseleave : function(){
				_this.timer = setInterval(function(){
					_this.nextClicks(_this);
				}, _this.speed);
			}
		});
	},
	Click : function(_this, num){		//激活点的点击
		_this.left = -_this.width * num;
		_this.bannerUl.animate({left: _this.left + "px"}, 400);
		_this.now = num;
		_this.banIco.find("i").removeClass("active");
		_this.banIco.find("i").eq(_this.now).addClass("active");
	},
	btnClick : function(){				//双向按钮的点击事件
		var _this = this;
		if (!this.bannerPrev && !this.bannerNext) return false;
		this.bannerPrev.on({
			click : function(){
				_this.prevClicks(_this);
			},
			mouseover : function(){
				clearInterval(_this.timer);
			},
			mouseleave : function(){
				_this.timer = setInterval(function(){
					_this.nextClicks(_this);
				}, _this.speed);
			}
		});
		this.bannerNext.on({
			click : function(){
				_this.nextClicks(_this);
			},
			mouseover : function(){
				clearInterval(_this.timer);
			},
			mouseleave : function(){
				_this.timer = setInterval(function(){
					_this.nextClicks(_this);
				}, _this.speed);
			}
		});
	},
	nextClicks : function(_this){		//下一张点击事件
		if(_this.now >= _this.length - 1){
			_this.left -= _this.width;
			_this.bannerUl.animate({left: _this.left + "px"}, 400, function(){
				_this.bannerUl.css({ left : 0 });
				_this.left = 0;
			});
			_this.now = 0;
			_this.banIco.find("i").removeClass("active");
			_this.banIco.find("i").eq(_this.now).addClass("active");
		}else{
			_this.left -= _this.width;
			_this.bannerUl.animate({left: _this.left + "px"}, 400);
			_this.now++;
			_this.banIco.find("i").removeClass("active");
			_this.banIco.find("i").eq(_this.now).addClass("active");
		};
	},
	prevClicks : function(_this){		//上一张点击事件
		if(_this.now > 0){
			_this.now--;
			_this.left = -_this.width * _this.now;
			_this.bannerUl.animate({left: _this.left + "px"}, 400);
			_this.banIco.find("i").removeClass("active");
			_this.banIco.find("i").eq(_this.now).addClass("active");
		}else{
			_this.bannerUl.css({ left : -_this.width * _this.length + "px" });
			_this.left = -_this.width * (_this.length-1);
			_this.bannerUl.animate({left: _this.left + "px"}, 400);
			_this.now = _this.length - 1;
			_this.banIco.find("i").removeClass("active");
			_this.banIco.find("i").eq(_this.now).addClass("active");
		};
	},
	loadImg : function(_this, imgobj, src){		//预加载样式
		var newImg = new Image();
		newImg.onload = function(){
			var height = newImg.height, width = newImg.width, left = Math.ceil((_this.width - width)/2);
			_this.num++;
			_this.bannerUl.parent().css({ height : height + "px" });
			imgobj.css({ left : left + "px" }).attr({ "class" : "disB" });
		};
		newImg.src = src;
	}
};

//滑动门效果
function Slither(obj){
	this.elem = obj.elem;
	this.findType = obj.findType;
	this.active = obj.active;
	this.length = obj.elem.find(obj.findType).length;
	this.prev = obj.prev;
	this.next = obj.next;
	this.number = obj.number ? obj.number : 1;           //每一次界面显示的个数
	this.width = obj.width;                              //每一个的宽度
	this.height = obj.height;                            //每一个的高度
	this.distance = obj.distance;                        //每次移动的距离
	this.direction = obj.direction;                      //移动的方向，上或者左
	this.timespan = obj.timespan ? obj.timespan : 3000;  //运动间隔时间，默认200毫秒
	this.value = obj.value ? obj.value : 0;              //对象位置初始值
	this.autoSlide = obj.autoSlide;
	this.autoTime = obj.autoTime;
	this.timer = null;
	this.now = 0;
	this.init(this);
};
Slither.prototype = {
	init : function(_this){
		//往父级内部插入复制的内容
		this.elem.find(this.findType).clone().appendTo(this.elem);
		if(this.direction == "left"){
			this.elem.css({width: this.width * this.length * 2 + "px"});
		}else{
			this.elem.css({height: this.height * this.length * 2 + "px"});
		};
		if(this.active){
			for(var i=0, l=this.length; i<l; i++){
				var obji = document.createElement("i");
				if(!i){
					obji.className = "active";
				};
				this.active.append($(obji));
			};
		};
		if(this.length <= this.number) return false;
		this.Click(this);
	},
	Click : function(_this){
		if(this.next){
			this.next.on("click", function(){
				_this.Move(true, _this);
			}).on("mouseover", function(){
				clearInterval(_this.timer);
			});
		};

		if(this.prev){
			this.prev.on("click", function(){
				_this.Move(false, _this);
			}).on("mouseover", function(){
				clearInterval(_this.timer);
			});
		};

		if(this.autoSlide){
			this.timer = setInterval(function(){
				_this.Move(true, _this);
			}, _this.autoTime);
			if(this.next){
				this.next.on("mouseleave", function(){
					_this.timer = setInterval(function(){
						_this.Move(true, _this);
					}, _this.autoTime);
				});
			};
			if(this.prev){
				this.prev.on("mouseleave", function(){
					_this.timer = setInterval(function(){
						_this.Move(true, _this);
					}, _this.autoTime);
				});
			};
		};
	},
	Move : function(mask, _this){
		if(mask){
			if(this.direction == "left"){
				if(this.now == this.length - 1){
					this.value -= this.distance;
					this.elem.stop(true, true).animate({left : this.value + "px"}, this.timespan, function(){
						_this.value = 0;
						_this.elem.css({ left : 0 + "px" });
					});
					_this.now = 0;
				}else{
					this.value -= this.distance;
					this.elem.stop(true, true).animate({left : this.value + "px"}, this.timespan);
					this.now++;
				}
			}else{
				if(this.now >= this.length - 1){
					this.value -= this.distance;
					this.elem.stop(true, true).animate({top : this.value + "px"}, this.timespan, function(){
						_this.now = 0;
						_this.value = 0;
						_this.elem.css({ top : 0 + "px" });
					});
				}else{
					this.value -= this.distance;
					this.elem.stop(true, true).animate({top : this.value + "px"}, this.timespan);
					this.now++;
				}
			}
		}else{
			if(this.direction == "left"){
				if(!this.now){
					//直接定位到最后一个的前一个
					this.elem.css({ left : -this.length * this.distance + "px" });
					this.value = -(this.length - 1) * this.distance;
					this.elem.stop(true, true).animate({left : this.value + "px"}, this.timespan);
					this.now = this.length - 1;
				}else{
					this.value += this.distance;
					this.elem.stop(true, true).animate({left : this.value + "px"}, this.timespan);
					this.now--;
				}
			}else{
				if(!this.now){
					//直接定位到最后一个的前一个
					this.elem.css({ top : -this.length * this.distance + "px" });
					this.value = -(this.length - 1) * this.distance;
					this.elem.stop(true, true).animate({top : this.value + "px"}, this.timespan);
					this.now = this.length - 1;
				}else{
					this.value += this.distance;
					this.elem.stop(true, true).animate({top : this.value + "px"}, this.timespan);
					this.now--;
				}
			}
		}
		if(this.active){
		 this.active.find("i").eq(this.now).addClass("active").siblings("i").removeClass("active");
		 }
	}
};

//居中效果
function Center(obj){
	this.elem = obj.elem;
	this.init();
};
Center.prototype = {
	init : function(){
		var _this = this;
		this.Position();
		$(window).on("resize", function(){
			_this.Resize();
		});
	},
	Position : function(){
		var winH = $(window).height(), elemH = this.elem.height();
		if(this.elem.height() >= winH) this.elem.css({top:0});
		else this.elem.css({top: Math.ceil((winH - elemH)/2) + "px" });
	},
	Resize : function(){
		this.Position();
	}
};

//页面两侧漂浮开关
function Exchange(obj){
	this.elem = obj.elem;
    this.but = obj.but;
    this.event = obj.event;
    this.maxNum = obj.maxNum;
    this.minNum = obj.minNum;
    this.init();
};
Exchange.prototype = {
	init : function(){
		this.Bind();
	},
	Bind : function(){
		var _this = this, mask = true;
		this.but.on(_this.event, function(){
			if(mask){
				_this.Move(_this.minNum);
				mask = false;
			}else{
				_this.Move(_this.maxNum);
				mask = true;
			};
		});
	},
	Move : function(value){
		this.elem.animate({width: value + "px"}, 300);
	}
};

//所有选项卡切换
function ReAdd(obj){
    this.elem = obj.elem;
    this.type = obj.type;
    this.length = obj.elem.find(obj.type).length;
    this.Class = obj.Class;
    this.event = obj.event;
    this.mask = obj.mask;
    this.tabelem = obj.tabelem;
    this.Classt = obj.Classt;
    this.init();
};
ReAdd.prototype = {
    init : function(){
        this.Mover();
    },
    Mover : function(){
        var _this = this;
        this.elem.find(this.type).eq(0).addClass(this.Class);
        if(_this.mask){
	        this.tabelem.eq(0).addClass(this.Classt);
	        this.elem.find(_this.type).each(function(i){
		        $(this).on(_this.event, function(){
		            $(this).siblings(_this.type).removeClass(_this.Class);
		            $(this).addClass(_this.Class);
		            if(_this.tabelem.eq(i).length){
			            _this.tabelem.removeClass(_this.Classt);
		            	_this.tabelem.eq(i).addClass(_this.Classt);
		            };
		        });
	        });
        }else{
	        this.elem.find(_this.type).on(_this.event, function(){
	            $(this).siblings(_this.type).removeClass(_this.Class);
	            $(this).addClass(_this.Class);
	        });
        }
    }
};

//导航效果(移动上去切换的效果)
function Nav(obj){
    this.elem = obj.elem;
    this.maxNum = 60;
    this.minNum = 0;
    this.init();
};
Nav.prototype = {
    init : function(){
        this.Mover();
        this.Mleave();
    },
    Mover : function(){
	    var _this = this;
        this.elem.find("li").on("mouseover", function(){
            $(this).find("a").animate({top: _this.minNum + "px"}, 200);
        });
    },
    Mleave : function(){
	    var _this = this;
        this.elem.find("li").on("mouseleave", function(){
            $(this).find("a").stop(true, true).animate({top: _this.maxNum + "px"}, 200);
        });
    }
};

//导航效果(移动打开下拉项目)
function Nav2(obj){
    this.elem = obj.elem;
    this.type = obj.type;
    this.Class = obj.Class;
    this.init();
};
Nav2.prototype = {
	init : function(){
		var _this = this;
		this.elem.on({
			mouseover : function(){
				$(this).addClass(_this.Class).siblings(_this.type).removeClass(_this.Class);
			},
			mouseleave : function(){
				$(this).removeClass(_this.Class);
			}
		}, this.type);
	}
};

//满意度类flash切换方式（默认5屏）
function Slide(obj){
	this.parent = obj.parent;
	this.length = obj.length;
    this.prev = obj.prev;
    this.next = obj.next;
    this.maxW = obj.maxW;
    this.maxH = obj.maxH;
    this.maxL = obj.maxL;
    this.maxT = obj.maxT;
    this.midW = obj.midW;
    this.midH = obj.midH;
	this.midLL = obj.midLL;
	this.midLRT = obj.midLRT;
	this.midRL = obj.midRL;
    this.minW = obj.minW;
    this.minH = obj.minH;
    this.minLL = obj.minLL;
	this.minLRT = obj.minLRT;
	this.minRL = obj.minRL;
    this.now = 0;
    this.init();
};
Slide.prototype = {
	init : function(){
		this.Position();
		this.Move();
	},
	Position : function(){
		if(this.length >= 5){
			for(var i=0; i<5; i++){
				this.parent.find("li").eq(i).addClass("slide_" + i);
				i === 2 ? this.parent.find("li").eq(i).addClass("active") : "";
			};
		}else{
			switch (this.length){
				case 1:
					this.parent.find("li").eq(0).addClass("slide_" + 2 + " active");
					this.prev.addClass("left_all");
					this.next.addClass("right_all");
					this.now = -2;
				break;
				case 2:
					this.parent.find("li").eq(0).addClass("slide_" + 1);
					this.parent.find("li").eq(1).addClass("slide_" + 2 + " active");
					this.next.addClass("right_all");
					this.now = -1;
				break;
				case 3:
					this.parent.find("li").eq(0).addClass("slide_" + 0);
					this.parent.find("li").eq(1).addClass("slide_" + 1);
					this.parent.find("li").eq(2).addClass("slide_" + 2 + " active");
					this.next.addClass("right_all");
				break;
				default:
					for(var i=0; i<this.length; i++){
						this.parent.find("li").eq(i).addClass("slide_" + i);
						i === 2 ? this.parent.find("li").eq(i).addClass("active") : "";
					};
			};
		};
	},
	Move : function(){
		var _this = this;
		this.prev.on("click", function(){
			if(_this.length === 1){
				return;
			}else{
				_this.Prev(_this.prev, _this.next);
			};
		});

		this.next.on("click", function(){
			if(_this.length === 1){
				return;
			}else{
				_this.Next(_this.next, _this.prev);
			};
		});
	},
	Prev : function(self, side){

		if(this.now === this.length - 3) return;

		self.removeClass("left_all");

		if(this.now === this.length - 4){
			side.addClass("right_all");
		};

		if(this.now >= -2){
			if(this.now >= -1){
				this.parent.find("li").eq(this.now + 1).css({zIndex: 2}).animate({
					width: this.minW + "px", height: this.minH + "px", left: this.minLL + "px", top: this.minLRT + "px"
				}, 400);
			};

			this.parent.find("li").eq(this.now + 2).css({zIndex: 3}).animate({
				width: this.midW + "px", height: this.midH + "px", left: this.midLL + "px", top: this.midLRT + "px"
			}, 400).find("em").fadeIn(400);

			this.parent.find("li").eq(this.now + 3).css({zIndex: 4}).animate({
				width: this.maxW + "px", height: this.maxH + "px", left: this.maxL + "px", top: this.maxT + "px"
			}, 400).find("em").fadeOut(400);

			this.parent.find("li").eq(this.now + 4).css({zIndex: 3}).animate({
				width: this.midW + "px", height: this.midH + "px", left: this.midRL + "px", top: this.midLRT + "px"
			}, 400);

			this.parent.find("li").eq(this.now + 5).css({zIndex: 2}).fadeIn(400);

			this.now++;

		};
	},
	Next : function(self, side){

		if(-this.now === 2) return;

		self.removeClass("right_all");

		if(-this.now === 1){
			side.addClass("left_all");
		};

		this.parent.find("li").eq(this.now + 4).css({zIndex: 1}).fadeIn(400);

		this.parent.find("li").eq(this.now + 3).css({zIndex: 2}).animate({
			width: this.minW + "px", height: this.minH + "px", left: this.minRL + "px", top: this.minLRT + "px"
		}, 400);

		this.parent.find("li").eq(this.now + 2).css({zIndex: 3}).animate({
			width: this.midW + "px", height: this.midH + "px", left: this.midRL + "px", top: this.midLRT + "px"
		}, 400).find("em").fadeIn(400);

		this.parent.find("li").eq(this.now + 1).css({zIndex: 4}).animate({
			width: this.maxW + "px", height: this.maxH + "px", left: this.maxL + "px", top: this.maxT + "px"
		}, 400).find("em").fadeOut(400);

		if(-this.now === 1) {
			this.now--;
			return;
		};

		this.parent.find("li").eq(this.now).css({zIndex: 3}).animate({
			width: this.midW + "px", height: this.midH + "px", left: this.midLL + "px", top: this.midLRT + "px"
		}, 400);

		this.now--;
	}
};

//类flash切换方式（默认 3 屏）
function SlideThree(obj){
	this.allSlide = obj.allSlide;
	this.prev = obj.prev;
	this.next = obj.next;
	this.maxW = obj.maxW;
	this.maxH = obj.maxH;
	this.maxL = obj.maxL;
	this.maxT = obj.maxT;
	this.minW = obj.minW;
	this.minH = obj.minH;
	this.minLL = obj.minLL;
	this.minRL = obj.minRL;
	this.minT = obj.minT;
	this.length = obj.allSlide.length;
	this.num = 1;			//默认为 1 ，表示从第二个开始
	this.init(this);
};
SlideThree.prototype = {
	init : function(_this){
		var activeCss = {
				width : this.maxW + "px",
				height : this.maxH + "px",
				left : this.maxL + "px",
				top : this.maxT + "px",
				zIndex : 99
			};
		if(this.length === 0){
			return false;
		}else if(this.length === 1){
			this.allSlide.addClass("active").css(activeCss);
			return false;
		};
		this.allSlide.eq(this.num).addClass("active").css(activeCss);
		//循环除第二个之外的所有项
		for(var i=0; i<this.length; i++){
			if(i === 0){
				this.allSlide.eq(i).css({ width : this.minW + "px", height : this.minH + "px", left : this.minLL + "px", top : this.minT + "px" });
			}else if(i > 1){
				this.allSlide.eq(i).css({ width : this.minW + "px", height : this.minH + "px", left : this.minRL + "px", top : this.minT + "px" });
				if(i > 2){
					this.allSlide.eq(i).addClass("disN");
				};
			};
		};
		if(this.length > 1){
			this.Next(_this);
			this.Prev(_this);
		};
	},
	Next : function(_this){
		this.next.on("click", function(){
			if(_this.num === _this.length - 1){
				return false;
			};
			_this.num++;
			_this.allSlide.eq(_this.num - 2).addClass("disN");
			_this.allSlide.eq(_this.num - 1).css({ zIndex : 98 }).animate({ width : _this.minW + "px", height : _this.minH + "px", top : _this.minT + "px", left : _this.minLL + "px" }, 300);
			_this.allSlide.removeClass("active");
			_this.allSlide.eq(_this.num).css({ zIndex : 99 }).animate({ width : _this.maxW + "px", height : _this.maxH + "px", top : _this.maxT + "px", left : _this.maxL + "px" }, 300, function(){
				_this.allSlide.eq(_this.num).addClass("active")
			});
			_this.allSlide.eq(_this.num + 1).removeClass("disN");
		});
	},
	Prev : function(_this){
		this.prev.on("click", function(){
			if(_this.num === 0){
				return false;
			};
			_this.num--;
			_this.allSlide.eq(_this.num + 2).addClass("disN");
			_this.allSlide.eq(_this.num + 1).css({ zIndex : 98 }).animate({ width : _this.minW + "px", height : _this.minH + "px", top : _this.minT + "px", left : _this.minRL + "px" }, 300);
			_this.allSlide.removeClass("active");
			_this.allSlide.eq(_this.num).css({ zIndex : 99 }).animate({ width : _this.maxW + "px", height : _this.maxH + "px", top : _this.maxT + "px", left : _this.maxL + "px" }, 300, function(){
				_this.allSlide.eq(_this.num).addClass("active");
			});
			if(_this.num > 1){
				_this.allSlide.eq(_this.num - 1).removeClass("disN");
			};
		});
	}
};

//滚动插件（用于需要滚动的元素）
function Scroll(obj){
	this.warp = obj.warp;
	this.checkwarp = obj.checkwarp;
	this.direction = obj.direction;
	this.moveObjV = 0;
	this.timer = null;
	this.warpvalue = 0;
	this.movevlaue = 0;
	this.init();
};
Scroll.prototype = {
	init : function(){
		if(this.direction == "V"){
			this.moveObjV = this.checkwarp.height();
			if(this.moveObjV > this.warp.height()){
				this.MoveV();
			}else{
				return false;
			};
		}else if(this.direction == "H"){
			this.moveObjV = this.checkwarp.width();
			if(this.moveObjV > this.warp.width()){
				this.MoveH();
			}else{
				return false;
			};
		};
		this.checkwarp.append(this.checkwarp.children().clone());
	},
	MoveV : function(){
		var _this = this;
		this.timer = setInterval(function(){
			move();
		}, 60);
		this.Mouse(move);

		function move(){
			if(_this.moveObjV <= -_this.movevlaue){
				_this.checkwarp.css({top: 0});
				_this.movevlaue = 0;
			}else{
				_this.checkwarp.css({top: _this.movevlaue + "px"});
				_this.movevlaue -= 1;
			}
		};
	},
	MoveH : function(){
		var _this = this;
		this.timer = setInterval(function(){
			move();
		}, 60);
		this.Mouse(move);

		function move(){
			if(_this.moveObjV <= -_this.movevlaue){
				_this.checkwarp.css({left: 0});
				_this.movevlaue = 0;
			}else{
				_this.checkwarp.css({left: _this.movevlaue + "px"});
				_this.movevlaue -= 1;
			}
		}
	},
	Mouse : function(func){
		var _this = this;
		this.warp.on("mouseover", function(){
			clearInterval(_this.timer);
		}).on("mouseleave", function(){
			_this.timer = setInterval(func, 60);
		});
	}
};

//用于需要变换class的菜单项
function Menu(obj){
	this.elem = obj.elem;
	this.select = obj.select;
	this.Class = obj.Class;
	this.Classt = obj.Classt;
	this.init();
};
Menu.prototype = {
	init : function(){
		var _this = this;
		this.elem.on("mouseover", _this.select, function(){
			$(this).siblings(_this.select).addClass(_this.Classt);
			$(this).addClass(_this.Class);
		}).on("mouseleave", _this.select, function(){
			$(this).removeClass(_this.Class);
			$(this).siblings(_this.select).removeClass(_this.Classt);
		});
	}
};

//鼠标悬停下拉菜单的效果
function NavSlide(obj){
	this.elem = obj.elem;
	this.overObj = obj.overObj;
	this.overClass = obj.overClass;
	this.SlideObj = obj.SlideObj;
	this.animate = obj.animate;
	this.time = obj.time;
	this.init();
};
NavSlide.prototype = {
	init : function(){
		if(this.animate){
			this.elem.find(this.overObj).find(this.SlideObj).each(function(){
				$(this).css({top : -$(this).height() + "px"});
			});
		};
		this.Mouse();
	},
	Mouse : function(){
		var _this = this;
		this.elem.on({
			mouseover : function(){
				$(this).addClass(_this.overClass).siblings(this.overObj).removeClass(_this.overClass);
				if(_this.animate){
					$(this).find(_this.SlideObj).addClass(_this.overClass).animate({top : _this.elem.height() + "px" }, _this.time);
				}else{
					$(this).find(_this.SlideObj).addClass(_this.overClass);
				};
			},
			mouseleave : function(){
				$(this).removeClass(_this.overClass);
				var thisobj = $(this).find(_this.SlideObj);
				if(_this.animate){
					$(this).find(_this.SlideObj).stop(true, true).animate({top : -thisobj.height() + "px" }, _this.time).removeClass(_this.overClass);
				}else{
					$(this).find(_this.SlideObj).removeClass(_this.overClass);
				};
			}
		}, this.overObj);
	}
};

//自动设置大宽度图片水平居中
function TopImg(obj){
	this.wrap = obj;
	this.init(this);
};
TopImg.prototype = {
	init : function(_this){
		if(!this.wrap.length) return false;
		for(var i=0, l=this.wrap.length; i<l; i++){
			(function(i){
				var img = _this.wrap[i].find("img").eq(0),
					src = img.attr("src"),
					newImg = new Image();
				newImg.onload = function(){
					var width = newImg.width, height = newImg.height, Pwidth = _this.wrap[i].width();
					_this.wrap[i].height( height + "px" );
					img.css({ left : Math.floor((Pwidth-width)/2) + "px", position : "absolute" });
				};
				newImg.src = src;
			})(i);

		};
	}
};

//图片轮播，显示对应的数字，并且数字可点击
function ImgSlide(obj){
	this.elem = obj.elem;
	this.child = obj.child;
	this.activeico = obj.activeico;
	this.width = obj.width;
	this.length = this.elem.find(this.child).length;
	this.now = 0;
	this.left = 0;
	this.timer = null;
	this.init(this);
};
ImgSlide.prototype = {
	init : function(_this){
		for(var i=0; i<this.length; i++){
			var is = document.createElement("i");
			i===0 ? is.className = "active" : null;
			is.innerHTML = i+1;
			this.activeico.append($(is));
		};
		this.move(this);
	},
	move : function(_this){
		this.timer = setInterval(function(){
			_this.next(_this);
		}, 3000);
		this.click(_this);
	},
	next : function(_this){
		if(_this.now >= _this.length - 1){
			_this.left = 0;
			_this.elem.animate({left: _this.left + "px"}, 300);
			_this.now = 0;
			_this.activeico.find("i").eq(_this.now).addClass("active").siblings("i").removeClass("active");
		}else{
			_this.left -= _this.width;
			_this.elem.animate({left: _this.left + "px"}, 300);
			_this.now++;
			_this.activeico.find("i").eq(_this.now).addClass("active").siblings("i").removeClass("active");
		};
	},
	click : function(_this){
		_this.activeico.find("i").each(function(i){
			$(this).on("click", function(){
				clearInterval(_this.timer);
				_this.left = -i * _this.width;
				_this.elem.animate({left: _this.left + "px"}, 300, function(){
					_this.timer = setInterval(function(){
						_this.next(_this);
					}, 3000);
				});
				_this.now = i;
				$(this).addClass("active").siblings("i").removeClass("active");
			});
		});
	}
};