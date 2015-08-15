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
            return this[entity];
        },
        insertData : function (entity, data) {
            var dataEntity = this[entity];
            dataEntity.push(data);
        }, 
    };
    
    return data_service;
};

