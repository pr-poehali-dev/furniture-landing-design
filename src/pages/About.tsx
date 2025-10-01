import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ products: 0, projects: 0, customers: 0, years: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
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
    const targets = { products: 500, projects: 20, customers: 50, years: 15 };
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        products: Math.floor(targets.products * progress),
        projects: Math.floor(targets.projects * progress),
        customers: Math.floor(targets.customers * progress),
        years: Math.floor(targets.years * progress)
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounts(targets);
      }
    }, stepDuration);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const values = [
    {
      icon: 'Heart',
      title: 'Качество превыше всего',
      description: 'Используем только лучшие материалы и проверенные технологии производства'
    },
    {
      icon: 'Users',
      title: 'Клиент в центре внимания',
      description: 'Индивидуальный подход к каждому проекту и полное сопровождение'
    },
    {
      icon: 'Sparkles',
      title: 'Инновации в дизайне',
      description: 'Следим за мировыми трендами и создаем актуальные решения'
    },
    {
      icon: 'Shield',
      title: 'Надежность и гарантия',
      description: 'Даем гарантию до 5 лет на всю нашу продукцию'
    }
  ];

  const team = [
    {
      name: 'Анна Смирнова',
      role: 'Главный дизайнер',
      icon: 'Palette'
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Технический директор',
      icon: 'Settings'
    },
    {
      name: 'Елена Петрова',
      role: 'Менеджер проектов',
      icon: 'Briefcase'
    },
    {
      name: 'Игорь Волков',
      role: 'Мастер производства',
      icon: 'Hammer'
    }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Основание компании',
      description: 'Начали с небольшой мастерской и команды из 5 человек'
    },
    {
      year: '2013',
      title: 'Первая премия',
      description: 'Получили награду "Лучший дизайн интерьера года"'
    },
    {
      year: '2016',
      title: 'Расширение производства',
      description: 'Открыли современный цех площадью 2000 кв.м'
    },
    {
      year: '2020',
      title: '3D конфигуратор',
      description: 'Запустили инновационный сервис виртуальной примерки мебели'
    },
    {
      year: '2025',
      title: 'Сегодня',
      description: 'Топ-1 производитель элитной мебели в регионе'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">О компании</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Создаём мебель<br/>с душой и любовью
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы создаем роскошные, персонализированные интерьеры, которые отражают вкусы и образ жизни наших клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="relative h-96">
                  <img
                    src="/img/efe6ea40-d747-4e8a-85c3-d937b255f56b.jpg"
                    alt="Наше производство"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Наше производство</h3>
                    <p className="text-white/90">Современное оборудование и опытные мастера</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="relative h-96">
                  <img
                    src="/img/71063ef0-aff4-4bb8-8ea4-1d2b487997d3.jpg"
                    alt="Наша команда"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Наша команда</h3>
                    <p className="text-white/90">Профессионалы своего дела</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {counts.products}+
              </div>
              <div className="text-muted-foreground">Продуктов в каталоге</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {counts.projects}+
              </div>
              <div className="text-muted-foreground">Реализованных проектов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {counts.customers}+
              </div>
              <div className="text-muted-foreground">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {counts.years}
              </div>
              <div className="text-muted-foreground">Лет на рынке</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Наши ценности</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={value.icon as any} size={32} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Ключевые фигуры</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Команда профессионалов за вашим комфортом
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Icon name={member.icon as any} size={48} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Наша история</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От маленькой мастерской до лидера рынка
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-accent text-primary">{item.year}</Badge>
                        <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <Icon name="Calendar" size={24} className="text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Готовы начать свой проект?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня, и мы поможем воплотить ваши идеи в реальность
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contacts'}
              className="bg-accent hover:bg-accent/90 text-primary"
              size="lg"
            >
              Связаться с нами
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
        </div>
      </section>

      <footer className="bg-secondary/20 py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Ваша мебель. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;