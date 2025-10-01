import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const categories = [
    { name: 'Кухни', icon: 'UtensilsCrossed' },
    { name: 'Спальни', icon: 'BedDouble' },
    { name: 'Гостиные', icon: 'Sofa' },
    { name: 'Гардеробные', icon: 'Shirt' },
    { name: 'Ванные комнаты', icon: 'Bath' },
    { name: 'Детские', icon: 'Baby' },
    { name: 'Прихожие', icon: 'DoorOpen' },
    { name: 'Офисы', icon: 'Briefcase' },
    { name: 'Мягкие панели', icon: 'Box' },
    { name: 'Декор', icon: 'Palette' },
    { name: 'Торговые оборудования', icon: 'Store' },
  ];

  const timeline = [
    { year: '1998', title: 'Основание компании', description: 'Создание небольшой мебельной мастерской с командой из 5 человек. Первые заказы на изготовление кухонной мебели.' },
    { year: '2005', title: 'Расширение производства', description: 'Внедрение современного оборудования и увеличение штата.' },
    { year: '2012', title: 'Премиум сегмент', description: 'Переход к производству мебели премиум-класса. Сотрудничество с ведущими дизайнерами интерьеров.' },
    { year: '2018', title: 'Цифровые технологии', description: 'Запуск 3D-конфигуратора и системы виртуальной примерки мебели. Внедрение CRM-системы.' },
    { year: '2023', title: '25 лет успеха', description: 'Юбилей компании. Более 5000 выполненных проектов, собственное производство площадью 1000 кв.м.' },
  ];

  const portfolio = [
    { id: 1, image: '/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg', title: 'Современная кухня', category: 'Кухни' },
    { id: 2, image: '/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg', title: 'Элегантная спальня', category: 'Спальни' },
    { id: 3, image: '/img/3de30437-f746-455d-a0be-af860784e138.jpg', title: 'Гардеробная система', category: 'Гардеробные' },
  ];

  const promos = [
    { title: 'Скидка 15% на кухни', description: 'При заказе кухни до конца месяца', discount: '-15%' },
    { title: 'Бесплатная доставка', description: 'На все заказы от 100 000 ₽', discount: 'FREE' },
    { title: '3D визуализация в подарок', description: 'Для всех новых клиентов', discount: 'GIFT' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">МебельАрт</h1>
            <div className="hidden md:flex gap-6">
              {['home', 'categories', 'about', 'portfolio', 'configurator', 'promos', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm transition-colors hover:text-accent ${
                    activeSection === section ? 'text-accent font-medium' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'categories' && 'Категории'}
                  {section === 'about' && 'О нас'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'configurator' && '3D Конфигуратор'}
                  {section === 'promos' && 'Акции'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-primary">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
                Создаём мебель вашей мечты с 1998 года
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Премиальная мебель на заказ. Собственное производство, индивидуальный дизайн, 
                25 лет опыта и более 5000 довольных клиентов.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => scrollToSection('configurator')} size="lg" className="bg-primary hover:bg-primary/90">
                  Попробовать конфигуратор
                </Button>
                <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline">
                  Смотреть проекты
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src="/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg"
                alt="Премиальная мебель"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Наши направления</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Icon name={category.icon} size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Наша история</h2>
            <p className="text-lg text-muted-foreground">
              Все началось в 1998 году, когда основатель компании решил создать мебельное производство нового уровня. 
              Мы поставили перед собой амбициозную цель — изменить представление людей о качестве и дизайне мебели.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent/30 hidden md:block"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-accent mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-8 h-8 bg-accent rounded-full border-4 border-background z-10"></div>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Наши проекты</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <Badge className="mb-2 bg-accent text-primary">{project.category}</Badge>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="configurator" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">3D Конфигуратор</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Создайте мебель своей мечты в нашем интерактивном 3D конфигураторе. 
            Выбирайте материалы, цвета и размеры в режиме реального времени.
          </p>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="bg-secondary/50 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Box" size={64} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-bold text-primary mb-2">Интерактивный 3D конфигуратор</h3>
                  <p className="text-muted-foreground mb-6">Создавайте и визуализируйте вашу мебель в 3D</p>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary">
                    Запустить конфигуратор
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="promos" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Актуальные акции</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {promos.map((promo, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-primary text-lg px-4 py-2">{promo.discount}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 pr-20">{promo.title}</h3>
                  <p className="text-muted-foreground mb-6">{promo.description}</p>
                  <Button variant="outline" className="w-full">Подробнее</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Готовы обсудить ваш проект? Оставьте заявку, и наш менеджер свяжется с вами в течение часа.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Производственная, 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Email</h4>
                    <p className="text-muted-foreground">info@mebelart.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Режим работы</h4>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 19:00<br />Сб-Вс: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-8">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea placeholder="Расскажите о вашем проекте..." rows={4} />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">МебельАрт</h3>
              <p className="text-sm opacity-80">Производство премиальной мебели с 1998 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Кухни</li>
                <li>Спальни</li>
                <li>Гостиные</li>
                <li>Офисы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Акции</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Icon name="Instagram" size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
                <Icon name="Facebook" size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
                <Icon name="Youtube" size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            © 2024 МебельАрт. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
