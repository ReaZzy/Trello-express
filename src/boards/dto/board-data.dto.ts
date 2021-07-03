import { Column } from '../column.entity';

export class BoardDataDto {
  readonly title: string;
  readonly columns: Column[];
}
