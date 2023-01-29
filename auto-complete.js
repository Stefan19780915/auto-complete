
//CLASSES

class API {	
	async getFilteredData(value, url){
		try{
			const options = {
				method: 'GET'
			};
			let response = await fetch(url, options);
			let result = await response.json();
		    let output = result.fruits.filter((fruit)=>{
				return fruit.toLowerCase().includes(value.toLowerCase());
			});	
			return output;
		} catch (err) {
			console.log(err);
		}
	}
}

class UI {
	
	static body = document.querySelector('body');
		
	displayFruitsComponent(){
		const searchResults = document.createElement('div');
		searchResults.classList.add('fruits');
		const search = document.createElement('input');
		search.classList.add('search');
		UI.body.append(search);
		UI.body.append(searchResults);
	}
	
	displayListOfData(data, el){
		const parentElement = document.querySelector(el);
		const childElements = data.map((item)=>{
			return `<h1>${item}</h1>`;
		});
		parentElement.innerHTML = childElements.join('');
	}
}

//EVENTS
const api = new API();
const ui = new UI();
ui.displayFruitsComponent();
const fruitSearch = document.querySelector('.search');

fruitSearch.addEventListener('input',async(e)=>{
	const filteredFruits = await api.getFilteredData(
		e.target.value,
		'https://stefan19780915.github.io/data/fruits.json'
		);
	e.target.value ? ui.displayListOfData(filteredFruits, '.fruits') : '';
});

