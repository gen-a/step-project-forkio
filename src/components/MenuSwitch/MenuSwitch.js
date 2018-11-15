const switchClassName = "MenuSwitch";
const switchOpenClassName = "MenuSwitch_isOpen";
const navClassName = "Header-Navigation";
const navActiveClassName = "Header-Navigation_isActive";

let addClass = function (elements, className) {
    elements.forEach(element => element.classList.add(className));
};

let removeClass = function (elements, className) {
    elements.forEach(element => element.classList.remove(className));
};

class MenuSwitch{
    constructor(element){
        let o = this;
        o.element = element;
        element.addEventListener("click", function (e) {
            e.preventDefault();

            let classList = document.querySelectorAll("."+navClassName)[0].classList,
                switches = document.querySelectorAll("."+switchClassName);

            if (classList.contains(navActiveClassName)) {
                removeClass(switches, switchOpenClassName);
                classList.remove(navActiveClassName);
            } else {
                addClass(switches, switchOpenClassName);
                classList.add(navActiveClassName);
            }
            return false;
        });
    }
}

export default {
    init: function () {
        document.querySelectorAll('.'+switchClassName).forEach(function (element) {
            new MenuSwitch(element);
        });
    }
};


