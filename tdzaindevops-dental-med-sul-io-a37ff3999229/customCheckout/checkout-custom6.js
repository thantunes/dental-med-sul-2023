$(document).ready(function () {

    $('.payment-submit-wrap').append('<div class="block-btn"></div>')

    $('.client-phone').next().append('<div><p class="client-birth-date input pull-left text required"><label for="client-birth-date">Data de Nascimento</label><input type="date" id="client-birth-date" class="input-small" data-bind="required: false, disable: loading"></p><p class="client-cro input pull-left text required" style="margin-left: 10px;"><label for="client-cro">CRO</label><input type="text" id="client-cro" class="input-small"></p></div>')


    // Lista de profissões
    $('.client-phone').next().append('<div class="professionsList"> <label for="professions">Qual sua profissão?</label> <select name="professions" id="professions"> <option value="" selected="selected"></option> <option value="">Cirurgião Dentista</option> <option value="">Acadêmico de Odontologia</option> <option value="">Biomédico</option> <option value="">Farmacêutico</option> <option value="">Outros</option> </select> </div>')

    enableShipping()
    $('.error-cro').show()

    $('.block-btn').on('click', function () {
        validDateBirth()
    })

    $('#client-first-name').live('click', (function () {
        enableShipping()
    }))

    // Validação do email OnBLur
    // $('#client-birth-date').blur(function () {
    //     if ($('#client-email').val()) {
    //         var email = $('#client-email').val()
    //     } else {
    //         var email = $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > div > fieldset.box-client-info-pf > p.client-email.text.required > span').text()
    //     }
    //     $.ajax({
    //         headers: {
    //             'Accept': 'application/vnd.vtex.ds.v10+json',
    //             'Content-Type': 'application/json',
    //         },
    //         data: JSON.stringify({
    //             "email": email,
    //             "birthDate": $('#client-birth-date').val()
    //         }),
    //         type: 'PATCH',
    //         url: '/api/dataentities/CL/documents/',
    //         success: function (data) {
    //             console.log(data)
    //         }
    //     });
    //     $('.error-date').hide()
    //     enableShipping();
    //     $('.error-birthdate').remove()
    // })


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
                "clientCRO": $('#client-cro').val(),
                "birthDate": $('#client-birth-date').val(),
                "profession": $('#professions').val()
            }),
            type: 'PATCH',
            url: '/api/dataentities/CL/documents/',
            success: function (data) {
                console.log('data success')
            }
        });
        // enableShipping();
    })


    // Custom fields in order form
    $('#go-to-shipping').keyup(function () {
        let orderFormId = vtexjs.checkout.orderFormId;

        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "clientCRO": $('#client-cro').val(),
                
            }),
            type: 'PUT',
            url: '/api/checkout/pub/orderForm/' + orderFormId + '/customData/custom-customer-data',
            success: function (data) {
                console.log('data success')
            }
        });
        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "clientCRO": $('#client-cro').val(),
                "birthDate": $('#client-birth-date').val(),
                "profession": $('#professions').val()
            }),
            type: 'PATCH',
            url: '/api/dataentities/CL/documents/',
            success: function (data) {
                console.log('data success')
            }
        });
    });



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



})
//fim document.ready

function enableShipping() {
    if ($('#client-birth-date').val() != "" && $('#client-cro').val() != "") {
        $('#go-to-shipping').prop('disabled', false)
        $('.error-cro').hide()
    }
    // else {
    //     $('#go-to-shipping').prop('disabled', false)
    //     $('.error-cro').show()
    // }
}


// function validDateBirth() {
//     if ($('#client-email').val()) {
//         var email = $('#client-email').val()
//     } else {
//         var email = $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > div > fieldset.box-client-info-pf > p.client-email.text.required > span').text()
//     }

//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "/api/dataentities/CL/search?_fields=birthDate%2C&_where=email%3D" + email,
//         "method": "GET",
//         "headers": {
//             "content-type": "application/json",
//             "accept": "application/vnd.vtex.ds.v10+json"
//         }
//     }
//     $.ajax(settings).done(function (response) {
//         var data = Date.parse('0001-01-01T00:00:00')
//         var dataI = Date.parse(response[0].birthDate)
//         if (data == dataI || !dataI) {
//             $('.error-birthdate').remove()
//             $('.payment-submit-wrap').append('<span style="color: red;" class="error-birthdate">É necessario informar a sua data de nascimento no box de "Dados Pessoais" para finalizar o pedido!</span>')
//         } else {
//             $('.error-birthdate').remove()
//             $('.block-btn').remove()
//             $('.submit').click()
//         }
//     });
// }

// $(window).on('orderFormUpdated.vtex', function(event, orderForm) {
//         if(orderForm.value < 10000) {
//             $('.btn-place-order').addClass('disabled aviso-pedido-minimo');
//         }   else {
//             $('.btn-place-order').removeClass('disabled aviso-pedido-minimo');
//         }

// });
//fim orderFormUpdated
