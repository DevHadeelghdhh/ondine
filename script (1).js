const menuData = {
  raw: [
    ['01', 'Oysters · Gillardeau No. 3', 'mignonette / smoked apple / sea herbs', '€4 ea'],
    ['02', 'Red prawn crudo', 'blood orange / fennel pollen / olive oil', '€19'],
    ['03', 'Tuna belly tartare', 'miso mustard / caper leaf / crisp rye', '€21'],
    ['04', 'Clams on ice', 'green peppercorn / preserved lemon / parsley', '€16']
  ],
  small: [
    ['01', 'Charred octopus', 'white bean cream / pimentón / burnt lemon', '€18'],
    ['02', 'Salt cod fritter', 'Ponta Delgada cheese / chive aioli', '€12'],
    ['03', 'Grilled sardine toast', 'tomato water / sourdough / basil oil', '€14'],
    ['04', 'Seaweed & potato', 'roasted garlic / smoked roe / dill', '€11']
  ],
  main: [
    ['01', 'Line-caught turbot', 'brown butter / sea greens / young leek', '€34'],
    ['02', 'Lobster arroz caldoso', 'carabineros / saffron / bisque', '€38'],
    ['03', 'Hake collar', 'charred cabbage / anchovy jus / potato', '€29'],
    ['04', 'Mushroom & seaweed rice', 'shiitake / sea lettuce / aged cheese', '€24']
  ],
  sweet: [
    ['01', 'Burnt Basque cheesecake', 'fig leaf cream / sea salt / quince', '€10'],
    ['02', 'Atlantic lemon posset', 'olive oil biscuit / fennel pollen', '€9'],
    ['03', 'Chocolate & miso', 'cocoa nib / smoked cream / pear', '€11'],
    ['04', 'Cheese from the islands', 'quince paste / lavash / wild honey', '€14']
  ]
};

const categoryImages = {
  raw: '/manus-storage/async-images/RiA7k1hGn01yACZtXUUmrT/image-1.webp',
  small: '/manus-storage/async-images/RiA7k1hGn01yACZtXUUmrT/image-2.webp',
  main: '/manus-storage/async-images/RiA7k1hGn01yACZtXUUmrT/image-3.webp',
  sweet: '/manus-storage/async-images/RiA7k1hGn01yACZtXUUmrT/image-4.webp'
};

const list = document.querySelector('#menu-list');
const tabs = document.querySelectorAll('.menu-tab');
function renderMenu(category = 'raw') {
  list.innerHTML = menuData[category].map(([number, name, description, price], index) => `
    <article class="menu-item" style="animation-delay:${index * 60}ms">
      <span class="dish-number">${number}</span>
      <img class="dish-thumb" src="${categoryImages[category]}" alt="${name}" loading="lazy" />
      <div><div class="dish-name">${name}</div><p class="dish-description">${description}</p></div>
      <span class="dish-price">${price}</span>
    </article>
  `).join('');
}
renderMenu();
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  renderMenu(tab.dataset.category);
}));

const dateInput = document.querySelector('#booking-date');
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split('T')[0];

const form = document.querySelector('#booking-form');
const message = document.querySelector('#form-message');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const date = new Date(`${formData.get('date')}T12:00:00`);
  const readableDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' }).format(date);
  message.classList.remove('error');
  message.textContent = `Thank you — we received your request for ${readableDate} at ${formData.get('time')}. We’ll be in touch shortly.`;
  form.reset();
  dateInput.min = today.toISOString().split('T')[0];
});

const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
