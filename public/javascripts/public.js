$.ajax({
    method: 'get',
    url: '/demo',
    data: {}
}).done(function (res) {
    alert(res);
}).fail(function (e) {
    console.error(e);
});
