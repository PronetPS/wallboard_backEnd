var  Db = require('./dbOpration');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('Connection succesfully created with DB');
    next();
});

//get all getAllAgentsSupervisors within 10 min
router.route('/vw_AgentStateStatus_Last10Mins').get((request, response) => {
    Db.getAllAgentsSupervisors10Min().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})

//get all getAllAgentsSupervisors
router.route('/getAllAgentsSupervisors').get((request, response) => {

    Db.getAllAgentsSupervisors().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})

//all supervisors
router.route('/getAllSupervisors').get((request, response) => {
    Db.getAllSupervisors().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})

//all karachi supervisors
router.route('/getAllKHISupervisors').get((request, response) => {
    Db.getAllKHISupervisors().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})

//all Lahore supervisors
router.route('/getAllLHRSupervisors').get((request, response) => {
    Db.getAllLHRSupervisors().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})


router.route('/getAllUser').get((request, response) => {
    Db.getAllUser().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})

router.route('/createUser').post((request, response) => {
    let user = { ...request.body }
    // console.log('api user -------------',user)
    Db.createUser(user).then(data => {
       response.json(data);
    })
})

router.route('/deleteUser').post((request, response) => {
    let user = { ...request.body }
    Db.getDeleteUser(user).then(data => {
       response.json(data);
    })
})


router.route('/updateUser').post((request, response) => {
    let user = { ...request.body }
    Db.updateUser(user).then(data => {
       response.json(data);
    })
})

router.route('/loginUser').post((request, response) => {
    let user = { ...request.body }
    Db.loginUser(user).then(data => {
       response.json(data);
    })
})


router.route('/getWaitCall').get((request, response) => {
    Db.getWaitCall().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})



router.route('/getMainScreenStatsV1').get((request, response) => {
    Db.getMainScreenStatsV1().then((data) => {
        response.json(data);
    })
})



router.route('/getMainScreenStatsV2').get((request, response) => {
    Db.getMainScreenStatsV2().then((data) => {
        response.json(data);
    })
})



router.route('/getSliderStat').get((request, response) => {
    Db.getSliderStat().then((data) => {
        response.json(data);
    })
})


router.route('/getTableKHI').get((request, response) => {
    Db.getTableKHI().then((data) => {
        response.json(data);
    })
})


router.route('/getTableLHR').get((request, response) => {
    Db.getTableLHR().then((data) => {
        response.json(data);
    })
})

router.route('/getliloData').get((request, response) => {
    Db.getliloData().then((data) => {
        response.json(data);
    })
})



router.route('/getMTDSL').get((request, response) => {
    Db.getMTDSL().then((data) => {
        response.json(data);
    })
})


router.route('/getAHT').get((request, response) => {
    Db.getAHT().then((data) => {
        // response.json(data.data[0]);
        response.json(data);
    })
})





var port = process.env.PORT || 2022;
app.listen(port);
console.log('API is runnning at ' + port);