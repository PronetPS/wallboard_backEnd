var config = require('./dbConfig');
const sql = require('mssql');
// const { database } = require('./dbConfig');


async function getAllUser() {
    try {
        let pool = await sql.connect(config);
        let allUser = await pool.request().query("select * from wb_user");
        console.log(allUser.recordsets[0]);
        var web_response = {
            message: 'You have successfully got all users',
            status: true,
            data: allUser.recordsets[0]
        }
        return web_response;
    }
    catch (error) {
        console.log(error);
        var web_response = {
            message: 'ERROR',
            status: false,
            data: error
        }
        return web_response;
    }
}


async function getDeleteUser({user_id}) {
    try {
        console.log('op-------------------', user_id)
        let pool = await sql.connect(config);
        let user = await pool.request().query("DELETE FROM wb_user WHERE user_id = '" + user_id + "'");
        var web_response = {
            status: true,
            message: 'Successfully deleted',
            data: user.recordsets[0]
        }
        return web_response;
    }
    catch (error) {
        var web_response = {
            status: false,
            message: 'ERROR',
            data: err
        }
        return web_response;
    }
}


async function loginUser(ID_Pass) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`select * FROM wb_user WHERE user_email = '${ID_Pass?.user_email}'`);
        if(user.recordsets[0].length==0){
            var web_response = {
                status: false,
                message: 'User not found',
                data: user.recordsets[0]
            }
            pool.close();
            return web_response;
        }
        else{
            let user2 = await pool.request().query(`select * FROM wb_user WHERE user_email = '${ID_Pass?.user_email}' and user_password = '${ID_Pass?.user_password}'`);
            if(user2.recordsets[0].length==0){
                var web_response = {
                    status: false,
                    message: 'Invalid Password',
                    data: user2.recordsets[0]
                }
                pool.close();
                return web_response;
            }
            else{
                var web_response = {
                    status: true,
                    message: 'User verified',   
                    data: user.recordsets[0][0]
                }
                pool.close();
                return web_response;
            }
        }


        
    }
    catch (err) {
        var web_response = {
            status: false,
            message: 'ERROR',
            data: err
        }
        return web_response;
    }
}


async function createUser(user) {
    try {
        console.log('user op --------------', user)
        let pool = await sql.connect(config);
        // var insertQuery = "INSERT INTO wb_user VALUES ('" + user.user_id + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.role_type + "', '" + user.user_password + "', '" + user.create_date + "');";
        let insertUser = await pool.request().query("INSERT INTO wb_user VALUES ('" + user.user_id + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.role_type + "', '" + user.user_password + "', '" + user.create_date + "', '" + user.user_email + "')")
        console.log(insertUser);
        var web_response = {
            status: true,
            message: 'sucessfully created the user',
            // data: insertUser.recordsets
            data: user
        }
        pool.close();
        return (web_response)
    }
    catch (err) {
        console.log('catch =======', err);
        var web_response = {
            status: false,
            message: 'ERROR',
            data: err
        }
        return (web_response)
    }
}



async function updateUser(user) {
    try {
        // console.log('user op --------------', user)
        let pool = await sql.connect(config);
        // var insertQuery = "INSERT INTO wb_user VALUES ('" + user.user_id + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.role_type + "', '" + user.user_password + "', '" + user.create_date + "');";
        let updateQuery = await pool.request().query("UPDATE wb_user SET user_id='" + user.user_id + "', first_name='" + user.first_name + "', last_name='" + user.last_name + "', role_type='" + user.role_type + "', user_password='" + user.user_password + "', create_date='" + user.create_date + "', user_email='" + user.user_email + "' WHERE user_id='" + user.user_id + "'");
        console.log(updateQuery);
        var web_response = {
            status: true,
            message: 'sucessfully updated the user',
            data: updateQuery
        }
        pool.close();
        return (web_response)
    }
    catch (err) {
        console.log('catch =======', err);
        var web_response = {
            status: false,
            message: 'ERROR',
            data: err
        }
        return (web_response)
    }
}




module.exports = {
    getAllUser: getAllUser,
    createUser: createUser,
    loginUser: loginUser,
    getDeleteUser: getDeleteUser,
    updateUser:updateUser,
}