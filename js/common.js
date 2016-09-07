
var Msg = {
    error: function (content, error_div_id) {
        if (validate.IsNull(error_div_id)) {
            error_div_id = "#msg_error";
        }
        $(error_div_id).html(content);
        $(error_div_id).show();
    },
    clear: function() {
        $("#msg_error").hide();
        $(".myerror").hide();
    },
    info: function() {
        
    }
}

var validate= {
    IsNotIDNumber: function(num) {
        var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        return !reg.test($.trim(num));
    },
    IsNull: function (num) {
        if (num === undefined) {
            return true;
        }
        num = $.trim(num);
        if (num === ''||num===null) {
            return true;
        }
        return false;
    },
    IsNotDouble: function(num) {
        var reg = /^[+-]?\d*\.?\d{1,3}$/;
        return !reg.test($.trim(num));
    }
    
}
var MsgBox = (function () {
    var confirmCont = "<div id=\"confirmCont\" style=\"display: none;\" class=\"layui-layer-wrap\"> <div class=\"warning\"><span class=\"warning-gif mr10\"></span>{0}</div></div>";
    var msgCont = "<div class=\"div_orr\">{0}</div>";
    var Return = {
        confirm: function (msg, okFunction) {
            $("body").append(confirmCont.format(msg));
            //layer.ready(function() {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    btn: ['确定', '取消'],
                    area: ['230px', '120px'],
                    content: $('#confirmCont'),
                    yes: function (index, layero) {
                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                        okFunction();
                        
                    }
                });
          //  });
        },
        info: function(msg) {
            layer.msg(msgCont.format(msg), { time: 2000 });
        },
        error: function (msg) {
            //layer.open({
            //    type: 1,
            //    title: false,
            //    closeBtn: false,
            //    btn: ['确定'],
            //    area: ['230px', '120px'],
            //    content: msgCont.format(msg)
            //});
            layer.msg(msgCont.format(msg), { time: 3000 });
        }
    }

    return Return;
})();


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}
var myBrowser= {
    open: function(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "openwin");
        document.body.appendChild(a);
        a.click();
        $(a).remove();
    }
}