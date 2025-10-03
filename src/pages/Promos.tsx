import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';

const Promos = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const promos = [
    {
      id: 1,
      title: 'Бесплатная доставка при заказе мебели',
      discount: 'FREE',
      image: '/img/82bdee7f-a7d2-4df2-9aac-a788dfb4862e.jpg',
      validUntil: '01 января 2027',
      description: 'При заказе комплекта мебели стоимостью от 500 000 рублей мы доставим ваш заказ в любую точку Приморского края абсолютно бесплатно. Наши специалисты обеспечат бережную транспортировку с соблюдением всех необходимых мер предосторожности.',
      details: [
        'Бесплатная доставка',
        'Доставка в удобное время',
        'Страховка груза',
        'Профессиональная упаковка'
      ],
      features: [
        'Бесплатная доставка до квартиры',
        'Занос мебели в квартиру',
        'Распаковка и проверка комплектации',
        'Вынос упаковки'
      ],
      conditions: 'Минимальная сумма заказа - 500 000 рублей. Действует до 01 января 2027 года. Доставка в пределах Приморского Края. Подъем на этаж оплачивается отдельно. Акция не суммируется с другими скидками. Гарантия на мебель - 1 год.'
    },
    {
      id: 2,
      title: 'Сборка и установка в подарок',
      discount: 'ПОДАРОК',
      image: '/img/7a0d54ad-d258-4ee4-95b2-1447bf0f314f.jpg',
      validUntil: '2027',
      description: 'Наши мастера профессионально соберут и установят вашу новую мебель в день доставки. Гарантируем качественный монтаж, который обеспечит долговечность и безопасность использования. Экономьте до 25 000 рублей на услугах сборки!',
      details: [
        'Профессиональная сборка',
        'Опытные мастера',
        'Гарантия качества',
        'Уборка после работ'
      ],
      features: [
        'Сборка всех элементов мебели',
        'Регулировка фасадов и петель',
        'Проверка работоспособности механизмов',
        'Консультация по уходу за мебелью'
      ],
      conditions: 'Минимальная сумма заказа - 500 000 рублей. Включает сборку всех элементов мебели. Установка встроенной техники за дополнительную плату. Акция действует до 2027 года. Время сборки: с 9:00 до 18:00.'
    },
    {
      id: 3,
      title: 'Скидка на весь заказ',
      discount: '-10%',
      image: 'https://cdn.poehali.dev/files/06b06448-c35b-4e37-abb7-a04c1dd74a45.jpg',
      validUntil: '2027',
      description: 'Обставьте всю квартиру сразу и получите скидку на весь заказ! Это идеальное решение для тех, кто хочет создать гармоничный и стильный интерьер с нуля.',
      details: [
        '10% скидка на всё',
        'Для новых клиентов',
        'Простое оформление',
        'Выгода в деталях'
      ],
      features: [
        'Единый стиль всего интерьера',
        'Персональный дизайнер',
        'Оптимизация бюджета',
        'Комплексный подход к проекту'
      ],
      conditions: 'Скидка действует на весь заказ без ограничений по сумме. Срок действия акции - до 2027 года. Скидка не суммируется с другими акциями.'
    }
  ];

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

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">Актуальные предложения</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Наши акции</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Специальные предложения на качественную мебель. Успейте воспользоваться выгодными условиями!
            </p>
          </div>

          <div className="space-y-12">
            {promos.map((promo) => (
              <Card key={promo.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-accent text-primary text-lg px-4 py-2">
                          {promo.discount}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Icon name="Calendar" size={20} className="text-accent" />
                          <span className="text-sm text-muted-foreground">
                            Действует до {promo.validUntil}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                          {promo.title}
                        </h2>

                        <p className="text-foreground mb-6 text-sm">
                          {promo.description}
                        </p>

                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                            <Icon name="Sparkles" size={20} className="text-accent" />
                            Что входит в акцию:
                          </h3>
                          <ul className="space-y-2">
                            {promo.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                <Icon name="Check" size={18} className="text-accent mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <Icon name="Info" size={18} className="text-accent" />
                            Условия акции:
                          </h4>
                          <p className="text-sm text-muted-foreground">{promo.conditions}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => window.location.href = '/contacts'}
                          className="bg-accent hover:bg-accent/90 text-primary dark:bg-accent dark:text-primary-foreground dark:hover:bg-accent/80 flex-1"
                          size="lg"
                        >
                          Оформить заказ
                          <Icon name="ArrowRight" size={20} className="ml-2" />
                        </Button>
                        <Button 
                          onClick={() => window.location.href = '/contacts'}
                          variant="outline"
                          size="lg"
                          className="flex-1"
                        >
                          Задать вопрос
                          <Icon name="MessageCircle" size={20} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-secondary/30 border-2 border-accent/20">
              <CardContent className="p-8 md:p-12">
                <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Не нашли подходящую акцию?
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Подпишитесь на наши новости и узнавайте о новых акциях и специальных предложениях первыми!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button className="bg-accent hover:bg-accent/90 text-primary dark:bg-accent dark:text-primary-foreground dark:hover:bg-accent/80">
                    Подписаться
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Promos;