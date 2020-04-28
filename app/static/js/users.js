let ajaxParams = {
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: ""
}

$(document).ready(function () {
    $("div.spinner-border").hide();
    $("div.alert").hide();
    $("button.btn-ban").click(banUser);
    $("button.btn-kick").click(kickUser);
    $("button.btn-unban").click(unbanUser);
});

function showSpinner(userID) {
    $(`div.spinner-border[user_id=${userID}]`).show();
};

function hideSpinner(userID) {
    $(`div.spinner-border[user_id=${userID}]`).hide();
};

function disableButtons(userID) {
    $(`button[user_id=${userID}]`).prop("disabled", true);
};

function enableButtons(userID) {
    $(`button[user_id=${userID}]`).prop("disabled", false);
};

function showAlert(userID, timeout) {
    $(`div.alert[user_id=${userID}]`).slideDown("slow", function () {
        setTimeout(function () {
            $(`div.alert[user_id=${userID}]`).slideUp("slow");
        }, timeout);
    });
};

function setAlertText(userID, text) {
    $(`div.alert[user_id=${userID}]`).text(text);
};

function banUser() {
    userID = $(this).attr("user_id");
    disableButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/kick", params);
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            disableButtons(userID);
            setAlertText(userID, "This user can not be banned!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(userID);
        enableButtons(userID);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });

};

function kickUser() {
    userID = $(this).attr("user_id");
    disableButtons(userID);
    showSpinner(userID);
    let params = ajaxParams
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/kick", params);
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            disableButtons(userID);
            setAlertText(userID, "This user can not be kicked!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(userID);
        enableButtons(userID);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });
};

function unbanUser() {
    userID = $(this).attr("user_id");
    disableButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/kick", params);
    jqxhr.done(function (data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            disableButtons(userID);
            setAlertText(userID, "This user can not be unbanned!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function (jqxhr, textStatus) {
        hideSpinner(userID);
        enableButtons(userID);
        setAlertText(`Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });
};

function promoteUser() {
    userID = $(this).attr("user_id");
    disableButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/kick", params);
};

function demoteUser() {
    userID = $(this).attr("user_id");

};