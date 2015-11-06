var inherits = require('util').inherits;

function Animal(name) {
    'use strict';
    this.name = name;
}

Animal.prototype.walk = function (destination) {
    'use strict';
    console.log(this.name, 'is walking to', destination);
};

function Bird(name) {
    'use strict';

    // Call the Animal constructor
    Animal.call(this, name);
}

// Setup the prototype chain between Bird and Animal
//Bird.prototype.__proto__ = Animal.prototype;
inherits(Bird, Animal);

Bird.prototype.fly = function (destination) {
    'use strict';
    console.log("The", this.name, 'is flying to', destination);
};

// Overriding function in child class
Bird.prototype.walk = function (destination) {
    'use strict';
    Animal.prototype.walk.call(this, destination);
    console.log("Don't forget that birds can fly.");
};

var bird = new Bird('sparrow');

bird.walk('melbourne');
bird.fly('madagascar');