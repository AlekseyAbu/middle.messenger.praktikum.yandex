import './shared/style/index.scss'
import './shared/style/reset.css'
import navigate from './app'


document.addEventListener('DOMContentLoaded', () => navigate('list'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
