import './shared/style/index.scss';
import './shared/style/reset.scss';
import navigate from './app';

document.addEventListener('DOMContentLoaded', () => navigate('list'));

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target) {
    const page = target.getAttribute('page');

    if (page) {
      navigate(page);
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
