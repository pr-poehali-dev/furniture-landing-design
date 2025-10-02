import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ваша мебель</h3>
            <p className="text-sm opacity-80">Производство премиальной мебели с 1998 года</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-80">
              <li 
                onClick={() => window.location.href = '/portfolio?category=Кухни'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Кухни
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Спальни'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Спальни
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Гостиные'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Гостиные
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Гардеробные'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Гардеробные
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Ванные комнаты'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Ванные комнаты
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Детские'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Детские
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Прихожие'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Прихожие
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Офисы'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Офисы
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Мягкие панели'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Мягкие панели
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Декор'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Декор
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio?category=Торговые оборудования'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Торговые оборудования
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li 
                onClick={() => window.location.href = '/about'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                О нас
              </li>
              <li 
                onClick={() => window.location.href = '/portfolio'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Портфолио
              </li>
              <li 
                onClick={() => window.location.href = '/promos'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Акции
              </li>
              <li 
                onClick={() => window.location.href = '/contacts'} 
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                Контакты
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              <a 
                href="https://t.me/yourcompany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors group"
              >
                <Icon name="Send" size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://instagram.com/yourcompany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors group"
              >
                <Icon name="Instagram" size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://wa.me/74951234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors group"
              >
                <Icon name="MessageCircle" size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          © 2025 Ваша Мебель. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;