$(document).ready(() => {
  $("#add-team-form").ajaxForm({
    url: '/api/addTeam',
    dataType: 'json',
    success: (res) => {
      if (res.res == "Team added successfully"){
        alert("تیم با موفقیت اضافه شد.");
      }
    }
  })
});
