
function getFilms(page = 1)
{
    $.get('/films', { "page":page }, resp => {
        let resStr = '';
        let paginationStr = ``;
        resp.data.forEach(el => {
            resStr += 
            `<a href = '/films/${el.id}/videos'>
                <img src = '/images/films/${el.preview_path}' height = 50 width = 50 />
                ${el.name}
            <a/><br>`;
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

