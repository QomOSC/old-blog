fetch('https://freegeoip.net/json/').then(res => res.json()).then(ip => {

  fetch(`/post/${URL}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      ip: ip.ip
    })
  }).then(res => res.json()).then(data => {
    console.log(data);
  }).catch(() => {
    console.error('Counld not resolve host');
  });
}).catch(() => {
  console.error('Counld not resolve host https://freegeoip.net/json/');
});
