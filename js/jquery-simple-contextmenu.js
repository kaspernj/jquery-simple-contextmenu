$.fn.simpleContextMenu = function(args){
  this.contextmenu(function(event){
    $.simpleContextMenuRemoveAll()
    
    width = $.simpleContextMenuDefaults.width
    height_ele = $.simpleContextMenuDefaults.height_ele
    padding_ele = $.simpleContextMenuDefaults.padding_ele
    
    div = $("<div />", {
      "css": {
        "border": "1px solid " + $.simpleContextMenuDefaults.colors.border,
        "background-color": $.simpleContextMenuDefaults.colors.bg,
        "display": "none",
        "position": "absolute",
        "width": width + "px",
        "left": event.pageX,
        "top": event.pageY,
        "z-index": 9999999
      }
    })
    div.addClass("jquery_simple_contextmenu")
    
    for(key in args.eles){
      ele = args.eles[key]
      
      var div_ele_inact = $("<div />", {
        "css": {
          "position": "absolute",
          "width": (width - padding_ele * 2) + "px",
          "height": (height_ele - padding_ele * 2) + "px",
          "padding": padding_ele + "px"
        },
        "class": "jquery_simple_contextmenu_ele_inact"
      })
      var div_ele_act = $("<div />", {
        "css": {
          "position": "absolute",
          "display": "none",
          "background-color": $.simpleContextMenuDefaults.colors.bgactive,
          "width": (width - padding_ele * 2) + "px",
          "height": (height_ele - padding_ele * 2) + "px",
          "padding": padding_ele + "px"
        },
        "class": "jquery_simple_contextmenu_ele_act"
      })
      
      div_ele_inact.text(ele.title)
      div_ele_act.text(ele.title)
      
      var div_ele = $("<div />", {
        "css": {
          "position": "relative",
          "height": height_ele + "px",
          "cursor": "pointer"
        }
      })
      div_ele.hover(function(){
        $("div.jquery_simple_contextmenu_ele_inact", this).fadeOut("fast")
        $("div.jquery_simple_contextmenu_ele_act", this).fadeIn("fast")
      }, function(){
        $("div.jquery_simple_contextmenu_ele_act", this).fadeOut("fast")
        $("div.jquery_simple_contextmenu_ele_inact", this).fadeIn("fast")
      })
      
      if (ele.click){
        div_ele.click(ele.click)
      }else if(ele.url){
        div_ele.click(function(){
          location.href = ele.url
        })
      }
      
      div_ele.append(div_ele_inact)
      div_ele.append(div_ele_act)
      
      div.append(div_ele)
    }
    
    div_rela = $("<div />", {
      "css": {
        "position": "relative"
      }
    })
    div_rela.append(div)
    
    $("body").prepend(div_rela)
    div.fadeIn("fast")
    
    return false
  })
}

$.simpleContextMenuRemoveAll = function(){
  $("div.jquery_simple_contextmenu").fadeOut("fast", function(){
    $(this).parent().remove()
  })
}

$.simpleContextMenuDefaults = {
  "colors": {
    "border": "#686868",
    "bg": "#ffffff",
    "bgactive": "#c9d8f9"
  },
  "width": 200,
  "height_ele": 27,
  "padding_ele": 4
}

$(document).ready(function(){
  $("body").click(function(){
    $.simpleContextMenuRemoveAll()
  })
})