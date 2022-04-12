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

router.route('/getAllUser').get((request, response) => {
    Db.getAllUser().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})

router.route('/createUser').post((request, response) => {
    let user = { ...request.body }
    console.log('api user -------------',user)
    Db.createUser(user).then(data => {
        console.log('api data ----------',data)
       response.json(data);
    })
})

router.route('/deleteUser').post((request, response) => {
    let user = { ...request.body }
    console.log('api user -------------',user)
    Db.getDeleteUser(user).then(data => {
        console.log('api data ----------',data) 
       response.json(data);
    })
})


router.route('/updateUser').post((request, response) => {
    let user = { ...request.body }
    console.log('api user -------------',user)
    Db.updateUser(user).then(data => {
        console.log('api data ----------',data) 
       response.json(data);
    })
})

router.route('/loginUser').post((request, response) => {
    let user = { ...request.body }
    console.log('api user -------------',user)
    Db.loginUser(user).then(data => {
        console.log('api data ----------',data) 
       response.json(data);
    })
})


router.route('/getWaitCall').get((request, response) => {
    Db.getWaitCall().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})



router.route('/getMainScreenStatsV1').get((request, response) => {
    Db.getMainScreenStatsV1().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})



router.route('/getMainScreenStatsV2').get((request, response) => {
    Db.getMainScreenStatsV2().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})



router.route('/getSliderStat').get((request, response) => {
    Db.getSliderStat().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})


router.route('/getTableKHI').get((request, response) => {
    Db.getTableKHI().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})


router.route('/getTableLHR').get((request, response) => {
    Db.getTableLHR().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})

router.route('/getliloData').get((request, response) => {
    Db.getliloData().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})



router.route('/getMTDSL').get((request, response) => {
    Db.getMTDSL().then((data) => {
        console.log(data);
        // response.json(data.data[0]);
        response.json(data);
    })
})





var port = process.env.PORT || 2022;
app.listen(port);
console.log('API is runnning at ' + port);