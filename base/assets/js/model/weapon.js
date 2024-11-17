import weaponConfig from '../config/weapon.js';

export default {

    get: (weapon) => {
        if (!weaponConfig.hasOwnProperty(weapon)) {
            throw new Error (`No data found for weapon: ${weapon}`);
        }

        return weaponConfig[weapon];
    },

    getAll: () => {
        return weaponConfig;
    }

}
