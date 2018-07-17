declare var $: any;


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

function getSum(metricKey: string) {
    $.ajax({
        method: 'get',
        url: `/metric/${metricKey}/sum`,
    }).done(res => {
        let result: string = `<li>GET /metric/${metricKey}/sum [Result: ${res}]</li>`;
        $('.get').append(result);

    }).fail(e => {
        console.error(`Failed calling the metric endpoint`);
    });
}

function addValue(metricKey: string, value: number) {
    $.ajax({
        method: 'post',
        url: `/metric/${metricKey}`,
        data: {value}
    }).done(res => {
        let result: string = `<li>POST /metric/${metricKey} {value:${value}}</li>`;
        $('.post').append(result);

    }).fail(e => {
        console.error(`Failed calling the metric endpoint`);
    });
}