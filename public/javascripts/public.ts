declare var $: any;

$.ajax({
    method: 'get',
    url: '/demo',
    data: {}
}).done(res => {
    alert(res);
}).fail(e => {
    console.error(e);
});