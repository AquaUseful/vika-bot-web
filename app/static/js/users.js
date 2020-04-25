$(document).ready(function () {
    $("div.spinner-border").hide();
    $("div.alert").hide();
    $("button.btn-ban").click(banUser);
    $("button.btn-kick").click(kickUser);
    $("button.btn-unban").click(unbanUser);
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
};

function showAlert(user_id, timeout) {
    $(`div.alert[user_id=${user_id}]`).slideDown("slow", function () {
        setTimeout(function () {
            $(`div.alert[user_id=${user_id}]`).slideUp("slow");
        }, 2000);
    });
};

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
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {

        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {

    });

};

function kickUser() {
    user_id = $(this).attr("user_id");
    disableButtons(user_id);
    showSpinner(user_id);
    let jqxhr = $.ajax("/chat/users/kick",
        {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ user_id: parseInt(user_id) })
        });
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(user_id);
            disableButtons(user_id);
            $(`div.alert[user_id=${user_id}]`).text("This user can not be kicked!");
            showAlert(user_id, 1000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {

    });
};

function unbanUser() {
    user_id = $(this).attr("user_id");
    disableButtons(user_id);
    showSpinner(user_id);
    let jqxhr = $.ajax("/chat/users/unban",
        {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ user_id: parseInt(user_id) })
        });
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(user_id);
            disableButtons(user_id);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {

    });
};