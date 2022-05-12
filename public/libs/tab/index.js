(function($) {

  $.fn.dragsort = function(options) {
    let opts = $.extend({}, $.fn.dragsort.defaults, options);
    let lists = new Array();
    let list = null;
    let lastPos = null;
    let that = this;


    this.each(function(i, cont) {
      let newList = {
        draggedItem: null,
        placeHolderItem: null,
        pos: null,
        offset: null,
        offsetLimit: null,
        container: cont,
        cursorPos:null,
        scrollPos:null,

        init: function() {
          $(this.container).attr("listIdx", i).find(opts.dragSelector).css("cursor", "default").mousedown(this.grabItem);
        },
        grabItem: function(e) {
          if (e.button == 2)
            return;
          if (list != null && list.draggedItem != null)
            list.dropItem();

          $(this).css("cursor", "default");

          list = lists[$(this).parents("*[listIdx]").attr("listIdx")];
          list.draggedItem = $(this).is(opts.itemSelector) ? $(this) : $(this).parents(opts.itemSelector);
          list.offset = list.draggedItem.offset();
          list.offset.top = e.pageY - list.offset.top;
          list.offset.left = e.pageX - list.offset.left;

          let containerHeight = $(list.container).outerHeight(true) == 0 ?Math.max(1, Math.round(0.5 +$(list.container).find(opts.itemSelector).size() *list.draggedItem.outerWidth(true) / $(list.container).outerWidth(true))) *list.draggedItem.outerHeight(true) : $(list.container).outerHeight(true);
          list.offsetLimit = $(list.container).offset();
          list.offsetLimit.right = list.offsetLimit.left + $(list.container).outerWidth(true) - list.draggedItem.outerWidth(true);
          list.offsetLimit.bottom = list.offsetLimit.top + containerHeight - list.draggedItem.outerHeight(true);

          list.placeHolderItem =list.draggedItem.clone().css({ visibility: "hidden",height: list.draggedItem.height(),"pointer-events":"none",'z-index':0 }).attr("placeHolder", true);
          list.draggedItem.after(list.placeHolderItem);
          list.draggedItem.css({ position: "absolute", opacity: 1.0});

          $(lists).each(function(i, l) { l.ensureNotEmpty(); l.buildPositionTable(); });

          list.setPos(e);
          $(document).bind("selectstart", list.stopBubble); //stop ie text selection
          $(document).bind("mousemove", list.swapItems);
          $(document).bind("mouseup", list.dropItem);
          return false; //stop moz text selection
        },
        setPos: function(e) {
          let x = e.pageX;
          let y = e.pageY;
          if(opts.vertical){
            let top = y - this.offset.top - $(that).offset().top;
            opts.dragBetween&&(top = Math.min(this.offsetLimit.bottom - $(that).offset().top, Math.max(top, this.offsetLimit.top - $(that).offset().top)));
            this.draggedItem.css({ top: top});
          }
          if(opts.horizontal){
            let left = x - this.offset.left - $(that).offset().left - $(that).parent().scrollLeft();
            opts.dragBetween&&(left = Math.min(this.offsetLimit.right  - $(that).offset().left - $(that).parent().scrollLeft(), Math.max(left, this.offsetLimit.left+Number(this.draggedItem.parent().css('padding-left').replace('px','')) - $(that).offset().left - $(that).parent().scrollLeft())));
            this.draggedItem.css({ left: left});
          }
        },

        buildPositionTable: function() {
          let item = this.draggedItem == null ? null : this.draggedItem.get(0);
          let pos = new Array();
          $(this.container).find(opts.itemSelector).each(function(i, elm) {
            if (elm != item) {
              let loc = $(elm).offset();
              loc.right = loc.left + $(elm).outerWidth(true);
              loc.bottom = loc.top + $(elm).outerHeight(true);
              loc.elm = elm;
              pos.push(loc);
            }
          });
          this.pos = pos;
        },

        dropItem: function() {
          if (list.draggedItem == null)
            return;
          $("iframe").css({"pointer-events":"auto"});

          $(list.container).find(opts.dragSelector).css("cursor", "default");
          list.placeHolderItem.before(list.draggedItem);

          list.draggedItem.css({ position: "", top: "", left: "", opacity: ""});
          list.placeHolderItem.remove();

          $("*[emptyPlaceHolder]").remove();

          opts.dragEnd.apply(list.draggedItem);
          list.draggedItem = null;
          $(document).unbind("selectstart", list.stopBubble);
          $(document).unbind("mousemove", list.swapItems);
          $(document).unbind("mouseup", list.dropItem);
          return false;
        },

        stopBubble: function() { return false; },

        swapItems: function(e) {
          if (list.draggedItem == null)
            return false;
          $("iframe").css({"pointer-events":"none"});
          list.setPos(e);
          let ei = list.findPos(e.pageX, e.pageY);
          let nlist = list;
          for (let i = 0; ei == -1 && !opts.dragBetween && i < lists.length; i++) {
            ei = lists[i].findPos(e.pageX, e.pageY);
            nlist = lists[i];
          }
          if (ei == -1 || $(nlist.pos[ei].elm).attr("placeHolder"))
            return false;

          if (lastPos == null || lastPos.top > list.draggedItem.offset().top || lastPos.left > list.draggedItem.offset().left)
            $(nlist.pos[ei].elm).before(list.placeHolderItem);
          else
            $(nlist.pos[ei].elm).after(list.placeHolderItem);

          $(lists).each(function(i, l) { l.ensureNotEmpty(); l.buildPositionTable(); });
          lastPos = list.draggedItem.offset();
          return false;
        },

        findPos: function(x, y) {
          let H=0;//判断水平移动的方向
          let V=0;//判断垂直移动的方向
          if(list.cursorPos==undefined){
            list.cursorPos=[x,y]
          }else{
            H = x - list.cursorPos[0];
            V= y - list.cursorPos[1];
            list.cursorPos=[x,y]
          }

          if(opts.horizontal&&opts.vertical){
            for (let i = 0; i < this.pos.length; i++) {
              if (this.pos[i].left < x && this.pos[i].right > x&& this.pos[i].top < y && this.pos[i].bottom > y)
                return i;
            }
          }else if(opts.horizontal&&!opts.vertical){//已经优化
            let L = list.draggedItem.offset().left;
            let R = L+list.draggedItem.outerWidth(true);
            if(H>0){
              for (let i = this.pos.length-1; i >=0; i--) {
                if(R>(this.pos[i].left+this.pos[i].right)/2){
                  return i;
                }
              }
            }else if(H<0){
              for (let i = 0; i < this.pos.length; i++) {
                if((this.pos[i].right+this.pos[i].left)/2<L){
                  continue;
                }else return i;
              }
            }
          }else if(!opts.horizontal&&opts.vertical){
            for (let i = 0; i < this.pos.length; i++) {
              if (this.pos[i].top < y && this.pos[i].bottom > y)
                return i;
            }
          }
          return -1;
        },

        ensureNotEmpty: function() {
          if (opts.dragBetween)
            return;

          let item = this.draggedItem == null ? null : this.draggedItem.get(0);
          let emptyPH = null, empty = true;

          $(this.container).find(opts.itemSelector).each(function(i, elm) {
            if ($(elm).attr("emptyPlaceHolder"))
              emptyPH = elm;
            else if (elm != item)
              empty = false;
          });

          if (empty && emptyPH == null)
            $(this.container).append(list.placeHolderItem.clone().removeAttr("placeHolder").attr("emptyPlaceHolder", true));
          else if (!empty && emptyPH != null)
            $(emptyPH).remove();
        }
      };
      newList.init();
      lists.push(newList);
    });

    return this;
  };

  $.fn.dragsort.defaults = {
    itemSelector: "li",
    dragSelector: "li",
    dragEnd: function() { },
    dragBetween: true,
    horizontal:true,
    vertical:false,
  };

})(jQuery);
