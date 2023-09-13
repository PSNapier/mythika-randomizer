// TOOLBOX
// SNIPPETS
// .replace(/(,\s)(?!.*\1)/, ' and ') <-- find last instance
 
// FUNCTIONS
function browserCheck() {
	if (window.chrome) {
		browser.style.display = 'none';
	}
}
 
function reload() {
	window.location.reload();
}
 
function rng(max) {
	const rng = Math.floor(Math.random() * max) + 1;
	return rng;
}
 
function rngRange(min, max) {
	const rng = Math.floor(Math.random() * (max - min + 1)) + min;
	return rng;
}
 
function randomizer(array) {
	// console.log(array);
	if (array.length > 0) {
		const random = array[Math.floor(Math.random() * array.length)];
		return random;
	} else {
		return '';
	}
}
 
function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
}
// let a = ['a', 1, 'a', 2, '1'];
// let unique = a.filter( onlyUnique );// returns ['a', 1, 2, '1']
 
function combiner(array) {
	const result = [],
		f = function(prefix=[], array) {
		for (let i = 0; i < array.length; i++) {
		 result.push([...prefix,array[i]]);
		 f([...prefix,array[i]], array.slice(i + 1));
		}
		};
	f('', array);
	return result;
}
 
function capitalizeArr(array) {
	var newArray = [];
 
	for(var x = 0; x < array.length; x++){
		 newArray.push(array[x].charAt(0).toUpperCase()+array[x].slice(1));
	}
	return newArray;
}
 
// string.capitalizeStr();
// TODO: capitalize no worky with opening parenthesis even though regexr says it should?
String.prototype.capitalizeStr = function() {
	return this.replace(/(?:^|\(|\s|-|\/)\S/g, function(a) { return a.toUpperCase();});
};
 
function camelizeStr(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return "";// or if (/\s+/.test(match)) for white spaces
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}
 
// input ID, check element, if value present return value else return false
function getCleaner(id) {
	let output;
	let element = document.getElementById(id);
 
	// console.log(element.type);
 
	if (element.type === 'select-one') {
		output = element.value !== 'false' ? element.value:false;
	} else if (element.type === 'text') {
		output = element.value !== '' ? element.value:false;
	} else if (element.type === 'checkbox') {
		output = element.checked;
	}
 
	return output;
}
 
// count occurences in array
// array.count(query)
// https://stackoverflow.com/questions/6120931/how-to-count-the-number-of-certain-element-in-an-array
Object.defineProperties(Array.prototype, {
	count: {
		value: function(query) {
		 var count = 0;
		 for(let i=0; i<this.length; i++)
			if (this[i]==query)
				count++;
		 return count;
		}
	}
});
 
// roll a list of genes based on array
// let array = [[50,'gene'],[100,'gene']];
function rngList(array, roll) {
	let output;
 
	let x = rng(roll);
	for (let i = 0; i < array.length; i++) {
		if (x <= array[i][0]) {
		 output = array[i][1];
		 break;
		}
	}
 
	// console.log(output);
	return output;
}

// for creating ordered arrays to reference while sanitizing gene lists etc.
function createDictionary(input, index, output) {
	for (let [key] of Object.entries(input)) {
		for (let i = 0; i < input[key].length; i++) {
			output.push(input[key][i][index]);
		}
	}
}

// for looking up geno / pheno translations
function lookup(reference, index, comparison) {
	for (let [key] of Object.entries(reference)) {
		for (let i = 0; i < reference[key].length; i++) {
			if (reference[key][i].indexOf(comparison) !== -1) { return reference[key][i][index]; }
		}
	}
}

// for getting select multiple values as an array
function getSelectMultiple(id) {
	const output = [];
	for (let i=0; i < document.getElementById(id).options.length; i++) {
		if (document.getElementById(id).options[i].selected === true) {
			output.push(document.getElementById(id).options[i].value)
		}
	}
	return output;
}

// HTML THINGIES
 
function toggleDisplay(checkbox, toggle) {
	checkbox = document.getElementById(checkbox).checked;
	toggle = document.getElementById(toggle);
 
	if (checkbox) {
		toggle.style.display = 'block';
	}
	if (!checkbox) {
		toggle.style.display = 'none';
	}
}
 
 function populate(id, array, mode) {
	// modes:
	// simple ---> array = ['option','option'];
	// optGroup ---> object = {key: ['option','option']}
	// geneList ---> object = {key: [['gene','Gn'],['gene','Gn']]}
	// pillSelect ---> array = ['option','option'];
 
	if (mode === 'simple') {
		let select = document.getElementById(id);
		let options = array;
 
		for (let i = 0; i < options.length; i++) {
		 let opt = options[i];
		 let ele = document.createElement('option');
		 ele.textContent = opt;
		 ele.value = opt;
		 select.appendChild(ele);
		}
	}
 
	if (mode === 'optGroup') {
		let select = document.getElementById(id);
		let groups = Object.keys(array);
 
		for (let i = 0; i < groups.length; i++) {
		 let gro = groups[i];
		 let groEle = document.createElement('optgroup');
		 groEle.label = gro;
		 select.appendChild(groEle);
 
		 let options = array[gro];
		 for (let i = 0; i < options.length; i++) {
			let opt = options[i];
			let ele = document.createElement('option');
			ele.textContent = opt;
			ele.value = opt;
			select.appendChild(ele);
		}
		}
	}
 
	if (mode === 'geneList') {
		let select = document.getElementById(id);
		let groups = Object.keys(array);
 
		for (let i = 0; i < groups.length; i++) {
			let gro = groups[i];
			let groEle = document.createElement('optgroup');
			groEle.label = gro;
			select.appendChild(groEle);
	
			let options = array[gro];
			for (let i = 0; i < options.length; i++) {
				let opt = options[i][1];
				let ele = document.createElement('option');
				ele.textContent = opt;
				ele.value = opt.replace(/\s/g, '');
				select.appendChild(ele);
			}
		}
	}

	if (mode === 'geneListAlt') {
		let select = document.getElementById(id);
		let groups = Object.keys(array);
 
		for (let i = 0; i < groups.length; i++) {
			let gro = groups[i];
			let groEle = document.createElement('optgroup');
			groEle.label = gro;
			select.appendChild(groEle);
	
			let options = array[gro];
			for (let i = 0; i < options.length; i++) {
				let opt = options[i][1];
				let ele = document.createElement('option');
				ele.textContent = opt;
				ele.value = options[i][0].replace(/\s/g, ''); // alt = value is gene instead of layman
				select.appendChild(ele);
			}
		}
	}
 
	if (mode === 'pillSelect') {
		// array = ['test text'...]
 
		let select = document.getElementById(id);
		let options = array;
 
		for (let i = 0; i < options.length; i++) {
		// FIXME: wanted to sanitize with .capitalizeStr() and .camelizeStr() but it keeps returning an error for seemingly no reason?
		 let text = options[i];
 
		 let ele = document.createElement('SPAN');
		 ele.setAttribute('class', 'pill-spacer pill');
		 ele.setAttribute('id', id + 'Opt' + i);
		 ele.setAttribute('onclick','handlePillSelect(this);');
		 ele.textContent = text;
		 select.appendChild(ele);
		// console.log(ele);
		}
	}
}
 
// pill inputs
 function handlePillSelect(element) {
	// console.log(element.id);
	let ele = document.getElementById(element.id),
		 eleClass = (ele.classList.contains("pillSelected") === true) ? true:false;
 
	if (eleClass === false) {
		ele.classList.remove("pill");
		ele.classList.add("pillSelected");
	} else if (eleClass === true) {
		ele.classList.remove("pillSelected");
		ele.classList.add("pill");
	}
}
 
function getPillSelect(parentEle) {
	let classLength = document.querySelectorAll('.pillSelected').length;
	let pills = [];
 
	for (let i = 0; i < classLength; i++) {
		if (document.getElementsByClassName('pillSelected')[i].parentNode.id === parentEle) {
		 let value = document.getElementsByClassName('pillSelected')[i].innerText;
 
		 pills.push(value);
		}
	}
 
	return pills;
}

// DOING THE DO
function constructInput() {
	this.pillCheck = getPillSelect('pillContainer');
	this.nerosLuck = this.pillCheck.indexOf('Nero\'s Luck') !== -1 ? true : false;
	this.arativasSpirit = this.pillCheck.indexOf('Arativa\'s Spirit') !== -1 ? true : false;
	this.solasdrake = this.pillCheck.indexOf('Solasdrake') !== -1 ? true : false;
	this.shadowdrake = this.pillCheck.indexOf('Shadowdrake') !== -1 ? true : false;
	this.furion = this.pillCheck.indexOf('Furion') !== -1 ? true : false;
	this.shellpin = this.pillCheck.indexOf('Shellpin') !== -1 ? true : false;
	this.stamvaul = this.pillCheck.indexOf('Stamvaul') !== -1 ? true : false;
	this.runeSpiritFamiliar = this.pillCheck.indexOf('Rune Spirit Familiar') !== -1 ? true : false;
	this.species = document.getElementById('selectSpecies').value || false;
	this.gender = document.getElementById('selectGender').value || false;
	this.rank = document.getElementById('selectRank').value || false;
	this.build = document.getElementById('selectBuild').value || false;
	this.earTrait = document.getElementById('selectEars').value || false;
	this.tailTrait = document.getElementById('selectTail').value || false;
	this.bonusTrait = document.getElementById('selectBonusTrait').value || false;
	this.mutation = document.getElementById('selectMutation').value || false;
	this.coatColour = document.getElementById('selectCoatColour').value || false;
	this.markings = document.getElementById('selectMarkings').value || false;
	this.markings = getSelectMultiple('selectMarkings').filter(Boolean).slice(0, 4) || false;
	this.hereditaryTraits = getSelectMultiple('selectHereditaryTraits').filter(Boolean).slice(0, 3) || false;
}

let pup = {
	species: undefined,
	gender: undefined,
	status: undefined,
	rank: undefined,
	build: undefined,
	mutation: undefined,
	genotype: undefined,
	phenotype: undefined,
	skills: undefined,
	runes: undefined,
	hereditaryTraits: undefined,
};

function constructPup() {
	pup.species = handleSpecies() || 'species';
	pup.gender = handleGender() || 'gender';
	pup.status = handleStatus() || 'status';
	pup.rank = handleRank() || 'rank';
	pup.build = handleBuild() || 'build';
	pup.mutation = handleMutation();
	pup.genotype = handleGenotype() || 'genotype';
	pup.phenotype = handlePhenotype() || 'phenotype';
	pup.skills = handleSkills();
	pup.runes = handleRunes();
	pup.hereditaryTraits = handleHereditaryTraits();
}

let input = {};
function buttonPress() {
	document.getElementById("output").innerHTML = ``;
	input = new constructInput();
	const litterSize = 1;
	for (let i = 1; i <= litterSize; i++) {
		constructPup();
		document.getElementById("output").innerHTML += i > 1 && `<br><br>` || ``;
		document.getElementById("output").innerHTML += `${i}) ${pup.species}, ${pup.gender}, ${pup.status}, ${pup.rank}`;
		document.getElementById("output").innerHTML += `<br>B: ${pup.build}`;
		document.getElementById("output").innerHTML += pup.mutation !== `` && `<br>M: ${pup.mutation}` || ``;
		document.getElementById("output").innerHTML += `<br>G: ${pup.genotype}`;
		document.getElementById("output").innerHTML += `<br>P: ${pup.phenotype}`;
		document.getElementById("output").innerHTML += pup.skills !== false && `<br><b>Skills:</b> ${pup.skills}` || ``;
		document.getElementById("output").innerHTML += pup.runes !== false && `<br><b>Runes:</b> ${pup.runes}` || ``;
		document.getElementById("output").innerHTML += pup.hereditaryTraits !== false && `<br><b>Hereditary Traits:</b><br>${pup.hereditaryTraits}` || ``;
	}
}

// LISTS
const species = {
	common: [
		'Velox',
		'Hexin',
		'Enquisitors',
	],
	uncommon: [
		'Arcid',
		'Zinner',
	],
	rare: [
		'Zephies',
		'Minkins',
		'Funia',
	],
};

const builds = {
	common: [
		'Natural Build',
	],
	uncommon: [
		'Sphynx Build',
		'Satin Build',
		'Ridgeback Build',
	],
	rare: [
		'Leo Build',
	],
};

const ears = [
	'Folded Ears',
	'Standard Ears',
	'Rounded Ears',
	'Pointed Ears',
	'Tipsy Ears',
	'Furred Ears',
	'Horned Ears',
];

const tails = [
	'Curled Tail',
	'Half Tail',
	'Double Tail',
	'Kyuubi Tail',
	'Fin Tail',
	'Equus Tail',
	'Leopard Tail',
	'Tuft Tail',
];

const bonusTraits = [
	'Fangs',
	'Horns',
	'Spikes',
	'Tusks',
	'Quills',
	'Elemental',
	'Theri Claws',
	'Fins',
	'Scales / Armor Plates',
	'Antennas',
	'Dragon Vines',
];

const mutations = {
	random: [
		'Albino',
		'Celestial',
		'Chimera',
		'Deaf and Blind',
		'Sclera',
		'Polycoria',
	],
	inbred: [
		'Amputated',
		'Angels Gift',
		'Blind and Deaf',
		'Harlequin',
		'Optical',
		'Zombified',
	],
}

const coatColours = {
	common: [
		['Day','Daybreak'],
	],
	uncommon: [
		['Oce','Ocean'],
	],
	rare: [
		['Mid','Midnight'],
	],
};

const markings = {
	common: [
		['Acc','Accents'],
		['Bla','Blanket'],
		['Gli','Glitz'],
		['Hod','Hood'],
		['Pts','Points'],
		['Sab','Sable'],
		['Mas','Masked'],
	],
	uncommon: [
		['Duo','Dual Tone'],
		['Mrl','Merle'],
		['Spe','Spectral'],
		['Sno','Snowstorm'],
		['Tab','Tabby'],
		['Wdg','Wilddog'],
	],
	rare: [
		['Aur','Aura'],
		['Cal','Calico'],
		['Def','Defier'],
		['Pie','Piebald'],
		['Shi','Shine'],
	],
	unique: [
		['Cry','Crystal'],
		['Mal','Malachite'],
		['Mtr','Meteor Rain'],
		['Rev','Reversal'],
		['Tri','Tribal'],
		['Voi','Void'],
	],
};

const hereditaryTraits = {
	common: [
		'Hunter',
		'Feathery Flyer',
		'Bone Crusher',
		'Fisher',
		'Explorer',
		'Camper',
	],
	uncommon: [
		'Meat Hoarder',
		'Medic',
		'Fellowship I',
		'Skull Breaker',
	],
	rare: [
		'Runebook Searcher',
		'Ancient Runes',
		'Strength Addiction',
		'Mile Runner',
		'Guardian Protector',
		'Warm Heart',
	],
	unique: [
		'Velox DNA I',
		'Hexin DNA I',
		'Enquisitors DNA I',
		'Arcid DNA I',
		'Mykron DNA I',
		'Zinner DNA I',
		'Zephies DNA I',
		'Minkin DNA I',
		'Funia DNA I',
		'Vilkren DNA I',
	],
}

// HANDLERS
function handleSpecies() {
	return input.species === 'Common' && randomizer(species.common) || input.species === 'Uncommon' && randomizer(species.uncommon) || input.species === 'Rare' && randomizer(species.rare) || input.species || randomizer(rngList([[70, species.common],[95, species.uncommon],[100, species.rare]], 100));
}

function handleGender() {
	const modifier = input.nerosLuck && input.arativasSpirit && 0 || input.nerosLuck && !input.arativasSpirit && 10 || !input.nerosLuck && input.arativasSpirit && -10 || 0; 
	return input.gender || rngList([[50 + modifier, 'Male'],[100 + modifier, 'Female']], 100);
}

function handleStatus() {
	return 'Healthy';
}

function handleRank() {
	return input.rank || rngList([[95, 'Runt Rank'],[100, 'Omega Rank']], 100);
}

function handleBuild() {
	const b = input.build === 'Common' && randomizer(builds.common) || input.build === 'Uncommon' && randomizer(builds.uncommon) || input.build === 'Rare' && randomizer(builds.rare) || input.build || randomizer(rngList([[70, builds.common],[95, builds.uncommon],[100, builds.rare]], 100));
	const e = input.earTrait || rng(100) <= 10 && `${randomizer(ears)}` || ``;
	const t = input.tailTrait || rng(100) <= 10 && `${randomizer(tails)}` || ``;
	const bt = input.bonusTrait || rng(100) <= 10 && `${randomizer(bonusTraits)}` || ``;
	return [b, e, t, bt].filter(Boolean).join(', ');
}

function handleMutation() {
	return input.mutation === 'Random' && randomizer(mutations.random) || input.mutation === 'Inbred' && randomizer(mutations.inbred) || input.mutation || input.solasdrake && !input.shadowdrake && rng(100) <= 15 && randomizer(mutations.random) || 
	!input.solasdrake && input.shadowdrake && rng(100) <= 15 && randomizer(mutations.inbred) || 
	rng(100) <= 5 && randomizer(mutations.random) ||
	``;
}

function handleGenotype() { 
	const double = pup.mutation.includes('Chimera') || pup.mutation.includes('Harlequin');
	const c = () => input.coatColour || randomizer(rngList([[70, coatColours.common],[95, coatColours.uncommon],[100, coatColours.rare]], 100))[0];

	function m() {
		let ml = [];
		function rollMarkings(y) {
			const x = rng(y);
			for (let i = 1; i <= x; i++) { ml.push(randomizer(rngList([[70, markings.common],[87, markings.uncommon],[95, markings.rare],[100, markings.unique]], 100))[0]); }
		}

		let sml = [];
		const r = ['Common', 'Uncommon', 'Rare', 'Unique'];
		for (let i = 0; i < r.length; i++) {
			if (input.markings.includes(r[i])) { sml.push(randomizer(markings[r[i].toLowerCase()])[0]); }
			input.markings = input.markings.filter(a => a !== r[i]);
		}
		sml = [...sml, ...input.markings];

		rollMarkings(5);
		const combined = [...sml, ...ml].slice(0, 3);
		const markingsDict = [];
		createDictionary(markings, 0, markingsDict);
		return [...new Set(combined)].sort((a, b) => markingsDict.indexOf(a) - markingsDict.indexOf(b)).join('/');
	}

	return double && `${[c(),m()].join('/')} // ${[c(),m()].join('/')}` || [c(),m()].join('/');
}

function handlePhenotype() {
	const geno1 = pup.genotype.split(' // ')[0];
	const geno2 = pup.genotype.split(' // ')[1] || false;
	// console.log(geno1, geno2);

	function readGeno(input) {
		input = input.split('/').filter(Boolean);
		const g = {
			coatColour: [],
			markings: [],
		};
		g.coatColour.push(lookup(coatColours, 1, input[0]));
		for (let i = 0; i < input.length; i++) { g.markings.push(lookup(markings, 1, input[i])); }
		g.coatColour = g.coatColour.filter(Boolean);
		g.markings = g.markings.filter(Boolean);
		const combined = g.markings.length > 0 && `${g.coatColour} With ${g.markings.join(', ')}` || `${g.coatColour}`;
		return combined;
	}

	return !geno2 && readGeno(geno1) || `${readGeno(geno1)} // ${readGeno(geno2)}`;
}

function handleSkills() {
	const a = input.furion && 1 || rng(100) <= 10 && 1 || 0;
	const d = input.shellpin && 1 || rng(100) <= 10 && 1 || 0;
	const s = input.stamvaul && 1 || rng(100) <= 10 && 1 || 0;

	const combined = [];
	if (a > 0) { combined.push(`+${a} Attack`); }
	if (d > 0) { combined.push(`+${d} Defense`); }
	if (s > 0) { combined.push(`+${s} Speed`); }
	
	return combined.length > 0 && combined.join(', ') || false;
}

function handleRunes() {
	const mod = input.runeSpiritFamiliar && 10 || 0;
	const e = rng(100) <= 10 + mod && 1 || 0;
	const m = rng(100) <= 10 + mod && 1 || 0;
	const d = rng(100) <= 10 + mod && 1 || 0;
	const v = rng(100) <= 10 + mod && 1 || 0;

	const combined = [];
	if (e > 0) { combined.push(`+${e} Elemancy`); }
	if (m > 0) { combined.push(`+${m} Medic`); }
	if (d > 0) { combined.push(`+${d} Dark`); }
	if (v > 0) { combined.push(`+${v} Void`); }

	return combined.length > 0 && combined.join(', ') || false;
}

function handleHereditaryTraits() {
	const htl = [];
	function rollHereditaryTraits(y) {
		for (let i = 1; i <= y; i++) { htl.push(randomizer(rngList([[40, hereditaryTraits.common],[70, hereditaryTraits.uncommon],[90, hereditaryTraits.rare],[100, hereditaryTraits.unique]], 100))); }
	}

	let shtl = [];
	const r = ['Common', 'Uncommon', 'Rare', 'Unique'];
	for (let i = 0; i < r.length; i++) {
		if (input.hereditaryTraits.includes(r[i])) { shtl.push(randomizer(hereditaryTraits[r[i].toLowerCase()])); }
		input.hereditaryTraits = input.hereditaryTraits.filter(a => a !== r[i]);
	}
	shtl = [...shtl, ...input.hereditaryTraits];

	rollHereditaryTraits(rngList([[70, 0], [90, 1], [98, 2], [100, 3]], 100));
	const combined = [...shtl, ...htl].slice(0, 3);
	const hereditaryTraitsDict = [];
	createDictionary(hereditaryTraits, 0, hereditaryTraitsDict);
	const ht = [...new Set(combined)].sort((a, b) => hereditaryTraitsDict.indexOf(a) - hereditaryTraitsDict.indexOf(b)).join('<br>- ');

	return ht && `- ${ht}` || false;
}

// PAGE SETUP
const fillRarity = `<br><optgroup label="Rarity"></optgroup><br><option value="Common">Common</option><br><option value="Uncommon">Uncommon</option><br><option value="Rare">Rare</option>`;
const fillUnique = `<br><option value="Unique">Unique</option>`
function populateList(ids) {
	for (let i = 0; i < ids.length; i++) {
		document.getElementById(ids[i]).innerHTML += fillRarity;
		if (ids[i] === 'selectHereditaryTraits' || ids[i] === 'selectMarkings') { document.getElementById(ids[i]).innerHTML += fillUnique; }
	}
}

populateList(['selectSpecies', 'selectBuild', 'selectCoatColour', 'selectMarkings', 'selectHereditaryTraits']);
populate('pillContainer', ['Nero\'s Luck', 'Arativa\'s Spirit', 'Solasdrake', 'Shadowdrake', 'Furion', 'Shellpin', 'Stamvaul', 'Rune Spirit Familiar'], 'pillSelect');
populate('selectSpecies', species, 'optGroup');
populate('selectGender', ['Male','Female'], 'simple');
populate('selectRank', ['Runt Rank', 'Omega Rank'], 'simple');
populate('selectBuild', builds, 'optGroup');
populate('selectEars', ears, 'simple');
populate('selectTail', tails, 'simple');
populate('selectBonusTrait', bonusTraits, 'simple');
populate('selectMutation', {type: ['Random', 'Inbred']}, 'optGroup')
populate('selectMutation', mutations, 'optGroup');
populate('selectCoatColour', coatColours, 'geneList');
populate('selectMarkings', markings, 'geneListAlt');
populate('selectHereditaryTraits', hereditaryTraits, 'optGroup');