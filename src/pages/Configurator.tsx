import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Configurator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const [mode, setMode] = useState<'furniture' | 'interior'>('furniture');
  const [config, setConfig] = useState({
    type: '',
    material: '',
    color: '',
    style: ''
  });

  const [interiorConfig, setInteriorConfig] = useState({
    roomType: '',
    style: '',
    color: '',
    area: ''
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

  const furnitureTypes = [
    { value: 'sofa', label: 'Диван', icon: 'Sofa', english: 'sofa' },
    { value: 'wardrobe', label: 'Шкаф', icon: 'Shirt', english: 'wardrobe' },
    { value: 'bed', label: 'Кровать', icon: 'BedDouble', english: 'bed' },
    { value: 'table', label: 'Стол', icon: 'Table', english: 'table' },
    { value: 'chair', label: 'Стул', icon: 'Armchair', english: 'chair' },
    { value: 'kitchen', label: 'Кухня', icon: 'UtensilsCrossed', english: 'kitchen cabinet' },
    { value: 'dresser', label: 'Комод', icon: 'Box', english: 'dresser' },
    { value: 'bookshelf', label: 'Стеллаж', icon: 'BookOpen', english: 'bookshelf' }
  ];

  const materials = [
    { value: 'wood', label: 'Дерево', english: 'natural wood' },
    { value: 'mdf', label: 'МДФ', english: 'MDF board' },
    { value: 'metal', label: 'Металл', english: 'metal' },
    { value: 'glass', label: 'Стекло', english: 'glass' },
    { value: 'leather', label: 'Кожа', english: 'leather upholstery' },
    { value: 'fabric', label: 'Ткань', english: 'fabric upholstery' }
  ];

  const colors = [
    { value: 'white', label: 'Белый', english: 'white' },
    { value: 'black', label: 'Черный', english: 'black' },
    { value: 'brown', label: 'Коричневый', english: 'brown' },
    { value: 'beige', label: 'Бежевый', english: 'beige' },
    { value: 'gray', label: 'Серый', english: 'gray' },
    { value: 'blue', label: 'Синий', english: 'blue' }
  ];

  const styles = [
    { value: 'modern', label: 'Современный', english: 'modern' },
    { value: 'classic', label: 'Классический', english: 'classic' },
    { value: 'minimalist', label: 'Минимализм', english: 'minimalist' },
    { value: 'loft', label: 'Лофт', english: 'industrial loft' },
    { value: 'scandinavian', label: 'Скандинавский', english: 'scandinavian' }
  ];

  const roomTypes = [
    { value: 'living', label: 'Гостиная', english: 'living room' },
    { value: 'bedroom', label: 'Спальня', english: 'bedroom' },
    { value: 'kitchen', label: 'Кухня', english: 'kitchen' },
    { value: 'bathroom', label: 'Ванная', english: 'bathroom' },
    { value: 'office', label: 'Кабинет', english: 'home office' },
    { value: 'dining', label: 'Столовая', english: 'dining room' },
    { value: 'children', label: 'Детская', english: 'children room' }
  ];

  const generateImage = async () => {
    if (mode === 'furniture') {
      if (!config.type) {
        toast({
          title: "Заполните поля",
          description: "Пожалуйста, выберите тип мебели",
          variant: "destructive"
        });
        return;
      }

      setIsGenerating(true);

      const furnitureType = furnitureTypes.find(t => t.value === config.type)?.english || 'furniture';
      const materialText = materials.find(m => m.value === config.material)?.english || 'modern material';
      const colorText = colors.find(c => c.value === config.color)?.english || 'neutral color';
      const styleText = styles.find(s => s.value === config.style)?.english || 'contemporary';

      const prompt = `Professional 3D render of luxury ${styleText} ${furnitureType}, made of ${materialText}, ${colorText} color, high quality photorealistic rendering, studio lighting, white background, product photography, detailed texture`;

      try {
        const imageUrl = 'https://pollinations.ai/p/' + encodeURIComponent(prompt);
        setGeneratedImage(imageUrl);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Готово!",
          description: "Ваша мебель создана. Сохраните или отправьте на расчёт стоимости."
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось создать изображение. Попробуйте ещё раз.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    } else {
      if (!interiorConfig.roomType) {
        toast({
          title: "Заполните поля",
          description: "Пожалуйста, выберите тип комнаты",
          variant: "destructive"
        });
        return;
      }

      setIsGenerating(true);

      const roomType = roomTypes.find(r => r.value === interiorConfig.roomType)?.english || 'room';
      const styleText = styles.find(s => s.value === interiorConfig.style)?.english || 'modern';
      const colorText = colors.find(c => c.value === interiorConfig.color)?.english || 'neutral';
      
      let prompt = '';
      if (interiorConfig.area) {
        const area = parseInt(interiorConfig.area);
        let sizeDesc = '';
        let spaceDesc = '';
        
        if (area <= 5) {
          sizeDesc = 'tiny compact';
          spaceDesc = 'very small space, minimal furniture, efficient layout';
        } else if (area <= 10) {
          sizeDesc = 'small cozy';
          spaceDesc = 'compact space, smart storage solutions';
        } else if (area <= 20) {
          sizeDesc = 'medium comfortable';
          spaceDesc = 'adequate space, balanced furniture arrangement';
        } else if (area <= 35) {
          sizeDesc = 'spacious';
          spaceDesc = 'generous space, comfortable furniture placement';
        } else {
          sizeDesc = 'large luxurious';
          spaceDesc = 'expansive space, premium furniture, open layout';
        }
        
        prompt = `${sizeDesc} ${styleText} ${roomType}, ${area} square meters, ${spaceDesc}, ${colorText} color palette, professional interior design photography, wide angle view, natural daylight, high resolution, realistic, detailed`;
      } else {
        prompt = `Beautiful ${styleText} ${roomType} interior design, ${colorText} color scheme, luxury furniture, professional interior photography, wide angle, natural lighting, high quality, detailed, cozy atmosphere, realistic`;
      }

      try {
        const imageUrl = 'https://pollinations.ai/p/' + encodeURIComponent(prompt);
        setGeneratedImage(imageUrl);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Готово!",
          description: "Интерьер вашей комнаты готов. Сохраните или отправьте на расчёт."
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось создать изображение. Попробуйте ещё раз.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const resetConfig = () => {
    setConfig({
      type: '',
      material: '',
      color: '',
      style: ''
    });
    setInteriorConfig({
      roomType: '',
      style: '',
      color: '',
      area: ''
    });
    setGeneratedImage(null);
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

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-primary px-4 py-2">Попробуйте сейчас</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">3D Конфигуратор</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Создайте мебель или визуализируйте интерьер комнаты с помощью ИИ. 
              Выберите параметры и получите реалистичное изображение за секунды
            </p>

            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={() => {
                  setMode('furniture');
                  setGeneratedImage(null);
                }}
                variant={mode === 'furniture' ? 'default' : 'outline'}
                className={mode === 'furniture' ? 'bg-accent hover:bg-accent/90 text-primary' : ''}
                size="lg"
              >
                <Icon name="Armchair" size={20} className="mr-2" />
                Мебель
              </Button>
              <Button
                onClick={() => {
                  setMode('interior');
                  setGeneratedImage(null);
                }}
                variant={mode === 'interior' ? 'default' : 'outline'}
                className={mode === 'interior' ? 'bg-accent hover:bg-accent/90 text-primary' : ''}
                size="lg"
              >
                <Icon name="Home" size={20} className="mr-2" />
                Интерьер
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Icon name="Settings" size={20} className="text-accent" />
                  {mode === 'furniture' ? 'Параметры мебели' : 'Параметры интерьера'}
                </h2>

                <div className="space-y-4">
                  {mode === 'furniture' ? (
                    <>
                      <div>
                        <Label htmlFor="type" className="text-sm font-medium mb-1.5 block">
                          Тип мебели *
                        </Label>
                        <Select value={config.type} onValueChange={(value) => setConfig({...config, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип мебели" />
                          </SelectTrigger>
                          <SelectContent>
                            {furnitureTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <Icon name={type.icon as any} size={16} />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="material" className="text-sm font-medium mb-1.5 block">
                            Материал
                          </Label>
                          <Select value={config.material} onValueChange={(value) => setConfig({...config, material: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Материал" />
                            </SelectTrigger>
                            <SelectContent>
                              {materials.map((material) => (
                                <SelectItem key={material.value} value={material.value}>
                                  {material.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="color" className="text-sm font-medium mb-1.5 block">
                            Цвет
                          </Label>
                          <Select value={config.color} onValueChange={(value) => setConfig({...config, color: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Цвет" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                  {color.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="style" className="text-sm font-medium mb-1.5 block">
                          Стиль
                        </Label>
                        <Select value={config.style} onValueChange={(value) => setConfig({...config, style: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите стиль" />
                          </SelectTrigger>
                          <SelectContent>
                            {styles.map((style) => (
                              <SelectItem key={style.value} value={style.value}>
                                {style.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="roomType" className="text-sm font-medium mb-1.5 block">
                          Тип комнаты *
                        </Label>
                        <Select value={interiorConfig.roomType} onValueChange={(value) => setInteriorConfig({...interiorConfig, roomType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип комнаты" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomTypes.map((room) => (
                              <SelectItem key={room.value} value={room.value}>
                                {room.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="area" className="text-sm font-medium mb-1.5 block">
                            Площадь (м²)
                          </Label>
                          <Input
                            id="area"
                            type="number"
                            placeholder="25"
                            value={interiorConfig.area}
                            onChange={(e) => setInteriorConfig({...interiorConfig, area: e.target.value})}
                          />
                        </div>

                        <div>
                          <Label htmlFor="interiorColor" className="text-sm font-medium mb-1.5 block">
                            Цвет
                          </Label>
                          <Select value={interiorConfig.color} onValueChange={(value) => setInteriorConfig({...interiorConfig, color: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Цвет" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                  {color.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interiorStyle" className="text-sm font-medium mb-1.5 block">
                          Стиль интерьера
                        </Label>
                        <Select value={interiorConfig.style} onValueChange={(value) => setInteriorConfig({...interiorConfig, style: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите стиль" />
                          </SelectTrigger>
                          <SelectContent>
                            {styles.map((style) => (
                              <SelectItem key={style.value} value={style.value}>
                                {style.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      onClick={generateImage}
                      disabled={isGenerating}
                      className="bg-accent hover:bg-accent/90 text-primary flex-1"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Создание...
                        </>
                      ) : (
                        <>
                          <Icon name="Wand2" size={20} className="mr-2" />
                          {mode === 'furniture' ? 'Создать мебель' : 'Создать интерьер'}
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={resetConfig}
                      variant="outline"
                      size="lg"
                      className="sm:w-auto"
                    >
                      <Icon name="RotateCcw" size={20} className="sm:mr-0" />
                      <span className="sm:hidden ml-2">Сбросить</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Icon name="Image" size={24} className="text-accent" />
                  Предпросмотр
                </h2>

                {generatedImage ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                      <img 
                        src={generatedImage} 
                        alt={mode === 'furniture' ? 'Сгенерированная мебель' : 'Сгенерированный интерьер'}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => window.location.href = '/contacts'}
                        className="bg-accent hover:bg-accent/90 text-primary flex-1"
                      >
                        <Icon name="Calculator" size={18} className="mr-2" />
                        Рассчитать стоимость
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generatedImage;
                          link.download = mode === 'furniture' ? 'furniture-model.jpg' : 'interior-design.jpg';
                          link.click();
                        }}
                      >
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center p-4 sm:p-8">
                      <Icon name={mode === 'furniture' ? 'Box' : 'Home'} size={48} className="sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {mode === 'furniture' 
                          ? 'Выберите параметры и создайте мебель' 
                          : 'Выберите параметры и создайте интерьер'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Генерация с ИИ</h3>
              <p className="text-muted-foreground">
                Искусственный интеллект создаёт реалистичные изображения по вашим параметрам
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Palette" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Любые стили</h3>
              <p className="text-muted-foreground">
                От классики до лофта — выбирайте стиль, материалы и цвета на ваш вкус
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Мгновенный результат</h3>
              <p className="text-muted-foreground">
                Получите визуализацию мебели или интерьера за несколько секунд
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Configurator;