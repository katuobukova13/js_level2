Vue.component('search', {
	data() {
		return {
			userSearch: "",
		}
	},
	methods: {
		filter() {
			let regexp = new RegExp(this.userSearch, 'i');
			app.filtered = app.products.filter(el => regexp.test(el.product_name));
		}
	},
	template: `<form action="#" class="search-form" @submit.prevent="filter">
	<input type="text" class="search-field" v-model="userSearch">
	<button type="submit" class="btn-search">
		<i class="fas fa-search"></i>
	</button>
</form>`
})
