export interface IColorPalette {
    hexaCode: string;
    rgbCode: string;
}

export function removeActiveColorPalette(): void {
    localStorage.removeItem('activeColorPalette');
}

export function getActiveColorPalette(): IColorPalette | null {
    const activeColorPalette = localStorage.getItem('activeColorPalette');
    if (!activeColorPalette) return null;
    return JSON.parse(activeColorPalette);

}

export function convertHexaToRGB(hexaCode: string): string {
    if(hexaCode.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }
    const aRgbHex = hexaCode.match(/.{1,2}/g);
    return [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ].join();
}

export function setActiveColorPalette(color: IColorPalette = {hexaCode: 'ffffff', rgbCode: convertHexaToRGB('ffffff')}): void {
    localStorage.setItem('activeColorPalette', JSON.stringify(color));
}

export default class ColorPaletteItemController {
    static createColor(colorItem: IColorPalette): Promise<HTMLDivElement> {
        return new Promise((resolve) => {
            const color = document.createElement('div');
            color.classList.add('js-color-palette-item', 'color-palette-item');
            color.setAttribute('data-hexa-code', colorItem.hexaCode);
            color.setAttribute('data-rgb-code', colorItem.rgbCode);
            color.style.setProperty('--hexa-code', `#${colorItem.hexaCode}`);
            color.style.setProperty('--rgb-code', `rgb(${colorItem.rgbCode})`);
            color.addEventListener('click', (e) => {
                this.activeColorPalette(e.target as HTMLDivElement);
            })
            resolve(color);
        });
    } 

    static activeColorPalette(color: HTMLDivElement): void {
        const currentActiveItem = <HTMLDivElement>document.querySelector('.js-color-palette-item.is-active');
        if (currentActiveItem && currentActiveItem.dataset.hexaCode === color.dataset.hexaCode) return;
        
        currentActiveItem?.classList.remove('is-active');
        color.classList.add('is-active');
        setActiveColorPalette({
            hexaCode: color.dataset.hexaCode,
            rgbCode: color.dataset.rgbCode
        });
     }
}