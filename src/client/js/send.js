const send = (url, data) => new Promise((resolve, reject) => {
  fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      ...data
    })
  }).then(res => res.json()).then(res => {
    resolve(res);
  }).catch(e => {
    reject(e);
  });
});

export default send;
