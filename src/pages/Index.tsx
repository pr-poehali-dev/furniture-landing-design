import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const heroSlides = [
    {
      title: 'Создаём мебель вашей мечты с 1998 года',
      description: 'Премиальная мебель на заказ. Собственное производство, индивидуальный дизайн, 25 лет опыта и более 5000 довольных клиентов.',
      image: '/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg'
    },
    {
      title: 'Индивидуальный дизайн для каждого проекта',
      description: 'Наши дизайнеры создают уникальные решения, которые идеально впишутся в ваш интерьер и отражают вашу индивидуальность.',
      image: '/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg'
    },
    {
      title: 'Производство полного цикла',
      description: 'Современное оборудование, квалифицированные мастера и контроль качества на каждом этапе гарантируют безупречный результат.',
      image: '/img/3de30437-f746-455d-a0be-af860784e138.jpg'
    }
  ];

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
    { 
      id: 1, 
      image: '/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg', 
      title: 'Mondrian', 
      category: 'Кухни',
      size: 'normal'
    },
    { 
      id: 2, 
      image: '/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg', 
      title: 'Nirnia', 
      category: 'Спальни',
      size: 'large'
    },
    { 
      id: 3, 
      image: '/img/3de30437-f746-455d-a0be-af860784e138.jpg', 
      title: 'Artex', 
      category: 'Гардеробные',
      size: 'normal'
    },
    { 
      id: 4, 
      image: '/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg', 
      title: 'Valencia', 
      category: 'Гостиные',
      size: 'normal'
    },
    { 
      id: 5, 
      image: '/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg', 
      title: 'Brooklyn', 
      category: 'Офисы',
      size: 'large'
    },
    { 
      id: 6, 
      image: '/img/3de30437-f746-455d-a0be-af860784e138.jpg', 
      title: 'Minimalist', 
      category: 'Ванные',
      size: 'normal'
    },
    { 
      id: 7, 
      image: '/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg', 
      title: 'Scandinavia', 
      category: 'Детские',
      size: 'wide'
    },
    { 
      id: 8, 
      image: '/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg', 
      title: 'Luxe', 
      category: 'Прихожие',
      size: 'normal'
    },
  ];

  const promos = [
    { title: 'Скидка 15% на кухни', description: 'При заказе кухни до конца месяца', discount: '-15%' },
    { title: 'Бесплатная доставка', description: 'На все заказы от 100 000 ₽', discount: 'FREE' },
    { title: '3D визуализация в подарок', description: 'Для всех новых клиентов', discount: 'GIFT' },
  ];

  const benefits = [
    { icon: 'Award', title: '10+ лет опыта', description: 'Мы создали более 5000 проектов для довольных клиентов.' },
    { icon: 'Gem', title: 'Премиум качество', description: 'Используем только лучшие материалы от проверенных поставщиков.' },
    { icon: 'Clock', title: 'Быстрые сроки', description: 'От проектирования до монтажа - в среднем 30 дней.' },
    { icon: 'DollarSign', title: 'Честные цены', description: 'Никаких скрытых платежей и дополнительных расходов.' },
    { icon: 'Lightbulb', title: 'Нестандартные решения', description: 'Реализуем проекты любой сложности и конфигурации.' },
    { icon: 'Package', title: 'Комплексный подход', description: 'От замеров и дизайн-проекта до монтажа "под ключ".' },
  ];

  const workSteps = [
    { number: '01', title: 'Консультация и замер', description: 'Бесплатно выезжаем на объект, обсуждаем детали и пожелания, делаем точные замеры помещения.' },
    { number: '02', title: 'Дизайн-проект', description: 'Создаем 3D-визуализацию с учетом ваших пожеланий, вносим корректировки до полного утверждения.' },
    { number: '03', title: 'Производство', description: 'Изготавливаем мебель на собственном производстве с использованием современного оборудования.' },
    { number: '04', title: 'Доставка и монтаж', description: 'Привозим и профессионально устанавливаем мебель в удобное для вас время.' },
  ];

  const faqItems = [
    { question: 'Какой срок изготовления мебели?', answer: 'Средний срок изготовления составляет 25-30 дней с момента утверждения дизайн-проекта. Сроки могут варьироваться в зависимости от сложности проекта и загруженности производства.' },
    { question: 'Можно ли заказать только дизайн-проект без изготовления мебели?', answer: 'Да, мы предоставляем услуги по созданию дизайн-проекта отдельно. Стоимость зависит от объема работ и сложности проекта.' },
    { question: 'Какие материалы вы используете в производстве?', answer: 'Мы работаем с премиальными материалами европейских и российских производителей: ЛДСП, МДФ, массив дерева, натуральный шпон, акриловые фасады, столешницы из искусственного камня и натурального мрамора.' },
    { question: 'Предоставляете ли вы гарантию на мебель?', answer: 'Да, мы предоставляем гарантию 24 месяца на все изделия. Гарантия распространяется на производственные дефекты и качество сборки.' },
    { question: 'Можно ли заказать мебель нестандартного размера?', answer: 'Конечно! Мы специализируемся на производстве мебели по индивидуальным размерам. Это позволяет максимально эффективно использовать пространство вашего помещения.' },
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
            <h1 className="text-xl md:text-2xl font-bold text-primary">Ваша мебель</h1>
            <div className="flex items-center gap-2 md:gap-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Переключить тему"
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
              </button>
              <div className="hidden md:flex gap-6">
              {['home', 'categories', 'about', 'portfolio', 'configurator', 'promos'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm transition-colors hover:text-accent relative ${
                    activeSection === section ? 'text-accent font-medium' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'categories' && 'Категории'}
                  {section === 'about' && 'О нас'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'configurator' && '3D Конфигуратор'}
                  {section === 'promos' && <>
                    Акции
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                  </>}
                </button>
              ))}
              </div>
              <Button onClick={() => window.location.href = '/contacts'} className="bg-accent hover:bg-accent/90 text-primary text-xs md:text-sm px-3 md:px-4">
                <Icon name="Phone" size={16} className="md:mr-2" />
                <span className="hidden md:inline">Контакты</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/10 animate-gradient-shift bg-[length:200%_200%]"></div>
        <div className="container mx-auto relative z-10">
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full"
          >
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <Button onClick={() => scrollToSection('configurator')} size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform w-full sm:w-auto">
                          Попробовать конфигуратор
                        </Button>
                        <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline" className="hover:scale-105 transition-transform w-full sm:w-auto">
                          Смотреть проекты
                        </Button>
                      </div>
                    </div>
                    <div className="animate-fade-in relative mt-8 md:mt-0">
                      <div className="absolute -inset-4 bg-accent/20 rounded-lg blur-2xl animate-pulse-slow"></div>
                      <img
                        src={slide.image}
                        alt="Премиальная мебель"
                        className="rounded-lg shadow-2xl w-full h-[300px] md:h-[500px] object-cover relative z-10"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="hidden md:flex right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </Carousel>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <Icon name="ChevronDown" size={32} className="text-accent" />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Почему выбирают нас</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы создаем не просто мебель, а пространства, в которых хочется жить
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full hover:shadow-2xl transition-shadow border-2 hover:border-accent/50">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-all animate-float">
                      <Icon name={benefit.icon} size={32} className="text-accent group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 px-4 bg-secondary/30 animate-on-scroll">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Наши направления</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-4 md:p-6 text-center relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-all group-hover:animate-float">
                    <Icon name={category.icon} size={24} className="md:w-8 md:h-8 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Как мы работаем</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Четкий и прозрачный процесс создания вашей мебели
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6 group-hover:bg-accent/20 transition-all group-hover:scale-110 duration-300">
                    <span className="text-4xl font-bold text-accent">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {index < workSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-accent/20 -ml-4 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-background animate-on-scroll">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-none mb-8">
                О НАС
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Luxurious Interior and Industrial Design
                  </h3>
                </div>
                
                <div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden h-[400px]">
                <img
                  src="/img/d4e62784-5b17-46a5-a7a3-c23d6d202d73.jpg"
                  alt="Интерьер гостиной"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="relative rounded-3xl overflow-hidden h-[180px]">
                <img
                  src="/img/3de30437-f746-455d-a0be-af860784e138.jpg"
                  alt="Рабочее пространство"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Наша философия
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  Мы создаем роскошные, персонализированные интерьеры, которые отражают вкусы и образ жизни наших клиентов.
                </p>
                <Button onClick={() => window.location.href = '/contacts'} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Перейти к контактам
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-7">
              <div className="relative rounded-3xl overflow-hidden h-[500px] group">
                <img
                  src="/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg"
                  alt="Modern Minimalist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 px-4 py-2">
                    Georgeus Interior
                  </Badge>
                </div>
                <div className="absolute bottom-8 left-8 backdrop-blur-sm rounded-2xl px-8 py-4 bg-background/80">
                  <h3 className="text-4xl font-bold text-foreground">
                    Modern<br/>Minimalist
                  </h3>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-secondary/50 rounded-3xl p-8 flex-1 flex flex-col justify-center">
                <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 w-fit mb-6">
                  Aesthetic
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  Aesthetic Furniture where every piece tells a story of style
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Into a gallery<br/>of elegance
                </h3>
              </div>

              <div className="relative rounded-3xl overflow-hidden h-[220px] group">
                <img
                  src="/img/3de30437-f746-455d-a0be-af860784e138.jpg"
                  alt="Best Furniture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 px-4 py-2">
                    Best Furniture
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-medium">
                    Indulge in the artistry<br/>of everyday living
                  </p>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Icon name="ArrowUpRight" size={20} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Продуктов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Satisfied Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                1<sup className="text-3xl">st</sup>
              </div>
              <div className="text-muted-foreground">Top 1 in Paris</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-old" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Наша история</h2>
            <p className="text-base md:text-lg text-muted-foreground">
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
                    <CardContent className="p-4 md:p-6">
                      <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{item.year}</div>
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
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

      <section id="portfolio" className="py-20 px-4 bg-background animate-on-scroll">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                Наши проекты
              </h2>
            </div>
            <div className="md:max-w-md">
              <p className="text-muted-foreground text-sm md:text-base">
                Poliform представит свое видение современной архитектуры, трендов интерьерного дизайна 
                и инновационной жизни на Salone del Mobile Milano 2024.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white self-start md:self-auto"
            >
              View More
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
            {portfolio.map((project, index) => {
              let gridClass = 'md:col-span-2';
              
              if (project.size === 'large') {
                gridClass = 'md:col-span-2 md:row-span-2';
              } else if (project.size === 'wide') {
                gridClass = 'md:col-span-4';
              }
              
              return (
                <div 
                  key={project.id} 
                  className={`group relative ${gridClass}`}
                >
                  <div className="relative overflow-hidden rounded-3xl h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0 ml-4">
                        <Icon name="ArrowUpRight" size={18} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="configurator" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">3D Конфигуратор</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Создайте мебель своей мечты в нашем интерактивном 3D конфигураторе. 
            Выбирайте материалы, цвета и размеры в режиме реального времени.
          </p>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="bg-secondary/50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent animate-pulse-slow"></div>
                <div className="text-center relative z-10">
                  <Icon name="Box" size={64} className="mx-auto mb-4 text-accent animate-float" />
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

      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">FAQs</p>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Всё что нужно знать
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Всё что вам нужно знать о нашей продукции и услугах. Не нашли ответ? 
                Напишите нашей дружелюбной команде.
              </p>
              
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src="/img/be5b50aa-c16a-400d-91ac-9272ad165d15.jpg"
                  alt="Наши проекты"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Play" size={24} className="text-primary ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border-b border-border pb-4 last:border-0"
                  >
                    <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent text-lg py-4 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section id="promos" className="py-20 px-4 bg-secondary/30 animate-on-scroll">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Актуальные акции</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {promos.map((promo, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-primary text-sm md:text-lg px-3 md:px-4 py-1 md:py-2">{promo.discount}</Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 pr-16 md:pr-20">{promo.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">{promo.description}</p>
                  <Button variant="outline" className="w-full">Подробнее</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => window.location.href = '/contacts'}
              className="bg-accent hover:bg-accent/90 text-primary px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto"
            >
              Узнать подробности всех акций
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Свяжитесь с нами</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
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