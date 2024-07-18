"use strict";

const initPageTabs = () => {
    const pagesTabs = document.querySelectorAll('[data-page-tab]');
    const pages = document.querySelectorAll('[data-page]');
    const burgerMenu = document.querySelector('.burger-menu');

    if (!pagesTabs || !pages) return

    pagesTabs.forEach(tab => {
        const tabPageType = tab.dataset.pageTab;
        const allSuitableTabs = Array.from(pagesTabs).filter(tab => tab.dataset.pageTab === tabPageType);
        const tabPage = Array.from(pages).find(page => page.dataset.page === tabPageType);

        tab.addEventListener('click', () => {
            pagesTabs.forEach(tab => tab.classList.remove('is-active'));
            pages.forEach(page => page.classList.remove('is-visible'));

            tabPage.classList.add('is-visible');
            allSuitableTabs.forEach(tab => tab.classList.add('is-active'));

            if (burgerMenu.classList.contains('is-open')) burgerMenu.classList.remove('is-open');;
        })
    })

}

const initBurgerMenu = () => {
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector('.burger-menu');

    if (!burger || !burgerMenu) return;

    const burgerMenuClose = burgerMenu.querySelector('.burger-menu__close');

    burger.addEventListener('click', () => {
        burgerMenu.classList.add('is-open');
    });

    burgerMenuClose.addEventListener('click', () => {
        burgerMenu.classList.remove('is-open');
    });

}

const initAccordions = () => {
    const accordions = document.querySelectorAll('[data-accordion]');

    if (!accordions) return;

    accordions.forEach(accordion => {
        const accordionFoldedElements = accordion.querySelectorAll('[data-fold]');

        accordionFoldedElements.forEach((foldedElement, i) => {
            const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
            const foldedElementsWithoutCurrent = Array.from(accordionFoldedElements).filter((element, j) => i !== j);

            foldedElementBtn.addEventListener('click', () => closeOtherFoldedElements(foldedElementsWithoutCurrent));
        })

    })

    function closeOtherFoldedElements(foldedElements) {
        foldedElements.forEach(element => {
            const foldedElementBtn = element.querySelector('[data-fold-btn]');
            const foldedElementContent = element.querySelector('[data-fold-content]');

            foldedElementContent.style.height = `${foldedElementContent.scrollHeight}px`;
            window.getComputedStyle(foldedElementContent, null).getPropertyValue("height");
            foldedElementContent.style.height = "0";
            foldedElementBtn.classList.remove("is-active");
            foldedElementContent.classList.remove("is-expanded");

            foldedElementContent.addEventListener("transitionend", () => {
                if (foldedElementContent.style.height !== "0px") {
                    foldedElementContent.style.height = "auto";
                }
            });
        })
    }
}

const initFoldedElements = () => {
    const foldedElements = document.querySelectorAll('[data-fold]');

    if (!foldedElements) return;

    foldedElements.forEach(foldedElement => {
        let foldedElementContent;
        const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
        foldedElementContent = foldedElement.querySelectorAll('[data-fold-content]')

        if (foldedElement.classList.contains('is-dropdown')) {
            foldedElementContent = foldedElement.querySelector('[data-fold-content]')
        }

        heightToggleElement(foldedElementBtn, foldedElementContent);
    })
}

function heightToggleElement(toggler, blocks) {
    toggler.addEventListener("click", (e) => {
        e.preventDefault();

        if (blocks instanceof NodeList) {
            blocks.forEach(function (block) {
                addFunctionality(toggler, block);
            });
        } else {
            addFunctionality(toggler, blocks);
        }
    });

    function addFunctionality(toggler, block) {
        if (block.style.height === "0px" || !block.style.height && !block.classList.contains('is-expanded')) {
            block.style.height = `${block.scrollHeight}px`;
            toggler.classList.add("is-active");
            block.classList.add("is-expanded");
        } else {
            block.style.height = `${block.scrollHeight}px`;
            window.getComputedStyle(block, null).getPropertyValue("height");
            block.style.height = "0";
            toggler.classList.remove("is-active");
            block.classList.remove("is-expanded");
        }

        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initFoldedElements();
    initAccordions();
    initPageTabs();
})