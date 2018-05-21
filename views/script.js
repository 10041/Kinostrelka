
function getFilms(page = 1)
{
    $.get('/films', { "page":page }, resp => {
        let resStr = '';
        let paginationStr = ``;
        resp.data.forEach(el => {
            resStr += addLinkFilm(el);
        });
        
        for(let index = 1; index < resp.meta.pages + 1; index++){
            paginationStr += `
            <button onclick="getFilms(${index})"`;
            if(index === page) paginationStr += ` style="background-color:red"`;
            paginationStr += `>${index}</button>
            `;
        }
        $('#pagination').empty().append(paginationStr);
        $('#films').empty().append(resStr);
    });
}

function searchFilm(){
    $.get('/films/find', {"name": $('#search').val()}, data => {
        let resStr = '';
        if(data.length > 0){
            data.forEach(el => {
                resStr += addLinkFilm(el);
            });
        }
        else
            resStr = 'Ничего не найдено';
        
        $('#films').empty().append(resStr);
    });
}


function addLinkFilm(film){
    return `<a href = '/films/${film.id}/videos'>
        <img src = '/images/films/${film.preview_path}' height = 50 width = 50 />
        ${film.name}
    <a/><br>`;
}