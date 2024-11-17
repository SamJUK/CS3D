import skin from '../config/skin.js';
import skinConfig from '../config/skin.js';

export default {

    get: (model, skin) => {
        if (!skinConfig.hasOwnProperty(model)) {
            throw new Error (`No Skins Exist for Model: ${model}`);
        }

        if (!skinConfig[model].hasOwnProperty(skin)) {
            throw new Error(`Skin: ${skin} does not exist for model: ${model}`)
        }

        return skinConfig[model][skin];
    },

    getAll: (model) => {
        if (!model) {
            return skinConfig;
        }

        return skinConfig[model];
    }

}