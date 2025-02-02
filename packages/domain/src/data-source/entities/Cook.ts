import { type Cook } from '../../core/cook/Cook';

export interface DBCook extends Omit<Cook, 'location'> {
    latitude: number;
    longitude: number;
}
