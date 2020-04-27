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
        }, timeout);
    });
};

function setAlertText(user_id, text) {
    $(`div.alert[user_id=${user_id}]`).text(text);
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
            hideSpinner(user_id);
            disableButtons(user_id);
            setAlertText(user_id, "This user can not be banned!");
            showAlert(user_id, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(user_id);
        enableButtons(user_id);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(user_id, 2000);
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
            setAlertText(user_id, "This user can not be kicked!");
            showAlert(user_id, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(user_id);
        enableButtons(user_id);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(user_id, 2000);
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
            setAlertText(user_id, "This user can not be unbanned!");
            showAlert(user_id, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(user_id);
        enableButtons(user_id);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(user_id, 2000);
    });
};