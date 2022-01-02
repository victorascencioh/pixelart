import DownloadImgComponent from '../shared/downloadImgComponent/downloadImgComponent';
import './gridComponent.scss';
import GridItemControllerComponent from './gridItemComponent';

enum gridOptionType {
    mini = 'mini',
    small = 'small',
    medium = 'medium',
    large = 'large',
}

interface gridSizeOption {
    type: string;
    size: number;
}

const GRID_SIZE_OPTIONS: gridSizeOption[] = [
    {
        type: gridOptionType.mini,
        size: 8,
    },
    {
        type: gridOptionType.small,
        size: 12,
    },
    {
        type: gridOptionType.medium,
        size: 16,
    },
    {
        type: gridOptionType.large,
        size: 32,
    },
];

export default class GridComponent {
    constructor(
        private pixelArtNavigation = document.querySelector('.js-pixel-art-navigation'),
        private pixelArtGrid = document.querySelector('.js-pixel-art-grid'),
        private gridItemControllerComponent = new GridItemControllerComponent()) {
        this.initializeGrid();
        new DownloadImgComponent();
    }

    private initializeGrid(): void {
        this.pixelArtNavigation.appendChild(this.addGridSizeController());
        this.setGrid(GRID_SIZE_OPTIONS.find(grid => grid.type === gridOptionType.mini));
    }

    private addGridSizeController(): HTMLSelectElement {
        const select = <HTMLSelectElement>document.createElement('select');
        select.classList.add('js-select-grid');
        select.classList.add('select-grid');
        GRID_SIZE_OPTIONS.forEach((gridSizeOption: gridSizeOption) => {
            const optionItem = document.createElement('option');
            optionItem.value = gridSizeOption.size.toString();
            optionItem.innerText = gridSizeOption.type.toUpperCase();
            select.appendChild(optionItem);
        });

        select.addEventListener('change', (e) => {
            const option = (<HTMLSelectElement>e.target);
            this.setGrid({
                type: option.innerText.toString(),
                size: parseInt(option.value),
            });
        })
        return select;
    }

    private setGrid(gridOption: gridSizeOption): void {
        const oldGrid = document.querySelector('.js-pixel-art-grid-container');
        if (oldGrid) oldGrid.remove();

        const grid = document.createElement('div');
        grid.classList.add('js-pixel-art-grid-container');
        grid.classList.add('pixel-art-grid__container');
        this.createGrid(gridOption, grid);
        this.pixelArtGrid.appendChild(grid);
    }

    private createGrid(gridOption: gridSizeOption, grid: HTMLDivElement): void {
        for (let row = 0; row < gridOption.size; row++) {
            const gridRow = document.createElement('div');
            gridRow.classList.add('pixel-art-grid__row');
            for (let column = 0; column < gridOption.size; column++){
                gridRow.appendChild(this.gridItemControllerComponent.addGridItem(gridOption.size));
             }
             grid.appendChild(gridRow);
        }
    }
}

