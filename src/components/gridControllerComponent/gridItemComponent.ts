import { getActiveColorPalette } from '../colorsPaletteComponent/colorsPaletteItemComponent';
import ModalWindowComponent from '../shared/modalWindowComponent/modalWindowComponent';

const COLOR_PALETTE_NOT_SET = 'Please select first a color of the Palette, then try again.'
export default class GridItemControllerComponent {
    constructor(private bucketTool = <HTMLInputElement>document.querySelector('#bucket-tool')) {
        this.bucketTool.checked = false;
    }
    public addGridItem(numItems: number): HTMLDivElement {
        const gridItem = document.createElement('div');
        gridItem.classList.add('js-pixel-art-grid-item');
        gridItem.classList.add('pixel-art-grid__item');
        gridItem.style.setProperty('--total-grid-items', `${(100/numItems)}%`);

        gridItem.addEventListener('click', (e) =>  this.addColorToGridItem((e.target as HTMLDivElement)));
        return gridItem;
    }

    private addColorToGridItem(gridItem: HTMLElement): void {
        const activeColorPalette = getActiveColorPalette();
        if (!activeColorPalette) {
            new ModalWindowComponent(COLOR_PALETTE_NOT_SET).initializeModalWindow();
            return;
        }

        if (this.bucketTool.checked) {
            this.paintFullGrid();
        } else {
            gridItem.style.setProperty('--background-color', `#${activeColorPalette.hexaCode}`);
        }
    }

    private paintFullGrid(): void {
        Array.from(document.querySelectorAll('.js-pixel-art-grid-item')).forEach(item => (item as HTMLDivElement).style.setProperty('--background-color', `#${getActiveColorPalette().hexaCode}`));
    }
}