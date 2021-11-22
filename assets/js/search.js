const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const clearBtn = document.getElementById('clear_btn');

const searchTechs = async searchText => {

	const techs = techList;

    let matchs = techs.filter( tech => {

        const regex = new RegExp(searchText, 'gi');
		
		if(selected_tab == "all") {
            return ( (tech.name.match(regex) == null ? false : true) || (tech.effects.filter(eff => eff.match(regex)).length > 0 ? true : false) ) && (tech.area.match("physics") || tech.area.match("society") || tech.area.match("engineering"));
		} else {
            return ( (tech.name.match(regex) == null ? false : true) || (tech.effects.filter(eff => eff.match(regex)).length > 0 ? true : false) ) && tech.area.match(selected_tab);
		}
        
    });

    //console.log(matchs);

    if(searchText.length === 0){
        matchs = [];
        matchList.innerHTML = '';
    }

    outputHtml(matchs);
    doTechsHighlight(matchs);
};

const outputHtml = matchs => {
    if(matchs.length > 0){
        const html = matchs.map(
            match => `
            <div class="search_result-item">
			<a href="#${match.key}">Tech: ${match.name}</a>
            </div>
            `
        ).join('');

        //console.log(html);
        matchList.innerHTML = html;
        $('#search').css('background-color', '#B5FFD5'); //textbox
    } else {
        //not found
        matchList.innerHTML = '';
        $('#search').css('background-color', ''); //textbox
    }
}

search.addEventListener('input' ,() => searchTechs(search.value.replace(/\s/g, "")));
matchList.addEventListener('click', function(e) { e.preventDefault();const anchor = event.target.closest("a");
  if (!anchor) return;
  //console.log( anchor.getAttribute('href')); 
  $('html, body').animate({
      scrollTop: $(anchor.getAttribute('href')).offset().top - 250 ,
      scrollLeft: $(anchor.getAttribute('href')).offset().left - 450
    }, 100);
    // $(anchor.getAttribute('href')).addClass('tech-highlight-fade-in');
    // setTimeout( () => {
    //     $(anchor.getAttribute('href')).addClass('tech-highlight-fade-out');
    //     $(anchor.getAttribute('href')).removeClass('tech-highlight-fade-in');
    //     setTimeout( () => {$(anchor.getAttribute('href')).removeClass('tech-highlight-fade-out')} , 900 )
    // } , 4000)
  matchList.innerHTML = '';
}, false);

//clear all
clearBtn.addEventListener( 'click', () => { 
    search.value = "";
    matchList.innerHTML = '';
    $('#search').css('background-color', '');
    doTechsHighlight();
} );

//Show-Hide list items
$(document).ready(function(){
    $('#show_item_cb').change(function() {
        if($(this).prop('checked')) {
            $('#match-list').show()
        } else {
            $('#match-list').hide()
        }
    })
});

const currentTechsHighlight = new Set();
function doTechsHighlight(matchs){

    //clear previous highlight
    currentTechsHighlight.forEach( key => {
        //currentTechsHighlight.delete(key);
        $("#" + key).removeClass('tech-highlight')
    })
    currentTechsHighlight.clear();


    //add new
    if(matchs != null){
        matchs.forEach( tech => {
            if(!currentTechsHighlight.has(tech.key)){
                $("#" + tech.key).addClass('tech-highlight')
                currentTechsHighlight.add(tech.key)
            }
        })
    }
    
    //console.log(currentTechsHighlight);

}