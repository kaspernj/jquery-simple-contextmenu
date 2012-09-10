$.fn.simpleContextMenu = function(args){
  this.contextmenu(function(event){
    $.simpleContextMenuRemoveAll()
    
    width = $.simpleContextMenuDefaults.width
    height_ele = $.simpleContextMenuDefaults.height_ele
    padding_ele = $.simpleContextMenuDefaults.padding_ele
    fade_time = $.simpleContextMenuDefaults.fade_time
    fade_time_ele = $.simpleContextMenuDefaults.fade_time_ele
    
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
      
      if (fade_time_ele == false){
        //This highlights the element by simply changing its background-color.
        var div_ele = $("<div />", {
          "css": {
            "padding": padding_ele + "px"
          },
          "text": ele.title
        })
        div_ele.hover(function(){
          $(this).css({
            "background-color": $.simpleContextMenuDefaults.colors.bgactive
          })
        }, function(){
          $(this).css({
            "background-color": ""
          })
        })
      }else{
        //Create three elements. One for when the mouse is hovering, one for when its not and one to trick the browser into making the parent element the right size. Then fade between the two absolute elements based on mouse-hover.
        var div_ele_inact = $("<div />", {
          "css": {
            "position": "absolute",
            "width": (width - padding_ele * 2) + "px",
            "padding": padding_ele + "px"
          },
          "class": "jquery_simple_contextmenu_ele_inact",
          "text": ele.title
        })
        var div_ele_act = $("<div />", {
          "css": {
            "position": "absolute",
            "display": "none",
            "background-color": $.simpleContextMenuDefaults.colors.bgactive,
            "width": (width - padding_ele * 2) + "px",
            "padding": padding_ele + "px"
          },
          "class": "jquery_simple_contextmenu_ele_act",
          "text": ele.title
        })
        var div_ele_size = $("<div />", {
          "css": {
            "visibility": "hidden",
            "padding": padding_ele + "px"
          },
          "text": ele.title
        })
        
        var div_ele = $("<div />", {
          "css": {
            "position": "relative",
            "cursor": "pointer"
          }
        })
        div_ele.hover(function(){
          $("div.jquery_simple_contextmenu_ele_inact", this).fadeOut(fade_time_ele)
          $("div.jquery_simple_contextmenu_ele_act", this).fadeIn(fade_time_ele)
        }, function(){
          $("div.jquery_simple_contextmenu_ele_act", this).fadeOut(fade_time_ele)
          $("div.jquery_simple_contextmenu_ele_inact", this).fadeIn(fade_time_ele)
        })
      }
      
      args_pass = {}
      if (args.args_pass){
        args_pass["args"] = args.args_pass
      }
      
      if (ele.click){
        div_ele.click((function(ele, args_pass){
          return function(){
            ele.click.apply(ele, [args_pass])
          }
        })(ele, args_pass))
      }else if(ele.url){
        div_ele.click(function(){
          location.href = ele.url
        })
      }else{
        throw("No type of callback was given.")
      }
      
      div_ele.append(div_ele_inact)
      div_ele.append(div_ele_act)
      div_ele.append(div_ele_size)
      
      div.append(div_ele)
    }
    
    div_rela = $("<div />", {
      "css": {
        "position": "relative"
      }
    })
    div_rela.append(div)
    
    $("body").prepend(div_rela)
    div.fadeIn(fade_time)
    
    return false
  })
}

$.simpleContextMenuRemoveAll = function(){
  $("div.jquery_simple_contextmenu").fadeOut($.simpleContextMenuDefaults.fade_time, function(){
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
  "padding_ele": 4,
  "fade_time": 300,
  "fade_time_ele": false
}

$(document).ready(function(){
  $("body").click(function(){
    $.simpleContextMenuRemoveAll()
  })
})