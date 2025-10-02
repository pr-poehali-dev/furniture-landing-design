import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Icon from '@/components/ui/icon';
import ImageModal from '@/components/ImageModal';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

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

  const projects = [
    {
      id: 1,
      title: 'Кухня Marble Elegance',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/2db0540c-b40d-445c-8a34-92a10313b292.jpg',
      size: 'large',
      description: 'Роскошная кухня с мраморными столешницами и островом',
      area: '24 м²',
      year: '2023'
    },
    {
      id: 2,
      title: 'Кухня Black Edition',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/bfb24092-4fe4-47f5-a2ee-2f8940ce03ab.jpg',
      size: 'large',
      description: 'Современная кухня в тёмных тонах с барной стойкой',
      area: '28 м²',
      year: '2024'
    },
    {
      id: 3,
      title: 'Кухня Nordic Minimalism',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/23f67fc6-6790-423e-9cc1-eb0605550ccb.jpg',
      size: 'medium',
      description: 'Светлая кухня со встроенной техникой и мраморным фартуком',
      area: '16 м²',
      year: '2022'
    },
    {
      id: 4,
      title: 'Кухня Urban Loft',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/2ed1d324-a14d-417f-8a64-5994b82a9e18.jpg',
      size: 'large',
      description: 'Просторная кухня-студия с витринами и мраморной отделкой',
      area: '32 м²',
      year: '2025'
    },
    {
      id: 5,
      title: 'Кухня Provence Dream',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/9e2cf113-1e4d-424e-bb94-6c6d16cb1b7a.jpg',
      size: 'medium',
      description: 'Уютная белая кухня в классическом стиле с люстрой',
      area: '12 м²',
      year: '2021'
    },
    {
      id: 6,
      title: 'Кухня Dark Luxury',
      category: 'Кухни',
      image: 'https://cdn.poehali.dev/files/cce662e4-a13b-4220-9880-37624ca0c0d5.jpg',
      size: 'large',
      description: 'Элитная тёмная кухня с винным шкафом и островом',
      area: '35 м²',
      year: '2024'
    },
    {
      id: 7,
      title: 'Спальня в скандинавском стиле',
      category: 'Спальни',
      image: '/img/33ff49b9-c9c6-4178-a6e5-087353aa3f2f.jpg',
      size: 'medium',
      description: 'Уютное пространство с деревянной мебелью',
      area: '16 м²',
      year: '2024'
    },
    {
      id: 8,
      title: 'Просторная гостиная Modern',
      category: 'Гостиные',
      image: '/img/5c5b6d16-8d9b-45c4-9df9-71ac8f25815e.jpg',
      size: 'large',
      description: 'Светлое пространство с панорамными окнами',
      area: '32 м²',
      year: '2024'
    },
    {
      id: 9,
      title: 'Гардеробная комната Luxury',
      category: 'Гардеробные',
      image: '/img/09b906d6-ffb2-4aea-9754-08c7c580141e.jpg',
      size: 'medium',
      description: 'Организованное пространство с элегантной подсветкой',
      area: '12 м²',
      year: '2024'
    },
    {
      id: 10,
      title: 'Ванная комната Spa',
      category: 'Ванные комнаты',
      image: '/img/0deb2766-c83e-41fd-960b-4168c878e524.jpg',
      size: 'medium',
      description: 'Роскошная ванная с мраморной отделкой',
      area: '10 м²',
      year: '2024'
    },
    {
      id: 11,
      title: 'Детская комната Dream',
      category: 'Детские',
      image: '/img/bfd9691f-0b88-49bf-be29-aef9d6f84be2.jpg',
      size: 'medium',
      description: 'Яркая и функциональная детская',
      area: '14 м²',
      year: '2024'
    },
    {
      id: 12,
      title: 'Уютная спальня',
      category: 'Спальни',
      image: '/img/f034a86e-df9d-4fc8-a0a8-29409a860b2c.jpg',
      size: 'medium',
      description: 'Теплая спальня с деревянными акцентами',
      area: '15 м²',
      year: '2023'
    },
    {
      id: 13,
      title: 'Панель Diamond Comfort',
      category: 'Мягкие панели',
      image: 'https://cdn.poehali.dev/files/f8557b36-11d5-4c2e-8be8-03b5f03bc8b9.jpg',
      size: 'large',
      description: 'Изголовье с геометрическим рисунком в серых тонах',
      area: '3.6 м × 2.8 м',
      year: '2024'
    },
    {
      id: 14,
      title: 'Панель Mondrian Style',
      category: 'Мягкие панели',
      image: 'https://cdn.poehali.dev/files/277cf011-a3b1-4d83-ae74-0cf6fae38355.jpg',
      size: 'large',
      description: 'Стеновая панель с асимметричными сегментами в стиле Мондриан',
      area: '4.2 м × 2.6 м',
      year: '2022'
    }
  ];

  const filteredProjects = activeCategory === 'Все' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
                <Button onClick={() => window.location.href = '/promos'} variant="ghost" className="relative">
                  Акции
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </Button>
              </div>
              <Button onClick={() => window.location.href = '/contacts'} className="bg-accent hover:bg-accent/90 text-primary text-xs md:text-sm px-3 md:px-4">
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

      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">Наши работы</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Портфолио</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Более 50 реализованных проектов по индивидуальным дизайнам. 
              Каждый интерьер — уникален и создан с учётом пожеланий клиента
            </p>
          </div>

          <div className="mb-12 relative">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-3">
                <CarouselItem className="pl-2 md:pl-3 basis-auto">
                  <Button
                    variant={activeCategory === 'Все' ? 'default' : 'outline'}
                    className={`rounded-full ${
                      activeCategory === 'Все'
                        ? 'bg-primary text-primary-foreground'
                        : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={() => setActiveCategory('Все')}
                  >
                    Все
                  </Button>
                </CarouselItem>
                {categories.map((cat) => (
                  <CarouselItem key={cat.name} className="pl-2 md:pl-3 basis-auto">
                    <Button
                      variant={activeCategory === cat.name ? 'default' : 'outline'}
                      className={`rounded-full whitespace-nowrap ${
                        activeCategory === cat.name
                          ? 'bg-primary text-primary-foreground'
                          : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
                      }`}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      <Icon name={cat.icon} size={16} className="mr-2" />
                      {cat.name}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
              <CarouselNext className="-right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
            </Carousel>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="group overflow-hidden hover:shadow-2xl transition-all cursor-pointer animate-fade-in-scale"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(project.image)}
              >
                <CardContent className="p-0">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-primary">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon name="ZoomIn" size={28} className="text-primary" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-white text-sm mb-3 drop-shadow-md">
                        {project.description}
                      </p>
                      <div className="flex gap-4 text-white text-sm drop-shadow-md">
                        <div className="flex items-center gap-1">
                          <Icon name="Maximize2" size={16} />
                          <span>{project.area}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:hidden mb-16">
            <Carousel 
              className="w-full"
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[autoplayPlugin.current]}
            >
              <CarouselContent>
                {filteredProjects.map((project) => (
                  <CarouselItem key={project.id}>
                    <Card 
                      className="group overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-96 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-accent text-primary">
                              {project.category}
                            </Badge>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                              {project.title}
                            </h3>
                            <p className="text-white text-sm mb-3 drop-shadow-md">
                              {project.description}
                            </p>
                            <div className="flex gap-4 text-white text-sm drop-shadow-md">
                              <div className="flex items-center gap-1">
                                <Icon name="Maximize2" size={16} />
                                <span>{project.area}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={16} />
                                <span>{project.year}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Folder" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-2xl font-bold text-primary mb-2">
                Проекты в этой категории скоро появятся
              </h3>
              <p className="text-muted-foreground mb-6">
                Мы активно работаем над новыми проектами
              </p>
              <Button onClick={() => setActiveCategory('Все')} variant="outline">
                Показать все проекты
              </Button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-accent" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">Реализованных проектов</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-accent" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground">Довольных клиентов</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Star" size={32} className="text-accent" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
              <p className="text-muted-foreground">Лет опыта</p>
            </Card>
          </div>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-12 text-center">
              <Icon name="Lightbulb" size={48} className="mx-auto mb-6 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Хотите увидеть свой проект здесь?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Расскажите нам о своих идеях, и мы создадим уникальный дизайн специально для вас
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/contacts'}
                  className="bg-accent hover:bg-accent/90 text-primary"
                  size="lg"
                >
                  Обсудить проект
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  onClick={() => window.location.href = '/promos'}
                  variant="outline"
                  size="lg"
                >
                  Посмотреть акции
                  <Icon name="Tag" size={20} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      <ImageModal 
        imageUrl={selectedImage || ''} 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default Portfolio;