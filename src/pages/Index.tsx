import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Минималистичная куртка',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/32f48671-d6a2-4a16-9d86-2512259ca741.jpg',
    category: 'Верхняя одежда',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Новинка'
  },
  {
    id: 2,
    name: 'Стильное пальто',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/700702a1-e489-461a-a6fb-091c34ea1a94.jpg',
    category: 'Верхняя одежда',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Хит'
  },
  {
    id: 3,
    name: 'Современная рубашка',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/259875f6-c11a-4727-b443-68f3afb6c148.jpg',
    category: 'Рубашки',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Базовая футболка',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/32f48671-d6a2-4a16-9d86-2512259ca741.jpg',
    category: 'Базовые вещи',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Классические брюки',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/700702a1-e489-461a-a6fb-091c34ea1a94.jpg',
    category: 'Брюки',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6,
    name: 'Трендовый свитшот',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/259875f6-c11a-4727-b443-68f3afb6c148.jpg',
    category: 'Свитшоты',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Скидка'
  }
];

function ProductCard({ 
  product, 
  onAddToCart,
  recommendedProducts 
}: { 
  product: Product; 
  onAddToCart: (product: Product, size: string) => void;
  recommendedProducts: Product[];
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showRecommended, setShowRecommended] = useState(false);

  return (
    <Card className="overflow-hidden group animate-scale-in">
      <div className="relative overflow-hidden">
        {product.badge && (
          <Badge className="absolute top-4 right-4 z-10">{product.badge}</Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-2xl font-bold mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Размер:</label>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className="flex-1"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => {
              onAddToCart(product, selectedSize);
              setShowRecommended(true);
            }}
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            В корзину
          </Button>
        </div>

        {showRecommended && (
          <div className="mt-6 pt-6 border-t animate-fade-in">
            <h4 className="text-sm font-semibold mb-3">Рекомендуем также:</h4>
            <div className="space-y-2">
              {recommendedProducts.map(rec => (
                <div key={rec.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer">
                  <img src={rec.image} alt={rec.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{rec.name}</p>
                    <p className="text-xs text-muted-foreground">{rec.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <Icon name="Plus" size={16} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', 'Верхняя одежда', 'Рубашки', 'Базовые вещи', 'Брюки', 'Свитшоты'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id, size);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getRecommendedProducts = (currentProductId: number) => {
    return products.filter(p => p.id !== currentProductId).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-heading">MODERN WEAR</h1>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-sm hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">О бренде</a>
              <a href="#delivery" className="text-sm hover:text-primary transition-colors">Доставка</a>
              <a href="#reviews" className="text-sm hover:text-primary transition-colors">Отзывы</a>
              <a href="#blog" className="text-sm hover:text-primary transition-colors">Блог</a>
              <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <Card key={`${item.id}-${item.selectedSize}`} className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                                <p className="text-sm font-semibold mt-1">{item.price.toLocaleString('ru-RU')} ₽</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Итого:</span>
                            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.6), rgba(26, 31, 44, 0.6)), url('https://cdn.poehali.dev/projects/2181f701-94b5-4d23-99fa-195bdfed6006/files/32f48671-d6a2-4a16-9d86-2512259ca741.jpg')`
          }}
        />
        <div className="relative z-10 text-center text-white animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-4">
            Стиль новой эры
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Современная одежда для современных людей
          </p>
          <Button size="lg" className="text-lg px-8">
            Смотреть коллекцию
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Каталог</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                recommendedProducts={getRecommendedProducts(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-heading mb-6">О бренде</h2>
            <p className="text-lg text-muted-foreground mb-4">
              MODERN WEAR — это философия современного стиля, где минимализм встречается с функциональностью.
              Мы создаём одежду для тех, кто ценит качество, комфорт и актуальный дизайн.
            </p>
            <p className="text-lg text-muted-foreground">
              Каждая коллекция разрабатывается с учётом последних трендов и предпочтений наших клиентов,
              используя только качественные материалы и современные технологии производства.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover-scale">
              <Icon name="Truck" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-sm text-muted-foreground">По Москве — 1 день, по России — 3-7 дней</p>
            </Card>
            <Card className="p-6 text-center hover-scale">
              <Icon name="Package" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Бесплатная доставка</h3>
              <p className="text-sm text-muted-foreground">При заказе от 5000 ₽</p>
            </Card>
            <Card className="p-6 text-center hover-scale">
              <Icon name="RotateCcw" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Легкий возврат</h3>
              <p className="text-sm text-muted-foreground">14 дней на возврат товара</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Отзывы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Анна М.', rating: 5, text: 'Отличное качество! Куртка села идеально, материал приятный. Очень довольна покупкой.' },
              { name: 'Дмитрий К.', rating: 5, text: 'Быстрая доставка, всё как на фото. Рекомендую этот магазин!' },
              { name: 'Елена П.', rating: 5, text: 'Современный дизайн и удобная посадка. Буду заказывать ещё!' }
            ].map((review, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-muted-foreground">{review.text}</p>
                <p className="font-semibold text-sm">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Блог</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Тренды весны 2024', image: products[0].image, date: '15 марта 2024' },
              { title: 'Как выбрать идеальное пальто', image: products[1].image, date: '10 марта 2024' },
              { title: 'Базовый гардероб: что нужно', image: products[2].image, date: '5 марта 2024' }
            ].map((post, idx) => (
              <Card key={idx} className="overflow-hidden hover-scale cursor-pointer">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <Button variant="link" className="p-0 h-auto">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@modernwear.ru</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold font-heading text-xl mb-4">MODERN WEAR</h3>
              <p className="text-sm opacity-80">Современная одежда для современных людей</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Оплата</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Доставка</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">О нас</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Контакты</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-background hover:text-background/80">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-background/80">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-background/80">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 opacity-20" />
          <p className="text-center text-sm opacity-80">© 2024 MODERN WEAR. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
