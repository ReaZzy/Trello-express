let tasks = [];

const getTasks = async () => tasks;
const setTasks = async (array) => {
  tasks = array;
};

module.exports.getTasks = getTasks;
module.exports.setTasks = setTasks;