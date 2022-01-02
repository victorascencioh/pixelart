import GridComponent from '../gridControllerComponent/gridComponent';
import ColorsPaletteComponent from '../colorsPaletteComponent/colorsPaletteComponent';
import './index.scss';

export default class IndexPixelArt {
  private gridComponentInstance: GridComponent;
  private colorsPaletteInstance: ColorsPaletteComponent;

  constructor() {
    this.colorsPaletteInstance = new ColorsPaletteComponent();
    this.gridComponentInstance = new GridComponent();
  }
}

new IndexPixelArt();