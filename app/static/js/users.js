$(document).ready(function () {
    $("div.spinner-border").hide();
    $("button.btn-ban").click(banUser);
});

function showSpinner(user_id) {
    $(`div.spinner-border[user_id=${user_id}]`).show();
};

function hideSpinner(user_id) {
    $(`div.spinner-border[user_id=${user_id}]`).hide();
};

function disableButtons(user_id) {
    $(`button[user_id=${user_id}]`).prop("disabled", true);
};

function enableButtons(user_id) {
    $(`button[user_id=${user_id}]`).prop("disabled", false);
}


function banUser() {
    user_id = $(this).attr("user_id");
    disableButtons(user_id);
    showSpinner(user_id);
    let jqxhr = $.ajax("/chat/users/ban",
        {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ user_id: parseInt(user_id) })
        });
    jqxhr.always(function (data) {
        enableButtons(user_id);
        hideSpinner(user_id);
    });
    jqxhr.done(function (data) {
        if (data.result) {

        } else {

        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {

    });

};