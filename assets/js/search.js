const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchTechs = async searchText => {

	const techs = techList;

    let matchs = techs.filter( tech => {

        const regex = new RegExp(searchText, 'gi');
		
		if(selected_tab == "all") {
			return tech.name.match(regex) && (tech.area.match("physics") || tech.area.match("society") || tech.area.match("engineering")) ;
		} else {
			return tech.name.match(regex) && tech.area.match(selected_tab);
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
    } else {
        //not found
        matchList.innerHTML = '';
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
    $(anchor.getAttribute('href')).addClass('tech-highlight-fade-in');
    setTimeout( () => {
        $(anchor.getAttribute('href')).addClass('tech-highlight-fade-out');
        $(anchor.getAttribute('href')).removeClass('tech-highlight-fade-in');
        setTimeout( () => {$(anchor.getAttribute('href')).removeClass('tech-highlight-fade-out')} , 900 )
    } , 4000)
  matchList.innerHTML = '';
}, false);
