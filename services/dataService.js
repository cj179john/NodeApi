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
        getData : function (entity) {
            if (typeof this[entity] == 'undefined') {
                throw 'entity' + entity + ' is undefined'; 
            }
            return this[entity];
        },
        insertData : function (entity, data) {
            var dataEntity = this[entity];
            if (typeof this[entity] == 'undefined') {
                throw 'entity ' + entity + ' is undefined'; 
            }
            dataEntity.push(data);
        }, 
    };
    
    return data_service;
};

