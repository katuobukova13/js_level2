'use strict';
class Params {
	constructor(element) {
		this.name = element.value;
		this.price = +element.dataset['price'];
		this.calories = +element.dataset['calories'];
	}
}

class Hamburger {
	constructor(size, topping, addition) {
		this.size = new Params(this.choise(size));
		this.topping = this.getToppingAndAdds(topping);
		this.addition = this.getToppingAndAdds(addition);
	}

	getToppingAndAdds(name) {
		let adds = [];
		this.choiseSome(name).forEach(option => adds.push(new Params(option)));
		return adds;
	}

	choise(name) {
		return document.querySelector(`input[name=${name}]:checked`);
	}

	choiseSome(name) {
		return [...document.querySelectorAll(`input[name=${name}]:checked`)];
	}

	getSum() {
		let totalPrice = this.size.price;
		this.topping.forEach(option => totalPrice += option.price);
		this.addition.forEach(option => totalPrice += option.price);
		return totalPrice;
	}

	getCalories() {
		let totalCal = this.size.calories;
		this.topping.forEach(option => totalCal += option.calories);
		this.addition.forEach(option => totalСal += option.calories);
		return totalCal;
	}

	calculateAll(price, calories) {
		document.querySelector(price).textContent = this.getSum();
		document.querySelector(calories).textContent = this.getCalories();
	}
}



