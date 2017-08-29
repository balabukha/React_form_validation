/**
 * Created by balabukha on 25.08.17.
 */

// var textarea = document.querySelector('textarea.auto-expanding');

var autoHeight = function(textarea){
    console.log(textarea);

    textarea.addEventListener('keydown', autosize);
    function autosize(){
        console.log(textarea);
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }
};

export default autoHeight;