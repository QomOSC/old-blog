import nprogress from 'nprogress';

const send = (url, data, formData) => new Promise((resolve, reject) => {
  nprogress.start();

  const config = {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      ...data
    })
  };

  if (formData === 'formData') {
    const fd = new FormData();

    for (const v of Object.entries(data)) {
      fd.append(v[0], v[1]);
    }

    config.body = fd;
    config.headers = {};
  }

  fetch(url, config).then(res => res.json()).then(res => {
    nprogress.done();

    resolve(res);
  }).catch(e => {
    reject(e);
  });
});

export default send;
