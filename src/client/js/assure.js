import izitoast from 'izitoast';

export default (accept = () => {}, reject = () => {}) => {
  izitoast.question({
      timeout: 10000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      rtl: true,
      title: 'مطمئنی؟',
      position: 'center',
      buttons: [
        ['<button><b>اره</b></button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

          accept();

        }, true],
        ['<button>نه</button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

          reject();

        }]
      ]
  });
};
