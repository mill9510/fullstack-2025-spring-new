import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Genre } from "./Genre";
import { ParentPlatform } from "./ParentPlatform";
import { Store } from "./Store";

@Entity("gamesoriginal")
export class GameOriginal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  metacritic?: number;

  @Column({ nullable: true })
  background_image?: string;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => ParentPlatform, (platform) => platform.games)
  @JoinTable()
  parent_platforms: {platform: ParentPlatform}[];

  @ManyToMany(() => Store, (store) => store.games)
  @JoinTable()
  stores: {store: Store}[];
}
