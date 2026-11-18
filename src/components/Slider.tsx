import type { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

const CARD_BREAKPOINTS: SwiperOptions['breakpoints'] = {
  0: { slidesPerView: 2, spaceBetween: 10 },
  600: { slidesPerView: 3, spaceBetween: 16 },
  900: { slidesPerView: 4, spaceBetween: 16 },
  1200: { slidesPerView: 5, spaceBetween: 16 },
};

const REVIEW_BREAKPOINTS: SwiperOptions['breakpoints'] = {
  0: { slidesPerView: 1, spaceBetween: 10 },
  700: { slidesPerView: 2, spaceBetween: 16 },
  1100: { slidesPerView: 3, spaceBetween: 16 },
};

interface SliderProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  variant?: 'cards' | 'reviews';
  className?: string;
  label: string;
}

// Horizontal slider with arrows (shown on hover) and responsive slides per view
export default function Slider<T>({ items, getKey, renderItem, variant = 'cards', className = '', label }: SliderProps<T>) {
  const isReviews = variant === 'reviews';
  const maxPerView = isReviews ? 3 : 5;

  return (
    <Swiper
      className={`slider ${isReviews ? 'details-reviews-slider' : ''} ${className}`}
      modules={[Navigation]}
      navigation
      breakpoints={isReviews ? REVIEW_BREAKPOINTS : CARD_BREAKPOINTS}
      // Loop mode needs enough slides, otherwise Swiper warns and disables it
      loop={items.length >= maxPerView * 2}
      aria-label={label}
    >
      {items.map((item) => (
        <SwiperSlide key={getKey(item)} className={isReviews ? 'review-slide' : ''}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
