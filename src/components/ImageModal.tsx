import { useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, isOpen, onClose }: ImageModalProps) => {
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group z-10"
        aria-label="Закрыть"
      >
        <Icon name="X" size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div 
        className="relative max-w-7xl max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Полноэкранный просмотр"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        Нажмите ESC или кликните вне изображения для закрытия
      </div>
    </div>
  );
};

export default ImageModal;
