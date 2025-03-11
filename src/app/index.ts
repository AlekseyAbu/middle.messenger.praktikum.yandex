import Handlebars from 'handlebars';
import * as Shared from '../shared';
import * as Widgets from '../widgets';
import * as Pages from '../pages';
import renderDOM from '@/shared/core/renderDom.ts';

const pages: {[key: string]: any} = {
  login: [Pages.LoginPage],
  auth: [Pages.AuthPage],
  main: [Pages.Main],
  setting: [Pages.SettingPage],
  404: [Pages.NotFoundPage],
  500: [Pages.ServerErrorPage],
  list: [Pages.List],
};

Object.entries({ ...Shared, ...Widgets }).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (typeof source === 'function') {
    renderDOM(new source());
    return;
  }

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

export default navigate;
