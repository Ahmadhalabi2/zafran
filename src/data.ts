export type Tag = 'veg' | 'vegan' | 'spicy' | 'gf' | 'new' | 'signature'
export type TableSection = 'study' | 'meeting' | 'vip'
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'pending'

export interface Item {
  id: number
  cat: string
  name: string
  desc: string
  price: number
  tags: Tag[]
  popular?: boolean
  img: string
  kcal: number
  mins: number
  rating: number
}

export interface TableDef {
  id: number
  label: string
  section: TableSection
  seats: number
  x: number   // percent position left
  y: number   // percent position top
  status: TableStatus
  shape: 'round' | 'rect'
}

export const categories = ['Starters', 'Burgers', 'Grills', 'Pasta & Rice', 'Sandwiches', 'Salads', 'Desserts', 'Hot Drinks', 'Cold Drinks']

export const items: Item[] = [
  // ── STARTERS ──────────────────────────────────────────────────
  {
    id: 1, cat: 'Starters', name: 'Crispy Calamari',
    desc: 'Lightly battered squid rings, golden-fried, served with sriracha mayo and lemon wedge.',
    price: 8.9, tags: ['spicy'], popular: true, rating: 4.8, kcal: 310, mins: 10,
    img: 'https://images.getrecipekit.com/20230614185559-sealand-breaded-calamari-with-homemade-sauces.jpg?aspect_ratio=1:1&quality=90&'
  },
  {
    id: 2, cat: 'Starters', name: 'Hummus & Warm Bread',
    desc: 'Creamy homemade hummus drizzled with olive oil, topped with paprika and fresh parsley.',
    price: 6.5, tags: ['vegan', 'gf'], popular: false, rating: 4.7, kcal: 280, mins: 8,
    img: 'https://thefoodiediaries.co/wp-content/uploads/2021/03/img_8477_jpg-1.jpg'
  },
  {
    id: 3, cat: 'Starters', name: 'Chicken Wings',
    desc: 'Smoky BBQ or buffalo-glazed wings, charred to perfection with ranch dipping sauce.',
    price: 10.5, tags: ['spicy', 'signature'], popular: true, rating: 4.9, kcal: 480, mins: 18,
    img: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/06/bbq-chicken-wings-square-FS-8.jpg'
  },
  {
    id: 4, cat: 'Starters', name: 'Bruschetta Trio',
    desc: 'Three toasted sourdough slices: tomato & basil, mushroom truffle, and smoked salmon.',
    price: 9.0, tags: ['new'], popular: false, rating: 4.6, kcal: 320, mins: 12,
    img: 'https://supervalu.ie/image/var/files/real-food/recipes/GFK-Project/trio-of-bruschetta-recipe.jpg'
  },
  {
    id: 5, cat: 'Starters', name: 'Onion Rings',
    desc: 'Thick-cut golden onion rings, beer-battered and served with smoky chipotle sauce.',
    price: 6.0, tags: ['veg'], popular: false, rating: 4.5, kcal: 340, mins: 8,
    img: 'https://www.spoonforkbacon.com/wp-content/uploads/2021/08/beer-battered-onion-rings.jpg'
  },

  // ── BURGERS ───────────────────────────────────────────────────
  {
    id: 6, cat: 'Burgers', name: 'Classic Smash Burger',
    desc: 'Double smash patty, American cheese, pickles, onions, special sauce on brioche bun.',
    price: 13.5, tags: ['signature'], popular: true, rating: 4.9, kcal: 720, mins: 14,
    img: 'https://foodland.com/wp-content/uploads/2023/04/Double-Cheese-Smash-Burger-Web-scaled.jpg'
  },
  {
    id: 7, cat: 'Burgers', name: 'BBQ Bacon Burger',
    desc: 'Beef patty, crispy bacon, cheddar, BBQ sauce, caramelized onions, jalapeños.',
    price: 15.0, tags: ['spicy'], popular: true, rating: 4.8, kcal: 860, mins: 16,
    img: 'https://tatyanaseverydayfood.com/wp-content/uploads/2021/06/Caramelized-Onion-Bacon-Cheeseburger-Recipe.jpg'
  },
  {
    id: 8, cat: 'Burgers', name: 'Mushroom Swiss Burger',
    desc: 'Juicy beef patty, sautéed mushrooms, melted Swiss cheese, garlic aioli.',
    price: 14.0, tags: [], popular: false, rating: 4.7, kcal: 680, mins: 15,
    img: 'https://girlcarnivore.com/wp-content/uploads/2026/05/Mushroom-Swiss-Burger-recipe-25.jpg'
  },
  {
    id: 9, cat: 'Burgers', name: 'Crispy Chicken Burger',
    desc: 'Buttermilk-fried chicken thigh, coleslaw, pickles, hot honey on potato bun.',
    price: 13.0, tags: ['new'], popular: true, rating: 4.8, kcal: 700, mins: 15,
    img: 'https://simplehomeedit.com/wp-content/uploads/2024/07/Crispy-Chicken-Burger-with-Honey-Mustard-Coleslaw-1.webp'
  },
  {
    id: 10, cat: 'Burgers', name: 'Veggie Black Bean Burger',
    desc: 'Smoky black bean patty, avocado, roasted peppers, arugula, chipotle mayo.',
    price: 12.0, tags: ['veg', 'new'], popular: false, rating: 4.5, kcal: 540, mins: 13,
    img: 'https://loveonetoday.com/wp-content/uploads/2018/01/Love-One-Today-Avocado-Recipes-Featured-ole-burgers.jpg'
  },

  // ── GRILLS ────────────────────────────────────────────────────
  {
    id: 11, cat: 'Grills', name: 'Ribeye Steak 300g',
    desc: 'Prime 300g ribeye, grilled to your liking, served with fries and chimichurri.',
    price: 32.0, tags: ['gf', 'signature'], popular: true, rating: 4.9, kcal: 780, mins: 25,
    img: 'https://thebutchershoppe.com.au/cdn/shop/files/steak-of-the-day-served-01_lowres_1280x1280_24dcfc39-8536-43a5-bf23-a5dcda98b1c3.jpg?v=1752202104&width=1445'
  },
  {
    id: 12, cat: 'Grills', name: 'Mixed Grill Platter',
    desc: 'Lamb chops, chicken skewer, kofta, grilled veggies, rice and garlic sauce.',
    price: 28.0, tags: ['signature'], popular: true, rating: 4.8, kcal: 950, mins: 30,
    img: 'https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/hkl536sihszm5y7xvslb?_a=E'
  },
  {
    id: 13, cat: 'Grills', name: 'Grilled Salmon',
    desc: 'Atlantic salmon fillet, lemon butter, asparagus, roasted cherry tomatoes.',
    price: 24.0, tags: ['gf'], popular: false, rating: 4.7, kcal: 520, mins: 22,
    img: 'https://www.somewhatsimple.com/wp-content/uploads/2020/05/grilled_salmon_asparagus_1.jpg'
  },
  {
    id: 14, cat: 'Grills', name: 'Lamb Chops',
    desc: 'Four marinated lamb chops, mint yogurt, grilled flatbread, tabbouleh salad.',
    price: 26.0, tags: ['spicy', 'gf'], popular: false, rating: 4.8, kcal: 680, mins: 28,
    img: 'https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/izeqmvxbbi4buifhlep0?_a=E'
  },

  // ── PASTA & RICE ──────────────────────────────────────────────
  {
    id: 15, cat: 'Pasta & Rice', name: 'Truffle Mushroom Pasta',
    desc: 'Tagliatelle, porcini mushrooms, black truffle oil, aged parmesan, fresh thyme.',
    price: 17.0, tags: ['veg'], popular: true, rating: 4.8, kcal: 640, mins: 18,
    img: 'https://somuchfoodblog.com/wp-content/uploads/2025/03/Truffle-Mushroom-Pasta9.jpg'
  },
  {
    id: 16, cat: 'Pasta & Rice', name: 'Seafood Spaghetti',
    desc: 'Shrimp, clams, calamari in white wine garlic tomato sauce, fresh parsley.',
    price: 21.0, tags: ['signature'], popular: true, rating: 4.9, kcal: 580, mins: 20,
    img: 'https://www.sprinklesandsprouts.com/wp-content/uploads/2024/01/Shrimp-and-Clam-Pasta-sq.jpg'
  },
  {
    id: 17, cat: 'Pasta & Rice', name: 'Chicken Alfredo',
    desc: 'Grilled chicken breast, creamy Alfredo sauce, fettuccine, garlic bread.',
    price: 16.5, tags: [], popular: false, rating: 4.6, kcal: 720, mins: 18,
    img: 'https://www.recipetineats.com/uploads/2017/03/One-Pot-Chicken-Alfredo-2.jpg'
  },
  {
    id: 18, cat: 'Pasta & Rice', name: 'Lamb Biryani',
    desc: 'Slow-cooked basmati rice with tender lamb, caramelized onions, saffron, raita.',
    price: 19.0, tags: ['spicy', 'gf'], popular: true, rating: 4.9, kcal: 820, mins: 25,
    img: 'https://www.panningtheglobe.com/wp-content/uploads/2014/10/indian-lamb-biryani-1.jpg'
  },

  // ── SANDWICHES ────────────────────────────────────────────────
  {
    id: 19, cat: 'Sandwiches', name: 'Club Sandwich',
    desc: 'Triple-decker with chicken, bacon, egg, lettuce, tomato, mayo on toasted white.',
    price: 11.0, tags: [], popular: true, rating: 4.7, kcal: 620, mins: 12,
    img: 'https://www.betterthanbouillon.com/wp-content/uploads/2021/11/ultimate-blt.png'
  },
  {
    id: 20, cat: 'Sandwiches', name: 'Beef Shawarma Wrap',
    desc: 'Marinated beef strips, garlic sauce, pickles, fries wrapped in fresh taboon.',
    price: 10.5, tags: ['spicy', 'signature'], popular: true, rating: 4.8, kcal: 580, mins: 10,
    img: 'https://mccormick.widen.net/content/8wco62nueo/jpeg/shawarma_pita_with_garlic_sauce_1376x774.jpeg'
  },
  {
    id: 21, cat: 'Sandwiches', name: 'Pulled Pork Sub',
    desc: 'Slow-smoked pulled pork, BBQ sauce, jalapeño coleslaw in a toasted hoagie.',
    price: 12.0, tags: ['spicy'], popular: false, rating: 4.6, kcal: 680, mins: 12,
    img: 'https://www.thatzestlife.com/wp-content/uploads/2021/04/barbecue-pork-sandwich.jpg'
  },

  // ── SALADS ────────────────────────────────────────────────────
  {
    id: 22, cat: 'Salads', name: 'Caesar Salad',
    desc: 'Romaine hearts, parmesan shavings, croutons, anchovy Caesar dressing.',
    price: 9.5, tags: [], popular: false, rating: 4.6, kcal: 380, mins: 8,
    img: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-recipe.jpg'
  },
  {
    id: 23, cat: 'Salads', name: 'Greek Salad',
    desc: 'Tomato, cucumber, olives, red onion, feta cheese, oregano, extra virgin olive oil.',
    price: 8.5, tags: ['veg', 'gf'], popular: false, rating: 4.7, kcal: 290, mins: 6,
    img: 'https://www.recipetineats.com/tachyon/2016/07/Greek-Salad_4.jpg'
  },
  {
    id: 24, cat: 'Salads', name: 'Quinoa Power Bowl',
    desc: 'Tri-color quinoa, roasted veggies, avocado, tahini dressing, pomegranate seeds.',
    price: 12.0, tags: ['vegan', 'gf', 'new'], popular: false, rating: 4.5, kcal: 420, mins: 10,
    img: 'https://www.thegardengrazer.com/wp-content/uploads/2014/04/quinoa-avocado-spinach-power-salad-75.jpg'
  },

  // ── DESSERTS ──────────────────────────────────────────────────
  {
    id: 25, cat: 'Desserts', name: 'Chocolate Lava Cake',
    desc: 'Warm molten chocolate cake, vanilla ice cream, raspberry coulis, powdered sugar.',
    price: 8.5, tags: ['veg', 'signature'], popular: true, rating: 4.9, kcal: 520, mins: 14,
    img: 'https://images.unsplash.com/photo-1762631934519-291bf80c3f2a?fm=jpg&q=60&w=3000&auto=format&fit=crop'
  },
  {
    id: 26, cat: 'Desserts', name: 'Kunafa',
    desc: 'Traditional shredded-pastry filled with sweet cheese, rose syrup, crushed pistachios.',
    price: 7.5, tags: ['veg', 'signature'], popular: true, rating: 4.8, kcal: 480, mins: 12,
    img: 'https://www.savoryandsweetfood.com/wp-content/uploads/2018/05/IMG_4820.jpg'
  },
  {
    id: 27, cat: 'Desserts', name: 'Tiramisu',
    desc: 'Classic Italian tiramisu with mascarpone, espresso-soaked ladyfingers, cocoa.',
    price: 8.0, tags: ['veg'], popular: false, rating: 4.7, kcal: 430, mins: 5,
    img: 'https://anitalianinmykitchen.com/wp-content/uploads/2016/12/choc-tiramisu-pict-1-of-1.jpg'
  },
  {
    id: 28, cat: 'Desserts', name: 'Cheesecake Slice',
    desc: 'New York-style vanilla cheesecake on a butter biscuit base, mixed berry compote.',
    price: 7.0, tags: ['veg'], popular: false, rating: 4.6, kcal: 460, mins: 5,
    img: 'https://www.justsotasty.com/wp-content/uploads/2016/05/Lemon-Cheesecake-with-Blueberry-Compote-9.jpg'
  },

  // ── HOT DRINKS ────────────────────────────────────────────────
  {
    id: 29, cat: 'Hot Drinks', name: 'Specialty Espresso',
    desc: 'Double-shot specialty-grade espresso, velvety crema, served with sparkling water.',
    price: 3.5, tags: ['vegan', 'gf'], popular: false, rating: 4.8, kcal: 12, mins: 4,
    img: 'https://barista-essentials.nl/cdn/shop/files/Espresso_koffie_kopje_speckled_01.webp?v=1760042623&width=1445'
  },
  {
    id: 30, cat: 'Hot Drinks', name: 'Flat White',
    desc: 'Ristretto shot with steamed micro-foam whole milk. Rich, smooth and balanced.',
    price: 4.5, tags: ['gf'], popular: true, rating: 4.7, kcal: 120, mins: 5,
    img: 'https://cdn.shopify.com/s/files/1/0792/2666/7327/files/coffee-g04c568284_1920-1024x683.jpg'
  },
  {
    id: 31, cat: 'Hot Drinks', name: 'Cardamom Latte',
    desc: 'Espresso, steamed milk, ground cardamom and a whisper of rose water.',
    price: 5.0, tags: ['signature'], popular: true, rating: 4.9, kcal: 180, mins: 5,
    img: 'http://static1.squarespace.com/static/60a7f0a88306cd37a2b6e189/60a7f549028eea0f43a30dde/65cae9b0a657303500673de0/1707797543418/Rose+Cardamom+Latte-2.jpg?format=1500w'
  },
  {
    id: 32, cat: 'Hot Drinks', name: 'Moroccan Mint Tea',
    desc: 'Fresh spearmint steeped in gunpowder green tea, poured from height, served sweet.',
    price: 3.5, tags: ['vegan', 'gf'], popular: false, rating: 4.6, kcal: 25, mins: 6,
    img: 'https://www.marrakeche.com/wp-content/uploads/2025/02/moroccan-mint-tea-set-7.jpg'
  },

  // ── COLD DRINKS ───────────────────────────────────────────────
  {
    id: 33, cat: 'Cold Drinks', name: 'Fresh Lemonade',
    desc: 'Hand-squeezed lemons, mint, cane sugar syrup, crushed ice. Refillable.',
    price: 4.5, tags: ['vegan', 'gf'], popular: true, rating: 4.8, kcal: 110, mins: 3,
    img: 'https://www.occasionallyeggs.com/wp-content/uploads/2023/05/Honey-mint-lemonade-500x500.jpg'
  },
  {
    id: 34, cat: 'Cold Drinks', name: 'Mango Passion Smoothie',
    desc: 'Blended Alphonso mango, passion fruit, banana, coconut milk, no added sugar.',
    price: 6.0, tags: ['vegan', 'gf', 'new'], popular: true, rating: 4.9, kcal: 210, mins: 4,
    img: 'http://copracoconuts.com/cdn/shop/articles/Coconut_Water_14oz_Pic_July_Mango_Passion_Fruit_Smoothie_23.jpg?v=1751609296'
  },
  {
    id: 35, cat: 'Cold Drinks', name: 'Watermelon Cooler',
    desc: 'Fresh watermelon juice, basil, lime, sparkling water over crushed ice.',
    price: 5.0, tags: ['vegan', 'gf'], popular: false, rating: 4.7, kcal: 90, mins: 4,
    img: 'https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/2014/07/16100523/watermelon-mint-drink.jpg'
  },
  {
    id: 36, cat: 'Cold Drinks', name: 'Cold Brew Coffee',
    desc: '18-hour cold-steeped single-origin coffee, served over ice, light and smooth.',
    price: 5.5, tags: ['vegan', 'gf'], popular: false, rating: 4.7, kcal: 15, mins: 2,
    img: 'https://lifemadesweeter.com/wp-content/uploads/Easy-Cold-Brew-Coffee-Recipe-Vegan-Dairy-Free-Paleo-Healthy.jpg'
  },
]

// ── TABLES ────────────────────────────────────────────────────────────────────
export const tables: TableDef[] = [
  { id: 1,  label: 'S1', section: 'study', seats: 2, x: 8,  y: 12, status: 'available', shape: 'round' },
  { id: 2,  label: 'S2', section: 'study', seats: 2, x: 8,  y: 30, status: 'occupied',  shape: 'round' },
  { id: 3,  label: 'S3', section: 'study', seats: 1, x: 8,  y: 48, status: 'available', shape: 'round' },
  { id: 4,  label: 'S4', section: 'study', seats: 2, x: 22, y: 12, status: 'reserved',  shape: 'round' },
  { id: 5,  label: 'S5', section: 'study', seats: 2, x: 22, y: 30, status: 'available', shape: 'round' },
  { id: 6,  label: 'S6', section: 'study', seats: 1, x: 22, y: 48, status: 'available', shape: 'round' },

  { id: 7,  label: 'M1', section: 'meeting', seats: 4, x: 40, y: 12, status: 'available', shape: 'rect' },
  { id: 8,  label: 'M2', section: 'meeting', seats: 4, x: 57, y: 12, status: 'occupied',  shape: 'rect' },
  { id: 9,  label: 'M3', section: 'meeting', seats: 6, x: 40, y: 38, status: 'available', shape: 'rect' },
  { id: 10, label: 'M4', section: 'meeting', seats: 6, x: 57, y: 38, status: 'reserved',  shape: 'rect' },
  { id: 11, label: 'M5', section: 'meeting', seats: 4, x: 48, y: 62, status: 'available', shape: 'rect' },

  { id: 12, label: 'V1', section: 'vip', seats: 8,  x: 76, y: 10, status: 'available', shape: 'rect' },
  { id: 13, label: 'V2', section: 'vip', seats: 6,  x: 76, y: 38, status: 'occupied',  shape: 'rect' },
  { id: 14, label: 'V3', section: 'vip', seats: 10, x: 76, y: 64, status: 'available', shape: 'rect' },
]

export const sectionMeta: Record<TableSection, { label: string; color: string; bg: string; desc: string; price: number; priceLabel: string }> = {
  study:   { label: 'Study Zone',   color: '#2563EB', bg: '#EFF6FF', desc: 'Quiet area · Fast WiFi · Power outlets',      price: 5,  priceLabel: '5 JD / session' },
  meeting: { label: 'Meeting Area', color: '#D97706', bg: '#FFFBEB', desc: 'Semi-private · Whiteboard access',             price: 10, priceLabel: '10 JD / session' },
  vip:     { label: 'VIP Lounge',   color: '#7C3AED', bg: '#F5F3FF', desc: 'Private · Premium service · Curtained',        price: 20, priceLabel: '20 JD / session' },
}

export const tagLabel: Record<Tag, string> = {
  veg: 'Vegetarian', vegan: 'Vegan', spicy: '🌶 Spicy', gf: 'Gluten-free', new: '✦ New', signature: '★ Signature'
}