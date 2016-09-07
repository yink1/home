
var order = {
    cancel: function (ele) {
        Msg.clear();
        var thisObj = $(ele);
        MsgBox.confirm("确认取消订单吗？", function() {
            $.post(order.baseUrl + "order/cancel", { id: thisObj.attr("data-id") })
                .done(function(data) {
                    if (data.ret === 0) {
                        //Msg.error("取消成功");
                        window.location.reload();
                        return;
                    }
                    MsgBox.error("取消失败");
                })
                .fail(function() {
                    MsgBox.error("取消失败");
                });
        });

    },
    submit: function() {
        var isAgree = $("#isagree").attr("checked") === "checked" ? true : false;
        if (!isAgree) {
            Msg.error("请阅读并同意《投资顾问业务风险揭示书》！");
            return;
        }
        var prodId = $("#prod_id").val();
        if (validate.IsNull(prodId)) {
            Msg.error("请选择产品");
            return;
        }
        $("#frmConfirm").submit();
    },
    pay: function (id) {
        Msg.clear();
        if (validate.IsNull(id)) {
            Msg.error("订单号不能为空");
            return;
        }
        var banktype = $("input[name=bank_type]:checked").val();
        if (validate.IsNull(banktype)) {
            Msg.error("请选择银行");
            return;
        }
        var amount = $("#amount").val();
        amount = $.trim(amount);
        if (validate.IsNull(amount)) {
            Msg.error("支付金额不能为空");
            return;
        }
        if (validate.IsNotDouble(amount)) {
            Msg.error("支付金额格式不正确");
            return ;
        }
        amount = new Number(amount);
        if (amount > new Number($("#unPaid").val()) || amount < 0.01) {
            Msg.error("支付金额不能大于未支付的金额且不能小于0.01");
            return;
        }
        layer.open({
            title: false,
            type: 1,
            area: ['440px', '150px'],
            closeBtn: false,
            content: $('.zhifu-box'),
            success: function (layero, index) {
                $('.zhifu-box').find('.zhifu-huidiao').data('zhifuindex', index);
            }
        });
        $.post(this.baseUrl + "pay/createtrans", { id: id, banktype: banktype, amount: amount })
            .done(function(data) {
                if (data.Code !== 0) {
                    Msg.error("支付失败！请重试");
                    return;
                }
                myBrowser.open(data.pay_url);
            })
            .fail(function () { Msg.error("支付失败！请重试"); }).always(function () {  });


    },
    saveContract: function () {
        Msg.clear();
        var id = $("#id").val();
        if (validate.IsNull(id)) {
            Msg.error("合同编号不能为空");
            return;
        }

        var typeid = $("#typeid").val();
        if (validate.IsNull(typeid)) {
            Msg.error("证件类型不能为空", "#id_error");
            return;
        }
        
        var ccode = $("#ccode").val();
        if (validate.IsNull(ccode)) {
            Msg.error("证件号不能为空", "#id_error");
            return;
        }
        if (typeid==='1'&&validate.IsNotIDNumber(ccode)) {
            Msg.error("身份证号格式不正确", "#id_error");
            return;
        }
        var signname = $("#signname").val();
        if (validate.IsNull(signname)) {
            Msg.error("甲方不能为空", "#name_error");
            return;
        }
        $.post(this.baseUrl + "contract/save", { id: id, typeid: typeid, signname: signname, ccode: ccode })
            .done(function(data) {
                if (data.ret === 0) {
                        var pid = $("#pid").val();
                        if (!validate.IsNull(pid)) {//不需要支付
                            myBrowser.open(order.baseUrl + "order/confirm?" + "prod_id=" + pid + "&contractid=" + id);
                        }
                       $(".touzi-huidiao").click();
                   return;
                }
                Msg.error("保存失败");
        }).fail(function() {
            Msg.error("保存失败");
        });
    }
}
order.baseUrl = typeof (urlConfig) == undefined ? "/" : urlConfig.baseUrl;



