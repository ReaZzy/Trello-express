export interface UserType {
  id: string,
  login: string,
  name: string
}

export interface ColumnType {
  id: string,
  title: string,
  order: number
}

export interface BoardType {
  id: string,
  title: string,
  columns: Array<ColumnType>
}

export interface TaskType{
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string,
  columnId: string
}

export interface DB {
  users: Array<UserType>
  boards: Array<BoardType>
  tasks: Array<TaskType>
}



export type GetDataType = (arr:ArrType) => Promise<EntityType[]>
export type SetDataType = (arr:ArrType, value:EntityType[]) => Promise<void>
export type GetByIdType = (arr:ArrType, id:string) => Promise<EntityType|undefined>
export type UpdateDataType = (arr:ArrType, data:EntityType) => Promise<EntityType|undefined>
export type DeleteDataType = (arr:ArrType, id:string) => Promise<boolean>

export type ArrType = keyof DB
export type EntityType = UserType | BoardType | TaskType

