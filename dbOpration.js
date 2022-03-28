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



async function getWaitCall() {
    try {
        let pool = await sql.connect(config);
        let waitCall = await pool.request().query("select sum(Call_Wait) as Call_Wait FROM dbo.Skillset_Moving where Skill_ID IN('KHI_U_Bank_Acc_sk','KHI_U_Crd_Card_sk','KHI_U_Dgt_Bank_sk','KHI_U_Isl_Bank_sk','KHI_U_Lost_Stln_sk','KHI_U_P_Isl_Bank_sk','KHI_E_Crd_Card_sk','KHI_E_Dgt_Bank_sk','KHI_E_Isl_Bank_sk','KHI_E_Lost_Stln_sk','KHI_E_P_Con_Bank_sk','KHI_E_P_Isl_Bank_sk','LHR_U_Bank_Acc_sk','LHR_U_Crd_Card_sk','LHR_U_Isl_Bank_sk','LHR_U_Lost_Stln_sk','LHR_U_P_Con_Bank_sk','LHR_E_Bank_Acc_sk','LHR_E_Crd_Card_sk','LHR_E_Dgt_Bank_sk','LHR_E_Isl_Bank_sk','LHR_E_Lost_Stln_sk','LHR_E_P_Con_Bank_sk','LHR_E_P_Isl_Bank_sk','ALFA','MX_Customer_sk','Platinum_Customer_sk')");
        console.log(waitCall.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: waitCall.recordsets[0]
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

async function getMainScreenStatsV1() {
    try {
        let pool = await sql.connect(config);
        let mainScreenStatsv1 = await pool.request().query("select [Landed Calls] as 'LandedCalls', [Answered Calls] as 'AnsweredCalls', [Abandon Calls] as 'AbandonCalls', [Call Ans After Threshold] as 'CallsAnsAftThreshold', [service level] as 'SL' from vw_mainstats_v1");
        console.log(mainScreenStatsv1.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: mainScreenStatsv1.recordsets[0]
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


async function getMainScreenStatsV2() {
    try {
        let pool = await sql.connect(config);
        let mainScreenStatsv2 = await pool.request().query("select [LHR Total NO. Of Agents] + [KHI Total NO. Of Agents] as 'TotalAgent', [LHR Total NO. Of Agents] as 'LHRTotalAgent', [KHI Total NO. Of Agents] as 'KHITotalAgent', [LHR idle Agents] as 'LHRIdleAgent', [KHI idle Agents] as 'KHIIdleAgent', [LHR NotReady Agents] as 'LHRNotReadyAgent', [KHI NotReady Agents] as 'KHINotReadyAgent', [LHR busy Agents] as 'LHRBusyAgent', [KHI busy Agents] as 'KHIBusyAgent', [Calls Waiting In Queue] as 'WaitingInQueue', [Wait time] as 'WaitTime' from vw_mainstats_v2");
        console.log(mainScreenStatsv2.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: mainScreenStatsv2.recordsets[0]
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




async function getSliderStat() {
    try {
        let pool = await sql.connect(config);
        let SliderStat = await pool.request().query("select * from vw_slider_stat");
        console.log(SliderStat.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: SliderStat.recordsets[0]
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


async function getTableKHI() {
    try {
        let pool = await sql.connect(config);
        let tableKHI = await pool.request().query("select sum(QUEUED_CALL_ANS) as KHI_ANSWERED, sum(CALL_OFFERED) as KHI_OFFERED, (SELECT TOP 1 AGENT_IN_SERVICE FROM dbo.Skillset_Moving where Skill_ID IN('KHI_U_Bank_Acc_sk','KHI_U_Crd_Card_sk','KHI_U_Dgt_Bank_sk','KHI_U_Isl_Bank_sk','KHI_U_Lost_Stln_sk','KHI_U_P_Isl_Bank_sk','KHI_E_Crd_Card_sk','KHI_E_Dgt_Bank_sk','KHI_E_Isl_Bank_sk','KHI_E_Lost_Stln_sk','KHI_E_P_Con_Bank_sk','KHI_E_P_Isl_Bank_sk')) as KHI_AGENT_IN_SERVICE FROM dbo.Skillset_Moving where Skill_ID IN('KHI_U_Bank_Acc_sk','KHI_U_Crd_Card_sk','KHI_U_Dgt_Bank_sk','KHI_U_Isl_Bank_sk','KHI_U_Lost_Stln_sk','KHI_U_P_Isl_Bank_sk','KHI_E_Crd_Card_sk','KHI_E_Dgt_Bank_sk','KHI_E_Isl_Bank_sk','KHI_E_Lost_Stln_sk','KHI_E_P_Con_Bank_sk','KHI_E_P_Isl_Bank_sk')");
        console.log(tableKHI.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: tableKHI.recordsets[0]
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




async function getTableLHR() {
    try {
        let pool = await sql.connect(config);
        let tableLHR = await pool.request().query("select sum(QUEUED_CALL_ANS) as LHR_ANSWERED, sum(CALL_OFFERED) as LHR_OFFERED, (SELECT TOP 1 AGENT_IN_SERVICE FROM dbo.Skillset_Moving where Skill_ID IN('LHR_U_Bank_Acc_sk','LHR_U_Crd_Card_sk','LHR_U_Isl_Bank_sk','LHR_U_Lost_Stln_sk','LHR_U_P_Con_Bank_sk','LHR_E_Bank_Acc_sk','LHR_E_Crd_Card_sk','LHR_E_Dgt_Bank_sk','LHR_E_Isl_Bank_sk','LHR_E_Lost_Stln_sk','LHR_E_P_Con_Bank_sk','LHR_E_P_Isl_Bank_sk')) as LHR_AGENT_IN_SERVICE FROM dbo.Skillset_Moving where Skill_ID IN('LHR_U_Bank_Acc_sk','LHR_U_Crd_Card_sk','LHR_U_Isl_Bank_sk','LHR_U_Lost_Stln_sk','LHR_U_P_Con_Bank_sk','LHR_E_Bank_Acc_sk','LHR_E_Crd_Card_sk','LHR_E_Dgt_Bank_sk','LHR_E_Isl_Bank_sk','LHR_E_Lost_Stln_sk','LHR_E_P_Con_Bank_sk','LHR_E_P_Isl_Bank_sk')");
        console.log(tableLHR.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: tableLHR.recordsets[0]
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


async function getliloData() {
    try {
        let pool = await sql.connect(config);
        let Agentloli = await pool.request().query("select * from vw_loli_agents order by Timestamp DESC");
        console.log(Agentloli.recordsets[0]);
        var web_response = {
            message: 'You have successfully executed the query',
            status: true,
            data: Agentloli.recordsets[0]
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







module.exports = {
    getAllUser: getAllUser,
    createUser: createUser,
    loginUser: loginUser,
    getDeleteUser: getDeleteUser,
    updateUser:updateUser,
    getWaitCall: getWaitCall,
    getMainScreenStatsV1: getMainScreenStatsV1,
    getMainScreenStatsV2,getMainScreenStatsV2,
    getSliderStat: getSliderStat,
    getTableKHI: getTableKHI,
    getTableLHR: getTableLHR,
    getliloData: getliloData,
}