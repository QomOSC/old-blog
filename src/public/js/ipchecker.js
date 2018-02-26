fetch('https://freegeoip.net/json/').then(res => res.json()).then(ip => {

  fetch(`/article/${URL}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      ip: ip.ip
    })
  }).then(res => res.json()).then(() => {});
});
