

 function getComments(){
    $.get(`/comments/film/${$('#filmId').val()}`, resp => {
        let resStr = '';
        resp.forEach(el => {

            resStr += ` <p>
                            <img src=${el.user.photo} height = 25 width = 25 />
                            ${el.user.first_name}
                            ${getDate(el.updatedAt)}
                            <br>
                            ${el.message}
                        <p/>`;
        });
        $('#comments').empty().append(resStr);
    });
 }

 function sendComment(){
     if($('#commArea').val() != '') {
        axios.post(`/comments`, {
            filmId: `${$('#filmId').val()}`,
            userId: `${$('#userId').val()}`,
            message: `${$('#commArea').val()}`
        })
        .then((resp) =>{
            console.log(resp);
            getComments();
        });
     }
 }

function getDate(dateStr) {
    let date = new Date(dateStr);
    var options = { year:"numeric", month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit" };
    return date.toLocaleDateString('en-US', options);
} 

function updateFilm (){
    // body = {
    //     name: $('#name'),
    //     genre: $('#genre'),
    //     country: $('#country'),
    //     age_limit: $('#age_limit'),
    //     plot: $('#plot'),
    //     release_date: $('#release_date'),
    //     release_bel: $('#release_bel'),
    //     release_rus: $('#release_rus'),
    //     in_roles: $('#in_roles'),
    //     director: $('#director'),
    // }
    let formData = new FormData();
    formData.append('name',         $('#name').val());
    formData.append('genre',        $('#genre').val());
    formData.append('country',      $('#country').val());
    formData.append('age_limit',    $('#age_limit').val());
    formData.append('plot',         $('#plot').val());
    formData.append('release_date', $('#release_date').val());
    formData.append('release_bel',  $('#release_bel').val());
    formData.append('release_rus',  $('#release_rus').val());
    formData.append('in_roles',     $('#in_roles').val());
    formData.append('director',     $('#director').val());
    formData.append('file', document.getElementById('file').files[0]);

    $.ajax({
        url: `/films/${$('#filmId')}`,
        contentType: 'multipart/form-data',
        type: "PUT",
        dataType : "json",
        data: formData,
        success: function(data){
            $('#filmName') = data.name;
            console.log(data);
        }
    });
}
