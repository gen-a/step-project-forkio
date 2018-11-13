class Carousel {
    constructor(element) {
        let o = this;
        o.container = element.querySelectorAll('.Carousel-Items')[0];
        o.items = element.querySelectorAll('.Carousel-Item');
        o.length = o.items.length;
        o.current = 0;

        element
            .querySelectorAll('.Carousel-Button_left')[0]
            .addEventListener('click', o.goToPrev.bind(o));

        element
            .querySelectorAll('.Carousel-Button_right')[0]
            .addEventListener('click', o.goToNext.bind(o));

    }

    itemIndex(current) {
        return current < 0 ? ( this.length +  (current % this.length) ) % this.length : current % this.length;
    }

    setItemStyle(item, index, offset){
        item.style.order = ( this.length + index ) % this.length + 1;
        item.style.transform = `translateX(${(offset * 100)}%)`;
    }
    setContainerStyle(offset){
        this.container.style.transform = `translateX(${offset * -100}%)`;
    }

    goToNext() {
        let o = this, index = o.itemIndex(o.current);
        o.items.forEach(
            (item, i) =>  o.setItemStyle( item, i - index, o.current )
        );
        o.setContainerStyle(++o.current);
    }

    goToPrev() {
        let o = this, index = o.itemIndex(o.current);
        o.items.forEach(
            (item, i) => o.setItemStyle( item, i - index - 1, o.current - o.length + 1 )
        );
        o.setContainerStyle(--o.current);
    }
}

export default {
    init: function () {
        document.querySelectorAll('.Carousel').forEach(function (element) {
            new Carousel(element);
        });
    }
};