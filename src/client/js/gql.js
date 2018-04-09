import nprogress from 'nprogress';

export default query => new Promise((resolve, reject) => {
  nprogress.start();

  fetch('/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      query
    })
  }).then(res => res.json()).then(data => {
    resolve(data);
    nprogress.done();
  }).catch(e => {
    reject(e);
  });
});
