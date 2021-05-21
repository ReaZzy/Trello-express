const db = {
  "users":[],
  "boards":[],
  "tasks":[],
}

const getData = async (arr) => db[arr]
const setData = async (arr, value) =>{
  db[arr] = value
}

const getById = async (arr, id) =>{
  const candidate = await getData(arr)
  return candidate.find( element => element.id === id );
}

const updateData = async (arr, data) => {
  const candidate = await getData(arr)
  const newCandidate = candidate.map( user => {
    if (user.id === data.id) {
      return { ...user, ...data};
    }
    return user;
  } );
  await setData( arr, newCandidate );
  return newCandidate.find( user => user.id === data.id );
};

const deleteData = async (arr, id) => {
  const data = await getData(arr)
  const candidateDelete = data.find( user => user.id === id );
  const candidate = data.filter( user => user.id !== id );
  await setData(arr, candidate );

  return !!candidateDelete;
}


module.exports = {
  getData,
  setData,
  getById,
  updateData,
  deleteData
}