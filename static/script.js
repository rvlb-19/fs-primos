function checkPrime(p, option) {
    if(option === 'server') {
        isPrimeServer(p);
    } else if(option === 'browser') {
        displayResult(isPrimeBrowser(p));
    } else if(option === 'database') {
        isPrimeDatabase(p);
    } else if(option === 'fermat') {
        displayResult(isPrimeFermat(p));
    }
}

function isPrimeServer(n) {
    $.post('/api/calculate_prime', { number: p }, function(data) {
        displayResult(data.prime);
    });
}

function isPrimeBrowser(n) {
    if(n <= 1) return false;
    for(i = 2 ; i*i <= n ; i++) {
        if(n % i == 0) return false;
    }
    return true;
}

function isPrimeDatabase(n) {

}

function isPrimeFermat(n) {
    return true;
}

function displayResult(isPrime) {
    $('#false-result').html(isPrime ? '' : 'não');
    $('#result').css('visibility', 'visible');
}

$(document).ready(function() {
    $('#prime-form').submit(function(e) {
        e.preventDefault();
        var number = parseInt($('input[name=number]').val());
        var option = $('input[name=calc-option]:checked').val();
        if(number) {
            checkPrime(number, option);
            $('#typed-number').html(number);
        } else {
            alert('Digite um número!');
        }
    });
});