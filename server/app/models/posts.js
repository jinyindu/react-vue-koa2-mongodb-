/**
 * 博客文章列表
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    title: { type:String,required:true },
    content: { type:String,required:true },
    cover: { type:String},
    category: {type: Schema.Types.ObjectId,required: true,ref:'Category'},
    author: { type:String },
    published:{ type: Boolean,default: false},
    browse:{ type:Number,default:0},
    tags:[ Schema.Types.Mixed ],
    comments:[Schema.Types.Mixed],
    subtitle: String,
    meta: {
        createAt: {
          type: Date,
          dafault: Date.now()
        },
        updateAt: {
          type: Date,
          dafault: Date.now()
        }
    }
})

PostSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
      this.meta.updateAt = Date.now()
    }
    next()
})

var Post = mongoose.model('Post',PostSchema)
module.exports = Post