import './modalWindowComponent.scss';

export default class ModalWindowComponent {
    constructor(private message: string) {
    }
    
    public initializeModalWindow(): void {
        this.createModalWindow(this.message).then((modal) => this.addEvents(modal));
    }

    private createModalWindow(message: string): Promise<HTMLDivElement> {
        return new Promise((promise) => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            const closeButton = document.createElement('span') as HTMLSpanElement;
            closeButton.classList.add('close');
            closeButton.innerHTML = '&times;';
            modalContent.appendChild(closeButton);
            const text = document.createElement('p') as HTMLParagraphElement;
            text.innerText = message;
            modalContent.appendChild(text);
            modal.appendChild(modalContent);
            promise(modal);
        });
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
}