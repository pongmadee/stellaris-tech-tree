const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchTechs = async searchText => {

	const techs = techList;

    let matchs = techs.filter( t => {

        const regex = new RegExp(searchText, 'gi');
		
		if(selected_tab == "all") {
			return t.name.match(regex) && (t.tab_type.match("physics") || t.tab_type.match("society") || t.tab_type.match("engineering")) ;
		} else {
			return t.name.match(regex) && t.tab_type.match(selected_tab);
		}
        
    });

    //console.log(matchs);

    if(searchText.length === 0){
        matchs = [];
        matchList.innerHTML = '';
    }

    outputHtml(matchs);
};

const outputHtml = matchs => {
    if(matchs.length > 0){
        const html = matchs.map(
            match => `
            <div class="search_result-item">
			<a href="#${match.key}">${match.name}</a>
            </div>
            `
        ).join('');

        //console.log(html);
        matchList.innerHTML = html;
    }
}

search.addEventListener('input' ,() => searchTechs(search.value));
matchList.addEventListener('click', function(e) { e.preventDefault();const anchor = event.target.closest("a");
  if (!anchor) return;
  //console.log( anchor.getAttribute('href')); 
  $('html, body').animate({
      scrollTop: $(anchor.getAttribute('href')).offset().top - 250 ,
      scrollLeft: $(anchor.getAttribute('href')).offset().left - 450
    }, 100);
  matchList.innerHTML = '';
}, false);
