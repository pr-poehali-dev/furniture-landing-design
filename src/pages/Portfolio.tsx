import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';
import ImageModal from '@/components/ImageModal';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    'Все',
    'Кухни',
    'Спальни',
    'Гостиные',
    'Гардеробные',
    'Ванные комнаты',
    'Детские',
    'Прихожие',
    'Офисы',
    'Мягкие панели',
    'Декор',
    'Торговые оборудования'
  ];

  const projects = [
    {
      id: 1,
      title: 'Современная кухня Loft',
      category: 'Кухни',
      image: '/img/e7f98167-3e5e-48cf-9b59-e766334d81ae.jpg',
      size: 'large',
      description: 'Минималистичный дизайн с мраморными столешницами',
      area: '18 м²',
      year: '2024'
    },
    {
      id: 2,
      title: 'Спальня в скандинавском стиле',
      category: 'Спальни',
      image: '/img/33ff49b9-c9c6-4178-a6e5-087353aa3f2f.jpg',
      size: 'medium',
      description: 'Уютное пространство с деревянной мебелью',
      area: '16 м²',
      year: '2024'
    },
    {
      id: 3,
      title: 'Просторная гостиная Modern',
      category: 'Гостиные',
      image: '/img/5c5b6d16-8d9b-45c4-9df9-71ac8f25815e.jpg',
      size: 'large',
      description: 'Светлое пространство с панорамными окнами',
      area: '32 м²',
      year: '2024'
    },
    {
      id: 4,
      title: 'Гардеробная комната Luxury',
      category: 'Гардеробные',
      image: '/img/09b906d6-ffb2-4aea-9754-08c7c580141e.jpg',
      size: 'medium',
      description: 'Организованное пространство с элегантной подсветкой',
      area: '12 м²',
      year: '2024'
    },
    {
      id: 5,
      title: 'Ванная комната Spa',
      category: 'Ванные комнаты',
      image: '/img/0deb2766-c83e-41fd-960b-4168c878e524.jpg',
      size: 'medium',
      description: 'Роскошная ванная с мраморной отделкой',
      area: '10 м²',
      year: '2024'
    },
    {
      id: 6,
      title: 'Детская комната Dream',
      category: 'Детские',
      image: '/img/bfd9691f-0b88-49bf-be29-aef9d6f84be2.jpg',
      size: 'medium',
      description: 'Яркая и функциональная детская',
      area: '14 м²',
      year: '2024'
    },
    {
      id: 7,
      title: 'Кухня Классика',
      category: 'Кухни',
      image: '/img/a835547d-f06f-493f-9a23-53393a686878.jpg',
      size: 'medium',
      description: 'Элегантная кухня в классическом стиле',
      area: '20 м²',
      year: '2023'
    },
    {
      id: 8,
      title: 'Уютная спальня',
      category: 'Спальни',
      image: '/img/f034a86e-df9d-4fc8-a0a8-29409a860b2c.jpg',
      size: 'medium',
      description: 'Теплая спальня с деревянными акцентами',
      area: '15 м²',
      year: '2023'
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

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => { window.location.href = '/'; setIsMobileMenuOpen(false); }}
                className="text-left py-2 px-4 rounded-lg transition-colors text-foreground hover:bg-secondary"
              >
                Главная
              </button>
              <button
                onClick={() => { window.location.href = '/about'; setIsMobileMenuOpen(false); }}
                className="text-left py-2 px-4 rounded-lg transition-colors text-foreground hover:bg-secondary"
              >
                О нас
              </button>
              <button
                onClick={() => { window.location.href = '/portfolio'; setIsMobileMenuOpen(false); }}
                className="text-left py-2 px-4 rounded-lg transition-colors text-foreground hover:bg-secondary"
              >
                Портфолио
              </button>
              <button
                onClick={() => { window.location.href = '/promos'; setIsMobileMenuOpen(false); }}
                className="text-left py-2 px-4 rounded-lg transition-colors text-foreground hover:bg-secondary relative"
              >
                <div className="flex items-center justify-between">
                  <span>Акции</span>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

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

          <div className="mb-12">
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={
                    activeCategory === category 
                      ? 'bg-accent text-primary hover:bg-accent/90' 
                      : 'hover:bg-secondary'
                  }
                >
                  {category}
                </Button>
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
                <CarouselContent className="-ml-2">
                  {categories.map((category) => (
                    <CarouselItem key={category} className="basis-auto pl-2">
                      <Button
                        onClick={() => setActiveCategory(category)}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        className={
                          activeCategory === category 
                            ? 'bg-accent text-primary hover:bg-accent/90 whitespace-nowrap' 
                            : 'hover:bg-secondary whitespace-nowrap'
                        }
                      >
                        {category}
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
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

          <div className="md:hidden mb-16 px-4">
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {filteredProjects.map((project) => (
                  <CarouselItem key={project.id} className="pl-2 basis-1/2">
                    <Card 
                      className="group overflow-hidden cursor-pointer h-full"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-accent text-primary text-xs px-2 py-1">
                              {project.category}
                            </Badge>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="text-sm font-bold text-white mb-1 drop-shadow-lg line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-white text-xs drop-shadow-md line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex gap-2 text-white text-xs drop-shadow-md">
                              <div className="flex items-center gap-1">
                                <Icon name="Maximize2" size={12} />
                                <span>{project.area}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
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