let ajaxParams = {
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: ""
}

$(document).ready(function() {
    $("div.spinner-border").hide();
    $("div.alert").hide();
    $("button.btn-ban").click(banUser);
    $("button.btn-unban").click(unbanUser);
    $("button.btn-kick").click(kickUser);
    $("button.btn-promote").click(promoteUser);
    $("button.btn-demote").click(demoteUser);
});

function showSpinner(userID) {
    $(`div.spinner-border[user_id=${userID}]`).show();
};

function hideSpinner(userID) {
    $(`div.spinner-border[user_id=${userID}]`).hide();
};

function disableBanKickButtons(userID) {
    $(`button.btn-kick[user_id=${userID}]`).prop("disabled", true);
    $(`button.btn-ban[user_id=${userID}]`).prop("disabled", true);
    $(`button.btn-unban[user_id=${userID}]`).prop("disabled", true);
};

function enableBanKickButtons(userID) {
    $(`button.btn-kick[user_id=${userID}]`).prop("disabled", false);
    $(`button.btn-ban[user_id=${userID}]`).prop("disabled", false);
    $(`button.btn-unban[user_id=${userID}]`).prop("disabled", false);
};

function disablePromoteDemoteButtons(userID) {
    $(`button.btn-promote[user_id=${userID}]`).prop("disabled", true);
    $(`button.btn-demote[user_id=${userID}]`).prop("disabled", true);
};

function enablePromoteDemoteButtons(userID) {
    $(`button.btn-promote[user_id=${userID}]`).prop("disabled", false);
    $(`button.btn-demote[user_id=${userID}]`).prop("disabled", false);
};


function showAlert(userID, timeout) {
    $(`div.alert[user_id=${userID}]`).slideDown("slow", function() {
        setTimeout(function() {
            $(`div.alert[user_id=${userID}]`).slideUp("slow");
        }, timeout);
    });
};

function setAlertText(userID, text) {
    $(`div.alert[user_id=${userID}]`).text(text);
};

function banUser() {
    userID = $(this).attr("user_id");
    disableBanKickButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/ban", params);
    jqxhr.done(function(data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            setAlertText(userID, "This user can not be banned!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function(jqxhr, textStatus) {
        hideSpinner(userID);
        enableBanKickButtons(userID);
        setAlertText(userID, `Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });

};

function kickUser() {
    userID = $(this).attr("user_id");
    disableBanKickButtons(userID);
    showSpinner(userID);
    let params = ajaxParams
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/kick", params);
    jqxhr.done(function(data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            setAlertText(userID, "This user can not be kicked!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function(jqxhr, textStatus) {
        hideSpinner(userID);
        enableBanKickButtons(userID);
        setAlertText(userID, `Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });
};

function unbanUser() {
    userID = $(this).attr("user_id");
    disableBanKickButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) })
    let jqxhr = $.ajax("/chat/users/unban", params);
    jqxhr.done(function(data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            setAlertText(userID, "This user can not be unbanned!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function(jqxhr, textStatus) {
        hideSpinner(userID);
        enableBanKickButtons(userID);
        setAlertText(userID, `Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });
};

function promoteUser() {
    userID = $(this).attr("user_id");
    disablePromoteDemoteButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) });
    let jqxhr = $.ajax("/chat/users/promote", params);
    jqxhr.done(function(data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            setAlertText(userID, "This user can not be promoted!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function(jqxhr, textStatus) {
        hideSpinner(userID);
        enablePromoteDemoteButtons(userID);
        setAlertText(userID, `Request failed! (${textStatus})`);
        showAlert(userID, 2000);
    });
};

function demoteUser() {
    userID = $(this).attr("user_id");
    disablePromoteDemoteButtons(userID);
    showSpinner(userID);
    let params = ajaxParams;
    params.data = JSON.stringify({ user_id: parseInt(userID) });
    let jqxhr = $.ajax("/chat/users/demote", params);
    jqxhr.done(function(data) {
        if (data.result) {
            window.location.reload();
        } else {
            hideSpinner(userID);
            setAlertText(userID, "This user can not be demoted!");
            showAlert(userID, 2000);
        };
    });
    jqxhr.fail(function(jqxhr) {
        hideSpinner(userID);
        enablePromoteDemoteButtons(userID);
        setAlertText(userID, `Request failed! (${jqxhr.status})`);
        showAlert(userID, 2000);
    });

};