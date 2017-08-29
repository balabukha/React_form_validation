
var input = document.querySelectorAll('.js-date')[0];

// console.log(input);

var dateInputMask = function dateInputMask(elm) {
    elm.addEventListener('keypress', function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        var chr = getChar(e);

        if (chr == null) return;

        if (chr < '0' || chr > '9') {
            return e.preventDefault();
        }
        function getChar(event) {
            if (event.which == null) {
                if (event.keyCode < 32) return null;
                return String.fromCharCode(event.keyCode) // IE
            }

            if (event.which != 0 && event.charCode != 0) {
                if (event.which < 32) return null;
                return String.fromCharCode(event.which) // остальные
            }

            return null; // специальная клавиша
        }
        var len = elm.value.length;
        // console.log(chr);

        // If we're at a particular place, let the user type the slash
        // i.e., 12/12/1212
        if(len !== 1 || len !== 3) {
            if(e.keyCode == 46) {
                e.preventDefault();
            }
        }

        // If they don't add the slash, do it for them...
        if(len === 2) {
            elm.value += '.';
        }

        // If they don't add the slash, do it for them...
        if(len === 5) {
            elm.value += '.';
        }
    });
};

export default dateInputMask;