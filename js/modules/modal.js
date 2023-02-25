class Modal {
    #modal;
    constructor(modalSelector) {
        this.#modal = document.querySelector(modalSelector);
    }
    openModal() {
        this.#modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.#modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    get modal() {
        return this.#modal;
    }
} 

function modal(triggerSelector, modalSelector) {
    const modalTriggers = document.querySelectorAll(triggerSelector),
        modal = new Modal(modalSelector);
    modalTriggers.forEach((item) => item.addEventListener('click', () => modal.openModal()));
    modal.modal.addEventListener('click', (event) => {
        const target = event.target;
        if( target === modal || target.getAttribute('data-close') == '') {
            modal.closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')) {
            modal.closeModal();
        }
    }); 
}


export default modal;
