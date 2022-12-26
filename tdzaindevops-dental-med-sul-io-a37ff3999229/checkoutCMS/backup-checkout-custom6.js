$(document).ready(function () {

    $('.payment-submit-wrap').append('<div class="block-btn"></div>')

    $('.client-phone').next().append('<div><p class="client-birth-date input pull-left text required"><label for="client-birth-date">Data de Nascimento</label><input type="date" id="client-birth-date" class="input-small" data-bind="required: true, disable: loading"><span class="help error error-date" style="">Campo obrigatório.</span></p><p class="client-cro input pull-left text required" style="margin-left: 10px;"><label for="client-cro">CRO</label><input type="text" id="client-cro" class="input-small"><span class="help error error-cro" style="display: none;">Campo obrigatório.</span></p></div>')

    enableShipping()
    $('.error-cro').show()


    $('.block-btn').on('click', function () {
        validDateBirth()
    })

    $('#client-first-name').live('click', (function () {
        enableShipping()
    }))
    $('#client-birth-date').blur(function () {
        if ($('#client-email').val()) {
            var email = $('#client-email').val()
        } else {
            var email = $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > div > fieldset.box-client-info-pf > p.client-email.text.required > span').text()
        }
        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "email": email,
                "birthDate": $('#client-birth-date').val()
            }),
            type: 'PATCH',
            url: '/api/dataentities/CL/documents/',
            success: function (data) {
                console.log(data)
            }
        });
        $('.error-date').hide()
        enableShipping();
        $('.error-birthdate').remove()
    })


    $('#client-cro').keyup(function () {
        if ($('#client-email').val()) {
            var email = $('#client-email').val()
        } else {
            var email = $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > div > fieldset.box-client-info-pf > p.client-email.text.required > span').text()
        }
        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "email": email,
                "clientCRO": $('#client-cro').val()
            }),
            type: 'PATCH',
            url: '/api/dataentities/CL/documents/',
            success: function (data) {
                console.log(data)
            }
        });
        enableShipping();
    })


    $('.payment-group-item-text').live('click', (function () {
        $('.spn-parc').html('')
        setTimeout(function () {
            if ($('.pg-boleto-faturado').hasClass('active')) {
                calc()
            }
            else if ($('.pg-boleto-faturado-com-desconto').hasClass('active')) {
                calcDesc()
            }
            if ($('.pg-faturamento-para-04-01').hasClass('active')) {
                calcPagPrazo()
            }
        }, 4000)
    }))


    setTimeout(function () {
        addDiscount200()
    }, 1500

    )





}) //fim document.ready


$(window).on('orderFormUpdated.vtex', function (event, orderForm) {
    if (orderForm.value < 10000) {
        $('.btn-place-order').addClass('disabled aviso-pedido-minimo');
    } else {
        $('.btn-place-order').removeClass('disabled aviso-pedido-minimo');
    }

});  //fim orderFormUpdated


function enableShipping() {
    if ($('#client-birth-date').val() != "" && $('#client-cro').val() != "") {
        $('#go-to-shipping').prop('disabled', false)
        $('.error-cro').hide()
    } else {
        $('#go-to-shipping').prop('disabled', true)
        $('.error-cro').show()
    }
}

function calcDesc() {
    $('.spn-parc').remove();
    $('.steps-view').append('<span class="spn-parc">Parcele em: <select id="opc-pag"><option value="">Selecione o parcelamento.</option></select></span>')
    var info = $('.sight span').html()
    info = info.split('R$ ')
    var valor = info[1]
    valor = valor.replace('.', '').replace(',', '.')
    valor = parseInt(valor)

    var sc = vtexjs.checkout.orderForm.salesChannel

    if (sc == '4' || sc == '5') {
        $('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 3%</option> ')
        $('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 3%</option> ')
    }
    if (sc == '1') {
        $('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 5%</option> ')
        $('#opc-pag').append('<option value="">Boleto a vista – 7 dias Desc 5%</option> ')
    }


    $('#opc-pag').on('change', function () {
        $('#cart-note').val($(this).find(':selected').text() + '.');
        $('#cart-note').blur()

    })
}



function calc() {
    $('.spn-parc').remove();
    $('.steps-view').append('<span class="spn-parc">Parcele em: <select id="opc-pag"><option value="">Selecione o parcelamento.</option></select></span>')
    var info = $('.sight span').html()
    info = info.split('R$ ')
    var valor = info[1]
    valor = valor.replace('.', '').replace(',', '.')
    valor = parseInt(valor)

    var sc = vtexjs.checkout.orderForm.salesChannel

    if (sc == '4' || sc == '5') {
        if (valor <= '2799') {
            var p = valor / 200
            p = Math.trunc(p)
            if (p > 0) {
                //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 3%</option> ')  
                //$('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 3%</option> ')  
                for (var i = 1; i <= '6'; i++) {
                    var rp = valor / i;
                    if (rp >= '200') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros </option> ')
                    }
                }
            } else {
                $('#opc-pag').append('<option value="">1x de R$' + valor.toFixed(2) + ' sem juros </option> ')
            }
        } else if (valor >= '2800' && valor <= '4499') {
            var p = valor / 400
            p = Math.trunc(p)
            if (p > 0) {
                //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 3%</option> ')  
                //$('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 3%</option> ') 
                for (var i = 1; i <= '8'; i++) {
                    var rp = valor / i;
                    if (rp >= '400') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros </option> ')
                    }
                }
            }
        } else if (valor >= '4500') {
            var p = valor / 500
            p = Math.trunc(p)
            if (p > 0) {
                //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 3%</option> ')  
                //$('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 3%</option> ') 
                for (var i = 1; i <= '10'; i++) {
                    var rp = valor / i;
                    if (rp >= '500') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros </option> ')
                    }
                }
            }
        }
    }
    if (sc == '1') {

        var p = valor / 150
        p = Math.trunc(p)
        if (p > 0) {
            //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 5%</option> ')  
            //$('#opc-pag').append('<option value="">Boleto a vista – 7 dias Desc 5%</option> ') 
            $('#opc-pag').append('<option value="">Boleto a vista – 1x de R$' + valor.toFixed(2) + ' para 30 dias</option> ')
            for (var x = 1; x <= '6'; x++) {
                var rp = valor / x;
                if (rp >= '150') {

                    if (x == '2') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45) sem juros</option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60) sem juros </option> ')
                    } else if (x == '3') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75) sem juros </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90) sem juros </option> ')

                    } else if (x == '4') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105) sem juros </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120) sem juros </option> ')

                    } else if (x == '5') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105+135) sem juros </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120+150) sem juros </option> ')

                    } else if (x == '6') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105+135+165) sem juros </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120+150+180) sem juros </option> ')

                    }
                }
            }
        } else {
            //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 5%</option> ')  
            //$('#opc-pag').append('<option value="">Boleto a vista – 7 dias Desc 5%</option> ') 
            $('#opc-pag').append('<option value="">Boleto a vista – 1x de R$' + valor.toFixed(2) + ' 30 dias</option> ')
        }
    }
    if (sc == '2') {

        if (valor <= '799') {
            var p = valor / 150
            p = Math.trunc(p)
            if (p > 0) {
                //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 5%</option> ')  
                //$('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 5%</option> ') 
                for (var y = 1; y <= p && y <= '3'; y++) {
                    var rp = valor / y;
                    $('#opc-pag').append('<option value="">' + y + 'x de R$' + rp.toFixed(2) + ' sem juros </option> ')
                }
            } else {
                $('#opc-pag').append('<option value="">1x de R$' + valor.toFixed(2) + ' sem juros </option> ')
            }
        } else if (valor >= '800') {
            var p = valor / 200
            p = Math.trunc(p)
            if (p > 0) {
                //$('#opc-pag').append('<option value="">Boleto a vista – 1 dia Desc 5%</option> ')  
                //$('#opc-pag').append('<option value="">Boleto a vista – 7 dia Desc 5%</option> ') 
                for (var y = 1; y <= '6'; y++) {
                    var rp = valor / y;
                    if (rp >= '200') {
                        $('#opc-pag').append('<option value="">' + y + 'x de R$' + rp.toFixed(2) + ' sem juros </option> ')
                    }
                }
            }
        }
    }


    $('#opc-pag').on('change', function () {
        $('#cart-note').val($(this).find(':selected').text() + '.');
        $('#cart-note').blur()

    })


}


function calcPagPrazo() {
    $('.spn-parc').remove();
    $('.steps-view').append('<span class="spn-parc">Parcele em: <select id="opc-pag"><option value="">Selecione o parcelamento.</option></select></span>')
    var info = $('.sight span').html()
    info = info.split('R$ ')
    var valor = info[1]
    valor = valor.replace('.', '').replace(',', '.')
    valor = parseInt(valor)

    var sc = vtexjs.checkout.orderForm.salesChannel

    if (sc == '4' || sc == '5') {
        if (valor <= '2799') {
            var p = valor / 200
            p = Math.trunc(p)
            if (p > 0) {
                for (var i = 1; i <= '6'; i++) {
                    var rp = valor / i;
                    if (rp >= '200') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros </option> (1ª Parcela p/ 04/01) ')
                    }
                }
            } else {
                $('#opc-pag').append('<option value="">1x de R$' + valor.toFixed(2) + ' sem juros </option> (1ª Parcela p/ 04/01) ')
            }
        } else if (valor >= '2800' && valor <= '4499') {
            var p = valor / 400
            p = Math.trunc(p)
            if (p > 0) {
                for (var i = 1; i <= '8'; i++) {
                    var rp = valor / i;
                    if (rp >= '400') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros </option> (1ª Parcela p/ 04/01) ')
                    }
                }
            }
        } else if (valor >= '4500') {
            var p = valor / 500
            p = Math.trunc(p)
            if (p > 0) {
                for (var i = 1; i <= '10'; i++) {
                    var rp = valor / i;
                    if (rp >= '500') {
                        $('#opc-pag').append('<option value="">' + i + 'x de R$' + rp.toFixed(2) + ' sem juros (1ª Parcela p/ 04/01)</option> ')
                    }
                }
            }
        }
    }
    if (sc == '1') {

        var p = valor / 150
        p = Math.trunc(p)
        if (p > 0) {
            $('#opc-pag').append('<option value="">Boleto a vista – 1x de R$' + valor.toFixed(2) + ' para 30 dias (1ª Parcela p/ 04/01)</option> ')
            for (var x = 1; x <= '6'; x++) {
                var rp = valor / x;
                if (rp >= '150') {

                    if (x == '2') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45) sem juros (1ª Parcela p/ 04/01)</option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60) sem juros (1ª Parcela p/ 04/01) </option> ')
                    } else if (x == '3') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75) sem juros (1ª Parcela p/ 04/01) </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90) sem juros (1ª Parcela p/ 04/01) </option> ')

                    } else if (x == '4') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105) sem juros (1ª Parcela p/ 04/01) </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120) sem juros (1ª Parcela p/ 04/01) </option> ')

                    } else if (x == '5') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105+135) sem juros (1ª Parcela p/ 04/01) </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120+150) sem juros (1ª Parcela p/ 04/01) </option> ')

                    } else if (x == '6') {
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (15+45+75+105+135+165) sem juros (1ª Parcela p/ 04/01) </option> ')
                        $('#opc-pag').append('<option value="">' + x + 'x de R$' + rp.toFixed(2) + ' (30+60+90+120+150+180) sem juros (1ª Parcela p/ 04/01) </option> ')

                    }
                }
            }
        } else {
            $('#opc-pag').append('<option value="">Boleto a vista – 1x de R$' + valor.toFixed(2) + ' 30 dias</option> (1ª Parcela p/ 04/01) ')
        }
    }
    if (sc == '2') {

        if (valor <= '799') {
            var p = valor / 150
            p = Math.trunc(p)
            if (p > 0) {
                for (var y = 1; y <= p && y <= '3'; y++) {
                    var rp = valor / y;
                    $('#opc-pag').append('<option value="">' + y + 'x de R$' + rp.toFixed(2) + ' sem juros </option> (1ª Parcela p/ 04/01) ')
                }
            } else {
                $('#opc-pag').append('<option value="">1x de R$' + valor.toFixed(2) + ' sem juros </option> (1ª Parcela p/ 04/01) ')
            }
        } else if (valor >= '800') {
            var p = valor / 200
            p = Math.trunc(p)
            if (p > 0) {
                for (var y = 1; y <= '6'; y++) {
                    var rp = valor / y;
                    if (rp >= '200') {
                        $('#opc-pag').append('<option value="">' + y + 'x de R$' + rp.toFixed(2) + ' sem juros (1ª Parcela p/ 04/01) </option> ')
                    }
                }
            }
        }
    }


    $('#opc-pag').on('change', function () {
        $('#cart-note').val($(this).find(':selected').text() + '.');
        $('#cart-note').blur()

    })


}

function validDateBirth() {
    if ($('#client-email').val()) {
        var email = $('#client-email').val()
    } else {
        var email = $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > div > fieldset.box-client-info-pf > p.client-email.text.required > span').text()
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/dataentities/CL/search?_fields=birthDate%2C&_where=email%3D" + email,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/vnd.vtex.ds.v10+json"
        }
    }
    $.ajax(settings).done(function (response) {
        var data = Date.parse('0001-01-01T00:00:00')
        var dataI = Date.parse(response[0].birthDate)
        if (data == dataI || !dataI) {
            $('.error-birthdate').remove()
            $('.payment-submit-wrap').append('<span style="color: red;" class="error-birthdate">É necessario informar a sua data de nascimento no box de "Dados Pessoais" para finalizar o pedido!</span>')
        } else {
            $('.error-birthdate').remove()
            $('.block-btn').remove()
            $('.submit').click()
        }
    });
}

function addDiscount200() {
    if (vtexjs.checkout.orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers["length"] > 0) {
        for (var i = 0; vtexjs.checkout.orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers.length > i; i++) {
            if (vtexjs.checkout.orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers[i].name == "Frete Grátis Região Sul/ Sudeste/ Centro-Oeste") {
                vtexjs.checkout.getOrderForm()
                    .then(function (orderForm) {
                        var code = 'fretegratis200';
                        return vtexjs.checkout.addDiscountCoupon(code);
                    }).then(function (orderForm) {
                        console.log('cupom adicionado')
                    });
            }
        }
    }
}
