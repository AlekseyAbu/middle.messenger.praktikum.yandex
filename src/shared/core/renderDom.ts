// import Block from './block';
//
// export default function renderDOM(block: Block) {
//   const root = document.querySelector('#app');
//
//   root!.innerHTML = '';
//   const content = block.getContent();
//   if (content) {
//     root!.appendChild(content);
//   }
// }
//
// export function render(query: string, block: Block) {
//   const root = document.querySelector(query);
//
//   const content = block.getContent();
//   if (content) {
//     root!.appendChild(content);
//   }
//
//   block.dispatchComponentDidMount();
//
//   return root;
// }

import Block from './block';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}

export function render(query, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
