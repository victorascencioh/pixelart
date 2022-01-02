import './colorsPalette.scss';
import ColorPaletteItemController, { IColorPalette, removeActiveColorPalette, convertHexaToRGB } from './colorsPaletteItemComponent';

const DEFAULT_PALETTE_COLOR: IColorPalette[] = [
    {
        hexaCode: '000000',
        rgbCode: '',
    },
    {
        hexaCode: 'FFFFFF',
        rgbCode: '',
    },
    {
        hexaCode: 'FF0000',
        rgbCode: '',
    },
    {
        hexaCode: '00FF00',
        rgbCode: '',
    },
    {
        hexaCode: '0000FF',
        rgbCode: '',
    },
    {
        hexaCode: 'FFFF00',
        rgbCode: '',
    },
    {
        hexaCode: '00FFFF',
        rgbCode: '',
    },
    {
        hexaCode: 'FF00FF',
        rgbCode: '',
    },
];
const LIMIT_DEFAULT_COLORS = 11;

export default class ColorsPaletteComponent {
    private defaultColorPalettes: IColorPalette[];
    constructor(
        private colorsPalette = <HTMLElement>document.querySelector('.js-colors-palette'),
        private pixelArtNavigation = document.querySelector('.js-pixel-art-navigation')) {
        this.initializeColorPalettes();
    }

    private setDefaultColorPalettes(): void {
        this.defaultColorPalettes = DEFAULT_PALETTE_COLOR.map((color) => {
            return {
                hexaCode: color.hexaCode,
                rgbCode: convertHexaToRGB(color.hexaCode) 
            };
        });
    }

    private initializeColorPalettes(): void {
        this.setDefaultColorPalettes();
        this.defaultColorPalettes.forEach(color => {
            this.insertColorInPalette(color, this.colorsPalette);
        });

        this.pixelArtNavigation.appendChild(this.addInputNewColor());
        removeActiveColorPalette();
    }

    private addInputNewColor(): HTMLElement {
        const input = document.createElement('input');
        input.classList.add('js-input-new-color', 'input-new-color');
        input.setAttribute('id', 'new-color');
        input.setAttribute('type', 'color');
        input.setAttribute('value', '#000000');
        input.addEventListener('change', (event) => {
            const hexaCode =  (<HTMLInputElement>event.target).value.substr(1);
            this.insertColorInPalette({
                    hexaCode,
                    rgbCode: convertHexaToRGB(hexaCode)
                },
                this.colorsPalette
            );
        })

        const label = document.createElement('label');
        label.setAttribute('for', 'new-color');
        label.title = 'Add a new Color to the palette';
        label.innerText = 'colors';
        
        const container = document.createElement('div');
        container.appendChild(input);
        container.appendChild(label);
        return container;
    }

    private insertColorInPalette(color: IColorPalette, colorsPalette: HTMLElement): void {
        const existColor = Array.from(document.querySelectorAll<HTMLElement>('.js-color-palette-item')).find((oldColor) => {
            return oldColor.dataset.hexaCode.toUpperCase() === color.hexaCode.toUpperCase();
        });

        if (existColor || color.hexaCode.length === 0) return;

        ColorPaletteItemController.createColor({
            hexaCode: color.hexaCode,
            rgbCode: color.rgbCode.length > 0 ? color.rgbCode : convertHexaToRGB(color.hexaCode),
        }).then((newColor) => {
            colorsPalette.appendChild(newColor);
        });

        this.removeColorFromPalette();
    }

    private removeColorFromPalette(): void {
        const colors = document.querySelectorAll<HTMLElement>('.js-color-palette-item');
        if (colors.length > LIMIT_DEFAULT_COLORS) colors.item(0).remove();
    }
}
