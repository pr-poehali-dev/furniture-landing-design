import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PromoModalProps {
  promo: {
    title: string;
    description: string;
    discount: string;
    fullDescription?: string;
    conditions?: string[];
    validUntil?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromoModal = ({ promo, isOpen, onClose }: PromoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !promo) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-background rounded-3xl shadow-2xl animate-scale-in my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 right-0 flex justify-end p-4 bg-background/95 backdrop-blur-sm rounded-t-3xl z-10">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors group"
            aria-label="Закрыть"
          >
            <Icon name="X" size={20} className="text-foreground group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="px-8 pb-8 md:px-12 md:pb-12 -mt-4">
          <div className="flex items-start gap-4 mb-6">
            <Badge className="bg-accent text-primary text-lg px-4 py-2 flex-shrink-0">
              {promo.discount}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {promo.title}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {promo.description}
          </p>

          {promo.fullDescription && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-3">Подробности</h3>
              <p className="text-foreground leading-relaxed">
                {promo.fullDescription}
              </p>
            </div>
          )}

          {promo.conditions && promo.conditions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-3">Условия акции</h3>
              <ul className="space-y-2">
                {promo.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {promo.validUntil && (
            <div className="bg-secondary/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={20} className="text-accent" />
                <span>Акция действует до {promo.validUntil}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.href = '/contacts'}
              className="bg-accent hover:bg-accent/90 text-primary flex-1"
              size="lg"
            >
              Получить консультацию
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              size="lg"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoModal;