const mongoose = require('mongoose');

/**
 * job description schema
 * resume text
 * self description
 * 
 * matchscore:Number
 * 
 * Technical questions :
 *      [{
 *          question:"",
 *          intension to ask this ques:"",
 *          answer:"",
 *      }]
 * behavioral questions:[ 
 *       {
 *          question:"",
 *          intension to ask this ques:"",
 *          answer:"",
 *      }]
 * skills gaps:[{
 *           skill:"",
 *           severity:{
 *              type:string
 *              enum:["low",medium,high]
 *           }            
 *  }]
 * preparation plan :[{
 *              day:Number
 *              focus:string
 *              tasks:[string]
 * }]
 */
const TechnicalQuestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intension:{
        type:String,
        required:[true,"internsion is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const BehaviouralQuestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intension:{
        type:String,
        required:[true,"internsion is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }    
},{
    _id:false
})

const SkillGapsSchema = new mongoose.Schema({
    skills:{
        typoe:String,
        required:[true,"skills is required"]
    },
    sevrity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"tasks ar required"]
    }]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String,
    },
    matchscore:{
        type:Number,
        min:0,
        max:100,
    },
    TechnicalQuestions:[TechnicalQuestionsSchema],
    BehaviouralQuestions:[BehaviouralQuestionsSchema],
    SkillGaps:[SkillGapsSchema],
    prepartionPlan:[preparationPlanSchema]
},{
    timestamps:true
})


const interviewReportModel = mongoose.model("interviewReport",interviewReportSchema);

module.exports = interviewReportModel;

