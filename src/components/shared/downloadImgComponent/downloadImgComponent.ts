import './../modalWindowComponent/modalWindowComponent.scss';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

/*
The DownloadImgComponent and modalWindowComponent have similar behavior, that's mean in future
I could make an abstract class for the modal behavior, then my modalWindowComponent and downloadImgComponent
can extend from this one and implement the methods like addEvents and createModalWindow for example
*/
export default class DownloadImgComponent {
    private modal: HTMLDivElement;
    constructor(
        private pixelArtNavigation = document.querySelector('.js-pixel-art-navigation'),
        private imgToDownload = <HTMLDivElement>document.querySelector('.js-pixel-art-grid-container')) {
        this.addBtnDownloadImg();
    }

    public initializeModalWindow(): void {
        this.createModalWindow().then((modal) => {
            this.modal = modal;
            this.addEvents(modal);
        });
    }

    private createModalWindow(): Promise<HTMLDivElement> {
        return new Promise((promise) => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            
            const closeButton = document.createElement('span');
            closeButton.classList.add('close');
            closeButton.innerHTML = '&times;';

            const input = document.createElement('input');
            input.classList.add('js-download-img-name');
            input.placeholder = 'Save as';
            modalContent.appendChild(input);
            modalContent.appendChild(this.getHTMLSelectItem());
            modalContent.appendChild(this.getSubmitDownloadImg());
            modalContent.appendChild(closeButton);
            modal.appendChild(modalContent);
            promise(modal);
        });
    }

    private getHTMLSelectItem(): HTMLSelectElement {
        const select = <HTMLSelectElement>document.createElement('select');
        select.classList.add('js-select-img-extension');
        select.classList.add('select-img-extension');
        ['png', 'jpeg', 'gif'].forEach((typeExtension) => {
            const optionItem = document.createElement('option');
            optionItem.value = typeExtension.toString();
            optionItem.innerText = typeExtension.toUpperCase();
            select.appendChild(optionItem);
        });
        return select;
    }

    private getSubmitDownloadImg(): HTMLButtonElement {
        const button = document.createElement('button');
        button.innerText ='OK';
        button.addEventListener(('click'), () => {
            const input = (<HTMLInputElement>document.querySelector('.js-download-img-name'));
            if (!input.value || input.value.trim().length === 0) return;

            this.downloadImg(); 
        });
        return button;
    }

    private addEvents(modal: HTMLDivElement): void {
        document.body.appendChild(modal);
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;
        modal.style.display = "block";

        // When the user clicks on <span> (x), remove the modal
        span.onclick = function() {
        modal.remove();
        }

        // When the user clicks anywhere outside of the modal, remove it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.remove();
            }
        }
    }

    private addBtnDownloadImg(): void {
        const button = document.createElement('button');
        button.classList.add('js-download-img');
        button.classList.add('download-img');
        button.innerText = 'Download';
        button.addEventListener('click', () => {
            this.initializeModalWindow();
        });
        this.pixelArtNavigation.appendChild(button);
    }

    private downloadImg(): void {
        //TODO: the function makes an incomplete img, that's why I need to remove the margin
        // also for now the package doesn't save gif files, only jpeg and png.
        this.imgToDownload.style.marginLeft = '0';
        this.imgToDownload.style.marginRight = '0';
        const name = `${(<HTMLInputElement>document.querySelector('.js-download-img-name')).value}.${(<HTMLSelectElement>document.querySelector('.js-select-img-extension')).value}`;
        const extension = (<HTMLSelectElement>document.querySelector('.js-select-img-extension')).value;
        if (extension === 'jpeg') {
            domtoimage.toJpeg(this.imgToDownload)
            .then((jpeg) => {
                saveAs(jpeg, name);
                this.modal.remove();
                this.imgToDownload.style.marginLeft = 'auto';
                this.imgToDownload.style.marginRight = 'auto';
            });
        } else {
            domtoimage.toBlob(this.imgToDownload)
            .then((blob) => {
                saveAs(blob, name);
                this.modal.remove();
                this.imgToDownload.style.marginLeft = 'auto';
                this.imgToDownload.style.marginRight = 'auto';
            });
        }
    }

}