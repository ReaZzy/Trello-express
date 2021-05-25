import {
  DB,
  GetDataType,
  SetDataType,
  GetByIdType,
  UpdateDataType,
  DeleteDataType, EntityType
} from './types';


const db: DB = {
  'users': [],
  'boards': [],
  'tasks': []
};

/**
 * @typedef {arr} arr
 *
 * @property {"users"|"boards"|"tasks"} arr Database entity
 * */

/**
 * @typedef {User} User
 *
 * @property {string} id User id
 * @property {string} name User name
 * @property {string} login User login
 * */

/**
 * @typedef {Column} Column
 *
 * @property {string} id Column id
 * @property {string} title Column title
 * @property {number} order Column order
 * */


/**
 * @typedef {Board} Board
 *
 * @property {string} id Board id
 * @property {string} title Board title
 * @property {Column[]} columns List of columns
 * */

/**
 * @typedef {Task} Task
 *
 * @property {string} id - Task id
 * @property {string} title - Task title
 * @property {number} order - Task order
 * @property {string} userId - Task userId
 * @property {string} boardId - Task boardId
 * @property {string} columnId - Task columnId
 * */


/**
 * Returns entity by name
 * @param {string} arr Database entity
 *
 * @returns {Promise<User[]|Board[]|Task[]>}
 * @example
 * const users = await getData("users")
 */
const getData: GetDataType = async (arr) => db[arr];

/**
 * Set value to entity by name
 * @param {arr} arr Database entity
 * @param {User|Board|Task} value New value
 * @returns {Promise<void>}
 * @example
 * await setData("users", [{
 *   id: "23-dsad-1245g-gfdbncv",
 *   login: "John",
 *   name: "John"
 * }])
 */

const setData:SetDataType = async (arr, value) => {
  (db[arr] as EntityType[])  = value;
}
/**
 * Returns element by id
 * @param {arr} arr Database entity
 * @param {string} id Object id
 * @returns {Promise<User|Board|Task>}
 *
 * @example
 * const user = await getById("users", "Fdcv421-dsafGb-DSAD-gGs")
 */
const getById:GetByIdType = async (arr, id) => {
  const candidate = await getData(arr);
  return candidate.find((element) => element.id === id);
};

/**
 * Set entity new value by id
 * @param {arr} arr Database entity
 * @param {User|Board|Task} data New value
 * @returns {Promise<User|Board|Task>}
 *
 * @example
 * const updatedTask = await updateData("users", {
 *   id: "23-dsad-1245g-gfdbncv",
 *   login: "John",
 *   name: "John"
 * })
 */
const updateData:UpdateDataType = async (arr, data) => {
  const candidate = await getData(arr);
  const newCandidate = candidate.map(user => {
    if (user.id === data.id) {
      return { ...user, ...data };
    }
    return user;
  });
  await setData(arr, newCandidate);
  return newCandidate.find(user => user.id === data.id);
};

/**
 * Delete entity element by id
 * @param {arr} arr Database entity
 * @param {string} id Object id
 * @returns {Promise<boolean>}
 *
 * @example
 * const deletedBoard = await deleteData("board", "14safas-ggdfg-4634ddgdfs")
 * if(deleteBoard){
 *   // Do stuff ...
 * }
 */
const deleteData:DeleteDataType = async (arr, id) => {
  const data= await getData(arr);
  const candidateDelete = data.find(user => user.id === id);
  const candidate = data.filter(user => user.id !== id);
  await setData(arr, candidate);

  return !!candidateDelete;
};


module.exports = {
  getData,
  setData,
  getById,
  updateData,
  deleteData
};