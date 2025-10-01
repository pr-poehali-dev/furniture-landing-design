import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              onClick={() => window.location.href = '/'} 
              className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
            >
              Ваша мебель
            </h1>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => window.location.href = '/'}
                className="text-sm transition-colors hover:text-accent text-foreground"
              >
                Главная
              </button>
              <button
                className="text-sm transition-colors text-accent font-medium"
              >
                Контакты
              </button>
            </div>
            <Button onClick={() => window.location.href = '/contacts'} className="bg-accent hover:bg-accent/90 text-primary">
              <Icon name="Phone" size={16} className="mr-2" />
              Контакты
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Готовы обсудить ваш проект? Оставьте заявку, и наш менеджер свяжется с вами в течение часа.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-2">Адрес</h4>
                  <p className="text-muted-foreground">г. Москва, ул. Производственная, 15</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-2">Телефон</h4>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-2">Email</h4>
                  <p className="text-muted-foreground">info@vasha-mebel.ru</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-2">Режим работы</h4>
                  <p className="text-muted-foreground">
                    Пн-Пт: 9:00 - 19:00<br />
                    Сб-Вс: 10:00 - 16:00
                  </p>
                </div>
              </div>
            </div>

            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Отправить заявку</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Телефон</label>
                    <Input placeholder="+7 (___) ___-__-__" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <Input type="email" placeholder="email@example.com" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Сообщение</label>
                    <Textarea placeholder="Расскажите о вашем проекте..." rows={5} />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-3xl overflow-hidden h-[400px] shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.4449999999997!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sru!2sru!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ваша мебель</h3>
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
                <li className="cursor-pointer hover:opacity-70" onClick={() => window.location.href = '/'}>О нас</li>
                <li className="cursor-pointer hover:opacity-70" onClick={() => window.location.href = '/'}>Портфолио</li>
                <li className="cursor-pointer hover:opacity-70" onClick={() => window.location.href = '/'}>Акции</li>
                <li className="cursor-pointer hover:opacity-70">Контакты</li>
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
            © 2024 Ваша мебель. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;