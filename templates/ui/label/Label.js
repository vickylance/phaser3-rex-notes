import Sizer from '../sizer/Sizer.js';
import AddClickCallback from './AddClickCallback.js';
import GetElement from '../utils/GetElement.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        // Elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var text = GetValue(config, 'text', undefined);
        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var iconSpace = GetValue(config, 'space.icon', 0);

        if (background) {
            this.addBackground(background);
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: paddingLeft,
                    right: (text) ? iconSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: (text) ? iconSpace : paddingBottom
                }
            }
            this.add(icon, 0, 'center', padding);
        }

        if (text) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon) ? 0 : paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon) ? 0 : paddingTop,
                    bottom: paddingBottom
                }
            }
            this.add(text, 0, 'center', padding);
        }

        var clickCallback = GetValue(config, 'click', undefined);
        if (clickCallback) {
            this.addClickCallback(clickCallback, this);
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.icon = icon;
        this.childrenMap.text = text;
    }

    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        var value;
        if (textObject.text) {
            value = textObject.text;
        } else {
            value = textObject.getData('text');
        }
        return value;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return;
        }
        if (textObject.setText) {
            textObject.setText(value);
        } else {
            textObject.setData('text', value);
        }
    }

    setText(value) {
        this.text = value;
        return this;
    }

    appendText(value) {
        this.text += value;
    }
}

var methods = {
    addClickCallback: AddClickCallback,
    getElement: GetElement,
}
Object.assign(
    Label.prototype,
    methods
);

export default Label;