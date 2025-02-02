import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { type ConfiguredMenuCourse } from '../../../domain/src/core/configured-menu';

@Entity('ConfiguredMenus')
export class ConfiguredMenuEntity implements DataSource.DBConfiguredMenu {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: string;

    @Column('char', { length: 20, nullable: true })
    menuId?: string;

    @Column('varchar')
    title!: string;

    @Column('text')
    description!: string;

    @Column('varchar', { nullable: true })
    greetingFromKitchen?: string;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('json')
    courses!: ConfiguredMenuCourse[];
}
