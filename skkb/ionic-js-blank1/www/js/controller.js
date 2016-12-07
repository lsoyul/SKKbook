angular.module('shoppingApp.controller', [])

.controller('mainController', function ($scope, $ionicModal, $timeout, $http, $state,$ionicPopup,  dataShare) {
    
    $scope.isSearchMode = false;

    $scope.loginData = {};
    $scope.yourName = "Unknown";

    $scope.yourName = dataShare.get().name;
    $scope.pNumber = dataShare.get().pnumber;
    
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/sellModal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Do search
    $scope.doSearch = function(){
        if ($scope.isSearchMode == false) $scope.isSearchMode = true;
        else
            $scope.isSearchMode = false;
    };
    
    // Triggered in the login modal to close it
    $scope.closeSellPage = function () {
        $scope.modal.hide();
        $window.location.reload(true);
        $state.transitionTo('app.page1', null, { reload: true, notify: true });
    };
    
    // Open the login modal
    $scope.gotoSellpage = function () {
        $scope.modal.show();
    };
    
    // Perform the login action when the user submits the login form
   // $scope.doSell = function () {
   //     console.log('물품을 등록중입니다', $scope.productData);
   // 
   //     // Simulate a login delay. Remove this and replace with your login
   //     // code if using a login system
   //     $timeout(function () {
   //         $scope.closeSellPage();
   //     }, 1000);
   // };

    $scope.productData = {};

    //file control
    $scope.uploadFile = function () {
        var form_data = new FormData();

        for (key in $scope.productData) {

            form_data.append(key, $scope.productData[key]);
        }
        // getting the file

        var file = $('#file')[0].files[0];
        form_data.append('image', file);
        form_data.append('user_name', dataShare.get().name);


        $http.post("http://sgykim15.cafe24.com/teamf/uploadFile.php", form_data,
            {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data' : false}
            })
            .success(function (response) {
                alert(response);
            });

      //angular.forEach($scope.files, function (file) {
      //    form_data.append('file', file);
      //});
      //
      //$scope.asdf = $scope.files;
      //console.log($scope.files);
      //console.log(form_data);
      //
      //$http.post("http://sgykim15.cafe24.com/teamf/uploadFile.php", form_data,
      //    {
      //        transformRequest: angular.identity,
      //        headers: { 'Content-Type': undefined, 'Process-Data' : false}
      //    })
      //    .success(function (response) {
      //        alert(response);
      //    });
        $window.location.reload(true);
        $state.transitionTo('app.page1', null, {reload: true, notify:true});
    };

    // Loading Data
    $scope.ItemList = "";

    $http
        ({
            method: "GET",
            url: "http://sgykim15.cafe24.com/teamf/getItemList.php"

        })
    .then(function (itemData) {

        $scope.ItemList = itemData.data;
        //$scope.ItemList = itemData.data;
    }, function (itemData) {
        $scope.ItemList = "error";
    })

    $scope.TranList = "";
    $scope.TranPeople = "";

    $http
        ({
            method: "GET",
            url: "http://sgykim15.cafe24.com/teamf/getTransactionList.php"

        })
    .then(function (tranData) {

        $scope.TranList = tranData.data;
        //$scope.ItemList = itemData.data;
    }, function (tranData) {
        $scope.TranList = "error";
    })


    // Refresher
    $scope.doRefreshTran = function () {
        $http
        ({
            method: "GET",
            url: "http://sgykim15.cafe24.com/teamf/getTransactionList.php"

        })
    .then(function (tranData) {

        $scope.TranList = tranData.data;
        //$scope.ItemList = itemData.data;
    }, function (tranData) {
        $scope.TranList = "error";
    }).finally(function () {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    });
    };

    $scope.doRefresh = function () {

        $http
        ({
            method: "GET",
            url: "http://sgykim15.cafe24.com/teamf/getItemList.php"

        })
    .then(function (itemData) {

        $scope.ItemList = itemData.data;
        //$scope.ItemList = itemData.data;
    }, function (itemData) {
        $scope.ItemList = "error";
    })
         .finally(function () {
             // Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
         });
    };

    // Transaction Manager
    $scope.prodData = {};
    $scope.buyItem = function (prod) {
        $scope.prodData = prod;
        //
        $http({
            method: "POST",
            url: "http://sgykim15.cafe24.com/teamf/insertTransaction.php",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data:
            {
                'prod_id': $scope.prodData.id,
                'buyer': dataShare.get().name,
                'seller': $scope.prodData.id_seller,
                'prod_name': $scope.prodData.name_prod
            }

        });


        //console.log($scope.prodData.name_prod);
        

    };

    $scope.setSubject = function (subject) {
        $scope.subjectSelect = subject;
    };


    // Time table
    $scope.events = [{
        "id": "1",
        "text": "미적분학",
        "start": "2016-12-04T10:30:00",
        "end": "2016-12-04T11:45:00"
    },
    {
        "id": "2",
        "text": "미적분학",
        "start": "2016-12-06T09:00:00",
        "end": "2016-12-06T10:15:00"
    },
    {
        "id": "3",
        "text": "선형대수",
        "start": "2016-12-05T10:30:00",
        "end": "2016-12-05T11:45:00"
    },
    {
        "id": "4",
        "text": "선형대수",
        "start": "2016-12-07T09:00:00",
        "end": "2016-12-07T10:15:00"
    },
    {
        "id": "5",
        "text": "소프트웨어공학",
        "start": "2016-12-04T15:00:00",
        "end": "2016-12-04T16:15:00"
    },
    {
        "id": "6",
        "text": "소프트웨어공학",
        "start": "2016-12-06T12:00:00",
        "end": "2016-12-06T13:15:00"
    },
    {
        "id": "7",
        "text": "일반물리학",
        "start": "2016-12-08T13:00:00",
        "end": "2016-12-08T16:30:00"
    }
    ];

    $scope.dayConfig = {
        visible: false,
        viewType: "Day"
    };

    $scope.weekConfig = {
        viewType: "Week"
    };

    $scope.map = {
        center: [37.2930, 126.9757],
        options: function () {
            return {
                streetViewControl: false,
                scrollwheel: false
            }
        }
    };

    $scope.marker = {
        position: [37.2930, 126.9757],
        decimals: 4,
        options: function () {
            return { draggable: true };
        }
    }

    $scope.infowindow = {
        position: [37.2930, 126.9757]
    }
})

.controller('Page1Ctrl', function ($scope, $ionicModal, $timeout) {

   
})

.controller("WelcomeCtrl", function ($scope, $http, $ionicPopup, $state, dataShare) {
    $scope.data = {};

    $scope.temp = "dsdf";
    $scope.login = function () {
        console.log("LOGIN user: " + $scope.data.userid + " - PW: " + $scope.data.password);

        $http({
            method: "POST",
            url: "http://sgykim15.cafe24.com/teamf/doLogin.php",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data:
            {
                'id': $scope.data.userid,
                'password': $scope.data.password
            }

        })
        .then(function (userData) {

            $scope.temp = userData.data[0].name;

            if(userData.data[0].passwd == $scope.data.password)
            {
                dataShare.set(userData.data[0]);
                $state.go('app.page1');
            }
        })
        .success(function (data, status, headers, config) {
           // $scope.temp = data;
            
        })
        ;

        //if($scope.data.username == 'user' && $scope.data.password == '1234')
        //{
        //    $state.go('app.page1');
        //}
        //else {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Login failed!',
        //        template: '아이디와 비밀번호를 다시 확인하세요'
        //    });
        //}
    }

    $scope.join = function () {
        $state.go('register');
    }

})

.controller("registerCtrl", function ($scope, $http, $state) 
{
    $scope.loginData = {};
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    
    $scope.doRegister = function () {
    
        $http({
            method: "POST",
            url: "http://sgykim15.cafe24.com/teamf/insertUser.php",
            headers: { 'Content-Type' : 'application/json; charset=UTF-8' },
            data:
            {
                'id': $scope.loginData.id,
                'username': $scope.loginData.username,
                'password': $scope.loginData.password,
                'email': $scope.loginData.email,
                'pnumber': $scope.loginData.pnumber,
                'schoolid': $scope.loginData.schoolid
            }
    
        });
    
        $state.go('welcome');
    }
})