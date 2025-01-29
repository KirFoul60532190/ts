import {getTourTemplate} from "../../templates/tours";
import {openModal} from "@services/modal/modalService";
import {ITours} from "../../models/tours";
import {images} from "@services/img/img";
import {initFooterTitle, initHeaderTitle} from "@services/general/general";
import {getTours} from "@rest/tours";
export let  toursDataArray: ITours[] = [];
const imagesStore = images; // ссылка на изображения нужна чтобы webpack формировал изображения в папке dist

initHeaderTitle('Туры', 'h1');
initFooterTitle('Туры по всему миру', 'h2');
// init data
const tourData: Promise<ITours[]> = getTours();

tourData.then((data): void => {
    console.log('call ')
    toursDataArray = data;
    initToursDivElements(data);
});

function initToursDivElements(data) {

    if (Array.isArray(data)) {
        const rootElement: Element = document.querySelector('.main-app');
        const tourWrap = document.createElement('div');

        tourWrap.classList.add('tour-wrap');

        // init click for modal
        initTourElemListener(tourWrap);

        let rootElementData = '';
        data.forEach((el, i) => {
            rootElementData += getTourTemplate(el, i);
        });

        tourWrap.innerHTML = rootElementData;
        rootElement.appendChild(tourWrap) ;
    }
}


function initTourElemListener(tourWrap) {
    tourWrap.addEventListener('click', (ev) => {
        const targetItem = ev.target;
        const parentItem = targetItem?.parentNode;
        let realTarget;

        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }

        if (realTarget) {
            const dataIndex = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
        }
    });
}

