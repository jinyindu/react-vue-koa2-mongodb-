
var mongoose =  require('mongoose')
var Category = mongoose.model('Category')
var Post = mongoose.model('Post')

/**
 * 根据全部类型
 * @param {*} username 
 */
exports.getAllCategorys= async () => {
    var query = await Category.find({});
    return query
}

/**
 * 
 */
exports.getCategoryCount = () => {

    return new Promise((resolve,reject) => {
         Category.find({},function(err,categorys){
            if(!err){
                categorys = JSON.parse(JSON.stringify(categorys));
                getCatrgoriesCount(categorys).then(data => {
                    if(!!data){
                        resolve(data)
                    }
                })
            }
        });
    })

}

const getCatrgoriesCount = categories =>{

    return new Promise((resolve,reject) => {
        let $match = {};
        Post.aggregate([ 
            { $match },
            { $unwind : "$category" }, 
            { $group: { 
                _id: "$category", 
                num_tutorial: { $sum : 1 }}
            }
        ]).then(counts => {
            let newCtefories = categories.map(category => {
                let finded = counts.find(c => String(c._id) === String(category._id));
                category.count = finded ? finded.num_tutorial : 0;
                return category;
            })
            resolve(newCtefories)
        },err => {
            reject(err)
        })
    })
    
}