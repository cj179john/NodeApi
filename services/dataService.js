module.exports = function (app) {

    var data_service = {
        customers : [{
            id : '1',
            balance : 100  
        }, {
            id : '2',
            balance : 200
        }],
        users : [{
            id : '1',
            name: 'john',
            password: 'john'
        }],
        getData : function (entity, callback) {
            var error;

            if (typeof this[entity] == 'undefined') {
                error = 'entity' + entity + ' is undefined'; 
            }
            
            callback(error, this[entity]);
        },
        insertData : function (entity, data, callback) {
            var error;
            var dataEntity = this[entity];
            if (typeof this[entity] == 'undefined') {
                error = 'entity ' + entity + ' is undefined'; 
            }
            dataEntity.push(data);
            callback(error, true);
        }, 
    };
    
    return data_service;
};

