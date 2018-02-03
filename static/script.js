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
    $.post('/api/calculate_prime', { number: n }, function(data) {
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
    $.post('/api/get_prime_from_db', { number: n }, function(data) {
        displayResult(data.prime);
    });
}

function fermatTheorem(a, p) {
    return ((Math.pow(a, p - 1) % p) === 1);
}

function isPrimeFermat(n) {
    for(a = 2 ; a < n ; a++) {
        if(!fermatTheorem(a, n)) return false;
    }
    return true;
}

function displayResult(isPrime) {
    $('#false-result').html(isPrime ? '' : 'não');
    $('#result').css('visibility', 'visible');
}

$(document).ready(function() {
    $('body').tooltip({ selector: '[data-toggle=tooltip]' });
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