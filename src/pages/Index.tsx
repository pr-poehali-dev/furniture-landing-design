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
import ImageModal from '@/components/ImageModal';
import PromoModal from '@/components/PromoModal';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [counts, setCounts] = useState({ products: 0, projects: 0, customers: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { products: 5000, projects: 1000, customers: 800 };
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        products: Math.floor(targets.products * progress),
        projects: Math.floor(targets.projects * progress),
        customers: Math.floor(targets.customers * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targets);
      }
    }, stepDuration);
  };

  const heroSlides = [
    {
      title: 'Создаём мебель вашей мечты с 1998 года',
      description: 'Премиальная мебель на заказ. Собственное производство, индивидуальный дизайн, 25 лет опыта и более 5000 довольных клиентов.',
      image: 'https://cdn.poehali.dev/files/be69be9f-e201-4a8b-bda2-bb15a7bb89e4.jpg'
    },
    {
      title: 'Индивидуальный дизайн для каждого проекта',
      description: 'Наши дизайнеры создают уникальные решения, которые идеально впишутся в ваш интерьер и отражают вашу индивидуальность.',
      image: 'https://cdn.poehali.dev/files/462a02c3-9488-4919-b26f-b974b91f69da.jpg'
    },
    {
      title: 'Производство полного цикла',
      description: 'Современное оборудование, квалифицированные мастера и контроль качества на каждом этапе гарантируют безупречный результат.',
      image: 'https://cdn.poehali.dev/files/19be2a9b-7c8a-4485-aa00-3fd1c57cac04.jpg'
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
      image: 'https://cdn.poehali.dev/files/da4c2b67-44ee-47f6-b593-27fd16121612.jpg', 
      title: 'Современный Минимализм', 
      category: 'Ванные комнаты',
      size: 'normal'
    },
    { 
      id: 2, 
      image: 'https://cdn.poehali.dev/files/a93e6f7f-50de-4e20-864d-75b24001de88.jpg', 
      title: 'Роскошь и Элегантность', 
      category: 'Ванные комнаты',
      size: 'large'
    },
    { 
      id: 3, 
      image: 'https://cdn.poehali.dev/files/f3d020a6-706e-4963-8676-d688131e6737.jpg', 
      title: 'Скандинавский Уют', 
      category: 'Гостиные',
      size: 'normal'
    },
    { 
      id: 4, 
      image: 'https://cdn.poehali.dev/files/4b9b411d-9a7d-4299-b35e-e2f8547c94f0.jpg', 
      title: 'Благородная Классика', 
      category: 'Гостиные',
      size: 'normal'
    },
    { 
      id: 5, 
      image: 'https://cdn.poehali.dev/files/0ce8953b-989b-4290-9dd0-08dca83478c0.jpg', 
      title: 'Воздушный Модерн', 
      category: 'Гостиные',
      size: 'large'
    },
    { 
      id: 6, 
      image: 'https://cdn.poehali.dev/files/be69be9f-e201-4a8b-bda2-bb15a7bb89e4.jpg', 
      title: 'Темная Элегантность', 
      category: 'Кухни',
      size: 'normal'
    },
    { 
      id: 7, 
      image: 'https://cdn.poehali.dev/files/462a02c3-9488-4919-b26f-b974b91f69da.jpg', 
      title: 'Светлая Классика', 
      category: 'Кухни',
      size: 'wide'
    },
    { 
      id: 8, 
      image: 'https://cdn.poehali.dev/files/19be2a9b-7c8a-4485-aa00-3fd1c57cac04.jpg', 
      title: 'Рабочая Атмосфера', 
      category: 'Офисы',
      size: 'normal'
    },
  ];

  const promos = [
    { 
      title: 'Бесплатная доставка при заказе мебели', 
      description: 'Ограниченное предложение до 2027г', 
      discount: 'FREE',
      fullDescription: 'При заказе комплекта мебели стоимостью от 500 000 рублей мы доставим ваш заказ в любую точку Приморского края абсолютно бесплатно. Наши специалисты обеспечат бережную транспортировку с соблюдением всех необходимых мер предосторожности.',
      conditions: [
        'Минимальная сумма заказа - 500 000 рублей',
        'Действует до 01 января 2027 года',
        'Доставка в пределах Приморского Края',
        'Подъем на этаж оплачивается отдельно',
        'Акция не суммируется с другими скидками',
        'Гарантия на мебель - 1 год'
      ],
      features: [
        'Бесплатная доставка до квартиры',
        'Занос мебели в квартиру',
        'Распаковка и проверка комплектации',
        'Вынос упаковки'
      ],
      benefits: [
        'Бесплатная доставка',
        'Доставка в удобное время',
        'Страховка груза',
        'Профессиональная упаковка'
      ],
      validUntil: '01 января 2027'
    },
    { 
      title: 'Сборка и установка в подарок', 
      description: 'При заказе мебели от 500 000 рублей', 
      discount: 'ПОДАРОК',
      fullDescription: 'Наши мастера профессионально соберут и установят вашу новую мебель в день доставки. Гарантируем качественный монтаж, который обеспечит долговечность и безопасность использования. Экономьте до 25 000 рублей на услугах сборки!',
      conditions: [
        'Минимальная сумма заказа - 500 000 рублей',
        'Включает сборку всех элементов мебели',
        'Установка встроенной техники за дополнительную плату',
        'Акция действует до 2027 года',
        'Время сборки: с 9:00 до 18:00'
      ],
      benefits: [
        'Профессиональная сборка',
        'Опытные мастера',
        'Гарантия качества',
        'Уборка после работ'
      ],
      validUntil: '2027'
    },
    { 
      title: 'Скидка на весь заказ', 
      description: 'Специальные условия для полного комплекта мебели', 
      discount: '-10%',
      fullDescription: 'Обставьте всю квартиру сразу и получите скидку на весь заказ! Это идеальное решение для тех, кто хочет создать гармоничный и стильный интерьер с нуля.',
      conditions: [
        'Скидка действует на весь заказ без ограничений по сумме',
        'Срок действия акции - до 2027 года',
        'Скидка не суммируется с другими акциями'
      ],
      benefits: [
        '10% скидка на всё',
        'Для новых клиентов',
        'Простое оформление',
        'Выгода в деталях'
      ],
      validUntil: '2027'
    },
  ];

  const benefits = [
    { icon: 'Award', title: '25+ лет опыта', description: 'Мы создали более 5000 проектов для довольных клиентов.' },
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
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/a84dc3cf-5089-4c96-9deb-6ebb7933eb9f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: '✅ Заявка отправлена!',
          description: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        toast({
          title: '❌ Ошибка отправки',
          description: data.error || 'Попробуйте позже или позвоните нам напрямую.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка подключения',
        description: 'Проверьте интернет или позвоните нам: +7 (999) 123-45-67',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }}></div>
      </div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              onClick={() => window.location.href = '/'}
              className="text-xl md:text-2xl font-bold text-primary cursor-pointer"
            >
              Ваша мебель
            </h1>
            <div className="flex items-center gap-2 md:gap-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Переключить тему"
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Меню"
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
              <div className="hidden md:flex gap-6">
                <Button onClick={() => window.location.href = '/'} variant="ghost">
                  Главная
                </Button>
                <Button onClick={() => window.location.href = '/about'} variant="ghost">
                  О нас
                </Button>
                <Button onClick={() => window.location.href = '/portfolio'} variant="ghost">
                  Портфолио
                </Button>
                <Button onClick={() => window.location.href = '/configurator'} variant="ghost">
                  3D Конфигуратор
                </Button>
                <Button onClick={() => window.location.href = '/promos'} variant="ghost" className="relative">
                  Акции
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </Button>
              </div>
              <Button onClick={() => window.location.href = '/contacts'} className="bg-accent hover:bg-accent/90 text-primary dark:bg-accent dark:text-primary-foreground dark:hover:bg-accent/80 text-xs md:text-sm px-3 md:px-4">
                <Icon name="Phone" size={16} className="md:mr-2" />
                <span className="hidden md:inline">Контакты</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 pt-20">
          <div className="h-full overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { window.location.href = '/'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium"
              >
                Главная
              </button>
              <button
                onClick={() => { window.location.href = '/about'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium"
              >
                О нас
              </button>
              <button
                onClick={() => { window.location.href = '/portfolio'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium"
              >
                Портфолио
              </button>
              <button
                onClick={() => { window.location.href = '/configurator'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium"
              >
                3D Конфигуратор
              </button>
              <button
                onClick={() => { window.location.href = '/promos'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium relative"
              >
                <div className="flex items-center justify-between">
                  <span>Акции</span>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </div>
              </button>
              <button
                onClick={() => { window.location.href = '/contacts'; setIsMobileMenuOpen(false); }}
                className="text-left py-4 px-6 rounded-lg transition-colors text-foreground hover:bg-secondary text-lg font-medium"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="home" className="pt-32 pb-20 relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/10 animate-gradient-shift bg-[length:200%_200%]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full"
          >
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up mx-[15px] px-[41px]">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        {index === 2 ? (
                          <Button onClick={() => window.location.href = '/about'} size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform w-full sm:w-auto">
                            Подробнее о нас
                          </Button>
                        ) : (
                          <Button onClick={() => window.location.href = '/configurator'} size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform w-full sm:w-auto">
                            Попробовать конфигуратор
                          </Button>
                        )}
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
            <CarouselPrevious className="hidden md:flex left-2 md:left-4 bg-background/80 backdrop-blur-sm hover:bg-background z-20" />
            <CarouselNext className="hidden md:flex right-2 md:right-4 bg-background/80 backdrop-blur-sm hover:bg-background z-20" />
          </Carousel>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <Icon name="ChevronDown" size={32} className="text-accent" />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Почему выбирают нас</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы создаем не просто мебель, а пространства, в которых хочется жить
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="md:hidden px-4">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="basis-[85%]">
                    <Card className="h-full border-2">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                          <Icon name={benefit.icon} size={32} className="text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 bg-secondary/30 animate-on-scroll relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">Что мы создаём</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Наши направления</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От кухонь до офисов — создаём мебель для любого пространства
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                onClick={() => {
                  const categoryMap: Record<string, string> = {
                    'Кухни': 'Кухни',
                    'Спальни': 'Спальни',
                    'Гостиные': 'Гостиные',
                    'Гардеробные': 'Гардеробные',
                    'Ванные комнаты': 'Ванные комнаты',
                    'Детские': 'Детские',
                    'Прихожие': 'Прихожие',
                    'Офисы': 'Офисы',
                    'Мягкие панели': 'Мягкие панели',
                    'Декор': 'Декор',
                    'Торговые оборудования': 'Торговые оборудования'
                  };
                  const targetCategory = categoryMap[category.name];
                  window.location.href = `/portfolio?category=${encodeURIComponent(targetCategory)}`;
                }}
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent hover:border-accent/20 animate-fade-in-scale"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-12 translate-x-12"></div>
                
                <CardContent className="p-4 md:p-6 text-center relative z-10">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-5 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg group-hover:shadow-accent/20">
                    <Icon name={category.icon} size={28} className="md:w-10 md:h-10 text-accent group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  
                  <h3 className="font-bold text-sm md:text-base text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs text-muted-foreground">Смотреть</span>
                    <Icon name="ArrowRight" size={14} className="text-accent" />
                  </div>
                </CardContent>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/portfolio'}
              className="border-accent text-accent hover:bg-accent hover:text-primary group"
            >
              Посмотреть всё портфолио
              <Icon name="ExternalLink" size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
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

      <section id="about" className="py-20 bg-background animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-none mb-8">
                О НАС
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">С 1998 года производим
и устанавливаем мебель
по индивидуальному проекту</h3>
                </div>
                
                <div>
                  <p className="text-base text-muted-foreground leading-relaxed">Наш 25-летний опыт в производстве премиум мебели помогает снизить риски, избежать ошибок и повысить качество. Мы сотрудничаем с лучшими поставщиками материалов, что обеспечивает превосходный результат и помогает оптимизировать ваш бюджет.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden h-[400px]">
                <img
                  src="https://cdn.poehali.dev/files/19be2a9b-7c8a-4485-aa00-3fd1c57cac04.jpg"
                  alt="Интерьер офиса"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="relative rounded-3xl overflow-hidden h-[180px]">
                <img
                  src="https://cdn.poehali.dev/files/92d19c4e-5285-411d-90e6-27efdb0a527e.jpg"
                  alt="Офисное пространство"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Наша философия
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">Если вы знаете как должна выглядеть мебель, мы точно знаем как ее сделать</p>
                <Button onClick={() => window.location.href = '/about'} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Подробнее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-7">
              <div 
                className="relative rounded-3xl overflow-hidden h-[500px] group cursor-pointer"
                onClick={() => setSelectedImage('https://cdn.poehali.dev/files/9d940410-74ea-40b5-90cb-af267dd74ca8.jpg')}
              >
                <img
                  src="https://cdn.poehali.dev/files/9d940410-74ea-40b5-90cb-af267dd74ca8.jpg"
                  alt="Modern Minimalist"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="ZoomIn" size={28} className="text-primary" />
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 px-4 py-2">Соловьева Мария</Badge>
                </div>
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 backdrop-blur-sm rounded-2xl px-4 md:px-8 py-3 md:py-4 bg-background/80">
                  <h3 className="text-2xl md:text-4xl font-bold text-foreground">Минималистичный
Модерн</h3>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-secondary/50 rounded-3xl p-8 flex-1 flex flex-col justify-center">
                <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 w-fit mb-6">Творчество</Badge>
                <p className="text-sm text-muted-foreground mb-4">Мы создаем уникальные решения, которые отражают индивидуальность наших клиентов.</p>
                <h3 className="text-3xl md:text-4xl font-bold text-primary leading-tight">Каждый проект для нас — это творческий вызов</h3>
              </div>

              <div 
                className="relative rounded-3xl overflow-hidden h-[220px] group cursor-pointer"
                onClick={() => setSelectedImage('https://cdn.poehali.dev/files/c7cafc1f-fdf6-46c2-9af0-75d512c6aeb9.jpg')}
              >
                <img
                  src="https://cdn.poehali.dev/files/c7cafc1f-fdf6-46c2-9af0-75d512c6aeb9.jpg"
                  alt="Best Furniture"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="ZoomIn" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 px-4 py-2">Лучшая мебель</Badge>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-medium">Разрабатываем проекты, которые идеально
вписываютсяв ваш образ жизни.</p>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Icon name="ArrowUpRight" size={20} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.products.toLocaleString()}+</div>
              <div className="text-muted-foreground">Продуктов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.projects.toLocaleString()}+</div>
              <div className="text-muted-foreground">Проектов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.customers.toLocaleString()}+</div>
              <div className="text-muted-foreground">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                1<sup className="text-3xl">st</sup>
              </div>
              <div className="text-muted-foreground">Номер 1 в Приморском крае</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-old" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-4">
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

      <section id="portfolio" className="py-20 bg-background animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                Наши проекты
              </h2>
            </div>
            <div className="md:max-w-md">
              <p className="text-muted-foreground text-sm md:text-base">Вдохновитесь работами, которые мы уже воплотили в жизнь. Каждый проект — это история, рассказанная через формы, фактуры и цвета.</p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex rounded-full border-primary text-primary hover:bg-primary hover:text-white self-start md:self-auto"
              onClick={() => window.location.href = '/portfolio'}
            >Посмотреть еще</Button>
          </div>



          <div className="hidden md:grid md:grid-cols-6 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
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
                  className={`group relative ${gridClass} cursor-pointer`}
                  onClick={() => setSelectedImage(project.image)}
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

          <div className="md:hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[autoplayPlugin.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {portfolio.map((project) => (
                    <CarouselItem key={project.id} className="pl-4 basis-4/5">
                      <div 
                        className="group relative cursor-pointer"
                        onClick={() => setSelectedImage(project.image)}
                      >
                        <div className="relative overflow-hidden rounded-3xl h-[300px]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                            <div>
                              <Badge className="bg-primary/90 text-primary-foreground mb-2">{project.category}</Badge>
                              <h3 className="text-2xl font-bold text-white">
                                {project.title}
                              </h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0 ml-4">
                              <Icon name="ArrowUpRight" size={18} className="text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="md:hidden flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white w-full"
              onClick={() => window.location.href = '/portfolio'}
            >
              Посмотреть еще
            </Button>
          </div>
        </div>
      </section>

      <section id="configurator" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">3D Конфигуратор</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Создайте мебель своей мечты в нашем интерактивном 3D конфигураторе. 
            Выбирайте материалы, цвета и размеры в режиме реального времени.
          </p>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 md:p-12">
              <div className="bg-secondary/50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent animate-pulse-slow"></div>
                <div className="text-center relative z-10">
                  <Icon name="Box" size={64} className="mx-auto mb-4 text-accent animate-float" />
                  <h3 className="text-xl font-bold text-primary mb-2">Интерактивный 3D конфигуратор</h3>
                  <p className="text-muted-foreground mb-6">Создавайте и визуализируйте вашу мебель в 3D</p>
                  <Button onClick={() => window.location.href = '/configurator'} size="lg" className="bg-accent hover:bg-accent/90 text-primary dark:bg-accent dark:text-primary-foreground dark:hover:bg-accent/80">
                    Запустить конфигуратор
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="md:sticky md:top-24">
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
                    <Icon name="Play" size={24} className="text-black ml-1" />
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

      <section id="promos" className="py-20 bg-secondary/30 animate-on-scroll">
        <div className="container mx-auto px-4">
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
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedPromo(promo)}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => window.location.href = '/promos'}
              className="bg-accent hover:bg-accent/90 text-primary dark:bg-accent dark:text-primary-foreground dark:hover:bg-accent/80 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto"
            >Узнать больше</Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-4">
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
                    <p className="text-muted-foreground">г. Уссурийск, Приморский край</p>
                    <p className="text-muted-foreground">Владивостокское шоссе, 145А/2</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Телефон</h4>
                    <p className="text-muted-foreground">+7 (924)265-93-50
+7 (914)650-36-36</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Email</h4>
                    <p className="text-muted-foreground">mebelgiz.victor@mail.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Режим работы</h4>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00
Сб-Вс - выходные</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-border">
                <a 
                  href="https://instagram.com/vashakuhnya25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                  aria-label="Instagram"
                >
                  <Icon name="Instagram" size={20} className="text-accent group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://t.me/vashakuhnya25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                  aria-label="Telegram"
                >
                  <Icon name="Send" size={20} className="text-accent group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/79242659350" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                  aria-label="WhatsApp"
                >
                  <Icon name="MessageCircle" size={20} className="text-accent group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Расскажите о вашем проекте..." 
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Отправить заявку'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      <ImageModal 
        imageUrl={selectedImage || ''} 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      <PromoModal 
        promo={selectedPromo} 
        isOpen={!!selectedPromo} 
        onClose={() => setSelectedPromo(null)} 
      />
    </div>
  );
};

export default Index;