import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">Контакты</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Свяжитесь с нами</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Готовы обсудить ваш проект? Оставьте заявку, и наш менеджер свяжется с вами в течение часа
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">Наши контакты</h2>
              
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Адрес офиса</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Производственная, 15</p>
                      <p className="text-sm text-muted-foreground mt-1">БЦ "Мебельный", 3 этаж, офис 305</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Телефон</h3>
                      <a href="tel:+74951234567" className="text-muted-foreground hover:text-accent transition-colors">
                        +7 (495) 123-45-67
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Бесплатный звонок по России</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Email</h3>
                      <a href="mailto:info@mebelart.ru" className="text-muted-foreground hover:text-accent transition-colors">
                        info@mebelart.ru
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Ответим в течение 2 часов</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Режим работы</h3>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 19:00</p>
                      <p className="text-muted-foreground">Сб-Вс: 10:00 - 16:00</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-primary mb-4">Мы в социальных сетях</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://t.me/yourcompany" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-all group"
                  >
                    <Icon name="Send" size={24} className="text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://instagram.com/yourcompany" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-all group"
                  >
                    <Icon name="Instagram" size={24} className="text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://wa.me/74951234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-all group"
                  >
                    <Icon name="MessageCircle" size={24} className="text-accent group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Оставьте заявку</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Ваше имя *
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Иван Иванов" 
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Телефон *
                      </label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (___) ___-__-__" 
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Email
                      </label>
                      <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="email@example.com"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Сообщение
                      </label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Расскажите о вашем проекте..." 
                        rows={5}
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-primary h-12" 
                      size="lg"
                    >
                      Отправить заявку
                      <Icon name="Send" size={20} className="ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Как нас найти</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-96 md:h-[500px] bg-secondary/20">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A64e1b1c8c5e5e5e5e5e5e5e5e5e5e5e5&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="absolute inset-0"
                    title="Карта расположения офиса"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 text-center">
              <p className="text-muted-foreground mb-2">
                Бесплатная парковка для клиентов • Удобный подъезд • Рядом метро "Авиамоторная"
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Личная встреча</h3>
                <p className="text-muted-foreground mb-4">
                  Приезжайте в наш офис для обсуждения проекта с дизайнером
                </p>
                <Button variant="outline" onClick={() => window.scrollTo(0, 0)}>
                  Записаться на встречу
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Home" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Выезд замерщика</h3>
                <p className="text-muted-foreground mb-4">
                  Бесплатный выезд для замера помещения по Москве и области
                </p>
                <Button variant="outline" onClick={() => window.scrollTo(0, 0)}>
                  Заказать выезд
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Video" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Онлайн-консультация</h3>
                <p className="text-muted-foreground mb-4">
                  Видеозвонок с дизайнером в удобное для вас время
                </p>
                <Button variant="outline" onClick={() => window.scrollTo(0, 0)}>
                  Назначить звонок
                </Button>
              </CardContent>
            </Card>
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

export default Contacts;
