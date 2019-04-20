function deleteTeam(id) {
  $.post('/api/deleteTeam', {user_token: token, teamId: id}, (data) => {
    if (data.finalResult) {
      $("#deleteTeamUL").css('display', 'none');
      $("#team-"+id).remove();
      $("#delete-team-"+id).remove();
      if ($(".deleteTeamItem").length == 1) {
        $("#team-notfound").fadeIn('fast');
        $("#enableDeleting").css('color', '#c0c0c0');
      }
      alert('تیم حذف شد');
    } else {
      alert('پیج را رفرش کنید و دوباره تلاش کنید');
    }
  });
}

function makeList(){
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let team = data[i];
        let id = team.id;
        let name = team.name;
        let picture = team.picture;
        if (persianTest(name) == true) languageSettings = "style='font-family: yekan'";
        else languageSettings = '';
        var teamPicture = "/api/photos?teamPic="+picture;

        let element = `
        <li class="deleteTeamItem">
          <div class="deleteTeamItemInfo" id="delete-team-${id}">
            <img src="${teamPicture}">
            <span languageSettings>${name}</span>
          </div>
          <div class="deleteTeamParent">
            <button class="deleteTeam">
              <i onClick="deleteTeam(${id})" class="fas fa-trash"></i>
            </button>
          </div>
        </li>
        `;
        $("#deleteTeamUL").append(element);
      }
      let cancelButton = `
      <li id="cancelLi">
        <button id="cancelButton">
          منصرف شدم
        </button>
      </li>
      `;
      $("#deleteTeamUL").append(cancelButton);

    } else {
      $("#enableDeleting").css('color', '#c0c0c0');
    }
  });
}

$(document).ready(() => {
  makeList();
  $("#delete-team-button").click(() => {
    $("#deleteTeamUL").css('display', 'block');
    $("#cancelLi").click(() => {
      $("#deleteTeamUL").fadeOut('fast');
    });
  });
});
