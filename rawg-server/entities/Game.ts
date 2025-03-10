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

@Entity("games")
export class Game {
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
  parent_platforms: ParentPlatform[];

  @ManyToMany(() => Store, (store) => store.games)
  @JoinTable()
  stores: Store[];
}
