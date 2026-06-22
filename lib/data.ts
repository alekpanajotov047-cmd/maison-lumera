export type Fragrance = {
  number: string;
  name: string;
  subtitle: string;
  family: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  price: number;
  volume: string;
  image: string;
  accent: string;
};

export const fragrances: Fragrance[] = [
  {
    number: 'N° 01',
    name: "Rose d'Ambre",
    subtitle: 'Кадифе, дим и роза в късна следобедна светлина.',
    family: 'Флорален · Ориенталски',
    notes: {
      top: ['Розов пипер', 'Бергамот'],
      heart: ['Майска роза', 'Ирис'],
      base: ['Амбра', 'Сандалово дърво', 'Бензоин'],
    },
    price: 185,
    volume: '50 мл',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    accent: '#C28B6B',
  },
  {
    number: 'N° 02',
    name: 'Nuit Blanche',
    subtitle: 'Безсънна нощ, смекчена от жасмин.',
    family: 'Бял флорален · Шипър',
    notes: {
      top: ['Бергамот', 'Бял чай'],
      heart: ['Жасмин самбак', 'Тубероза'],
      base: ['Ветивер', 'Кашмеран'],
    },
    price: 210,
    volume: '50 мл',
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    accent: '#A38B6F',
  },
  {
    number: 'N° 03',
    name: 'Figuier Noir',
    subtitle: 'Сок от черна смокиня върху топъл провансалски камък.',
    family: 'Древесен · Зелен',
    notes: {
      top: ['Зелена смокиня', 'Касис'],
      heart: ['Смокинов лист', 'Виолетка'],
      base: ['Кедър', 'Бял мускус', 'Тонка'],
    },
    price: 195,
    volume: '50 мл',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    accent: '#8C7A5E',
  },
  {
    number: 'N° 04',
    name: 'Soleil Doré',
    subtitle: 'Шафранен пладнен — позлатен и неподвижен.',
    family: 'Амбров · Гурме',
    notes: {
      top: ['Шафран', 'Кардамом'],
      heart: ['Ирис', 'Орисово масло'],
      base: ['Бурбонска ванилия', 'Лабданум', 'Амбра'],
    },
    price: 225,
    volume: '50 мл',
    image:
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80',
    accent: '#C9A961',
  },
];

export const testimonials = [
  {
    quote:
      'Nuit Blanche е първият парфюм от години, който кара непознати да спират на улицата. Тихо опустошителен.',
    author: 'Елоиз Маршан',
    role: 'Vogue Париж',
  },
  {
    quote:
      'Rose d’Ambre се носи като кашмир. Lumèra преписаха това какво трябва да усеща нишовият парфюм.',
    author: 'Каспар Холм',
    role: 'Monocle Magazine',
  },
  {
    quote:
      'Най-внимателно подредената парфюмерийна къща, излязла от Грас за последното десетилетие. Всяка бутилка е малко любовно писмо.',
    author: 'Найма Саид',
    role: 'Парфюмер, Mount Royal',
  },
];
