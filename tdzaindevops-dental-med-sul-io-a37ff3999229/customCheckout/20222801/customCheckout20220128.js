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
});


$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    console.log('atualizado!', orderForm);

    let clientCro = $('#client-cro').val();
    let clientBirthDate = $('#client-birth-date').val()

    let clientProfession = document.getElementById('professions');
    let professionValue = clientProfession.options[clientProfession.selectedIndex].text

    let orderFormId = vtexjs.checkout.orderFormId;

    let data = {
        'clientCRO': clientCro,
        'birthDate': clientBirthDate,
        'profession': professionValue
    };
    let settings = {
        url: '/api/checkout/pub/orderForm/' + orderFormId + '/customData/custom-customer-data',
        type: 'PUT',
        timeout: 0,
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }

    $.ajax(settings).done(function (response) {
        console.log('resposta', response)
    })
})
//fim document.ready

function enableShipping() {
    if ($('#client-birth-date').val() != "" && $('#client-cro').val() != "") {
        $('#go-to-shipping').prop('disabled', false)
        $('.error-cro').hide()
    }
}