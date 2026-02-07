export type TabType = 'contacts' | 'map' | 'press';

export interface PressItem {
    id: string;
    title_ua: string;
    title_en: string;
    subtitle_ua: string;
    subtitle_en: string;
    image: string;
    description_ua: string;
    description_en: string;
    details_ua: string[];
    details_en: string[];
}
