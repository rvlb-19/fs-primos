function toggleSpinner(type, visibility) {
    $('#result-'+type+' .fa-spinner').css('visibility', visibility ? 'visible' : 'hidden');
}

function primeAsyncRequest(url, n, type, begin) {
    $.post(url, { number: n }, function(data) {
        var end = Date.now();
        var delta = end - begin;
        displayResult(n, data, type, delta);
    });
}

function isPrimeServer(n, begin) {
    toggleSpinner('server', true);
    primeAsyncRequest('/api/calculate_prime', n, 'server', begin);
}

function isPrimeDatabase(n, begin) {
    toggleSpinner('db', true);
    primeAsyncRequest('/api/get_prime_from_db', n, 'db', begin);
}

function isPrimeFermat(n, begin) {
    toggleSpinner('fermat', true);
    primeAsyncRequest('/api/fermat', n, 'fermat', begin);
}

function isPrime(n) {
    if(n <= 1) return { prime: false, reason: 'Número menor do que 1' };
    for(i = 2 ; i*i <= n ; i++) {
        if(n % i == 0) return { prime: false, reason: i+' é divisor' };
    }
    return { prime: true, reason: '' };
}

function isPrimeBrowser(n, begin) {
    toggleSpinner('browser', true);
    var result = isPrime(n);
    var end = Date.now();
    var delta = end - begin;
    displayResult(n, result, 'browser', delta);
}

function displayResult(number, data, type, delta) {
    toggleSpinner(type, false);
    var isPrime = data.prime;

    $('#text-'+type).html(number + (isPrime ? ' é primo' : ' não é primo'));
    $('#delta-'+type).html('Tempo de execução: '+delta+'ms');
    $('#result-'+type).css('visibility', 'visible');

    console.log(data);

    if(isPrime) $('#tooltip-'+type).hide();
    else {
        $('#tooltip-'+type).tooltip('dispose');
        $('#tooltip-'+type).tooltip({ title: data.reason }).show();
    }
}

function hideResults() {
    $('#result-browser').css('visibility', 'hidden');
    $('#result-server').css('visibility', 'hidden');
    $('#result-db').css('visibility', 'hidden');
    $('#result-fermat').css('visibility', 'hidden');
}

function dispatchRequests(number) {
    hideResults();
    var begin = Date.now();
    isPrimeServer(number, begin);
    isPrimeDatabase(number, begin);
    isPrimeFermat(number, begin);
    isPrimeBrowser(number, begin);
}

$(document).ready(function() {
    $('body').tooltip({ selector: '[data-toggle=tooltip]' });
    $('#prime-form').submit(function(e) {
        e.preventDefault();
        var number = parseInt($('input[name=number]').val());
        if(number) {
            dispatchRequests(number);
            $('#typed-number').html(number);
        } else {
            alert('Digite um número!');
        }
    });
});