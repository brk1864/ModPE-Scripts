/*
 * Copyright 2015 CodeInside, ChalkPE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type {string}
 */
const VERSION = "0.1-SNAPSHOT";

/**
 * @constructor
 */
function Gear(){
    /**
     * @type {GearMenu[]}
     */
    this.menus = [];
}

Gear.prototype = {
    /**
     * @returns {GearMenu[]}
     */
    getMenus: function(){
        return this.menus;
    },

    /**
     * @param {GearMenu} menu
     * @returns {number}
     */
    indexOfMenu: function(menu){
        this.getMenus().forEach(function(element, index){
            if(element.equals(menu)){
                return index;
            }
        });
        return -1;
    },

    /**
     * @param {GearMenu} menu
     */
    addMenu: function(menu){
        if(!(menu instanceof GearMenu)){
            throw new TypeError("The parameter 'menu' must be instance of GearMenu.");
        }

        if(this.indexOfMenu(menu) >= 0){
            throw new ReferenceError("The menu '" + menu.toString() + "' is already in Gear.");
        }

        this.getMenus().push(menu);
    },

    /**
     * @param {GearMenu} menu
     */
    removeMenu: function(menu){
        if(!(menu instanceof GearMenu)){
            throw new TypeError("The parameter 'menu' must be instance of GearMenu.");
        }

        var index = this.indexOfMenu(menu);
        if(index < 0){
            throw new ReferenceError("The menu '" + menu.toString() + "' is not in Gear.");
        }

        this.getMenus().splice(index, 1);
    },

    /**
     * @returns {string}
     */
    toString: function(){
        return "[Gear " + VERSION + "]";
    }
};

/**
 * @param {string} name
 * @constructor
 * @abstract
 */
function GearMenu(name){
    if(name === null){
        throw new ReferenceError("The parameter 'name' must not be null.");
    }
    this.name = name;
}

GearMenu.prototype = {
    /**
     * @returns {string}
     */
    getName: function(){
        return this.name;
    },

    /**
     * @param {Gear} gear
     * @abstract
     */
    tick: function(gear){
        throw new ReferenceError("This instance is abstract.");
    },

    /**
     * @returns {string}
     */
    toString: function(){
        return "[GearMenu " + this.getName() + "]";
    },

    /**
     * @param another
     * @returns {boolean}
     */
    equals: function(another){
        return another instanceof GearMenu && this.name === another.name;
    }
};