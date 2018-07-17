$(document).ready(function () {
    // addValue('active_visitors', 4);
    // addValue('active_visitors', 3);
    // addValue('active_visitors', 7);
    addValue('active_visitors', 2);
    addValue('test_me', 2);
    // addValue('test_me', 5);
    getSum('active_visitors');
    getSum('test_me');
});
function getSum(metricKey) {
    $.ajax({
        method: 'get',
        url: "/metric/" + metricKey + "/sum",
    }).done(function (res) {
        var result = "<li>GET /metric/" + metricKey + "/sum [Result: " + res + "]</li>";
        $('.get').append(result);
    }).fail(function (e) {
        console.error("Failed calling the metric endpoint");
    });
}
function addValue(metricKey, value) {
    $.ajax({
        method: 'post',
        url: "/metric/" + metricKey,
        data: { value: value }
    }).done(function (res) {
        var result = "<li>POST /metric/" + metricKey + " {value:" + value + "}</li>";
        $('.post').append(result);
    }).fail(function (e) {
        console.error("Failed calling the metric endpoint");
    });
}
