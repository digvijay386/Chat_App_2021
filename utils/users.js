const users = [];

// join user to the chat
function userJoin(id, displayname, room){
    const user = {id, displayname, room};
    users.push(user);
    return user;
}

// getting the current user
function getCurrentUser(id){
 return users.find(user => user.id == id);
}

// user leaves the chat
function userleave(id){
    const index = users.findIndex(user => user.id == id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userleave,
    getRoomUsers
};