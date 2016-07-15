//==============
// requirements
//==============
var express = require("express");
var watson = require('watson-developer-cloud');
router = express.Router();

//=============
// watson keys
//=============
var username = process.env.WATSON_USERNAME
var password = process.env.WATSON_PASSWORD

//==================
// request throttle
//==================

var RateLimit = require('express-rate-limit');
var createWatsonLimiter = new RateLimit({
  windowMs: 60*60*1000, // 1 hour window 
  max: 1, // start blocking after 5 requests 
  message: "nooope"
});

var tone_analyzer = watson.tone_analyzer({
  username: username,                              //gotta hide dem keys
  password: password,
  version: 'v3',
  version_date: '2016-05-19'
});

router.get("/", createWatsonLimiter, function(req, res){
  console.log(req.query.text)
  console.log("=============================")
  console.log("this IS an actual API call")
  console.log("=============================")
  var text = req.query.text
  tone_analyzer.tone({ text: text},
  function(err, response) {
    if (err) {
      console.log(err);
    }
    else {
      var feelings = response.document_tone.tone_categories[0].tones
      // console.log(feelings)
      feelings.sort(function(obj1, obj2){
        return obj2.score - obj1.score
      })

      // console.log(feelings)
      // console.log(feelings[0].tone_name)
      // console.log(feelings[4].tone_name)
      var emotion = feelings[0].tone_name
      var data;
      switch(emotion){
        case "Anger":
          data = {
            most: "anger",
            least: "motivation"
          };
        break;
        case "Disgust":
          data = {
            most: "dark",
            least: "energetic"
          };
        break;
        case "Fear":
          data = {
            most: "fear",
            least: "courage"
          };
        case "Joy":
          data = {
            most: "joy",
            least: "whimsical"
          }
        break;

        case "Sadness":
          data = {
            most: "depressed",
            least: "excited"
          }
        break;

        default:
          data = {
            most: "happy",
            least: "sad"
          }
        }
        
      res.send(data)
    }
  });
})

//===========
// mock data
//===========


// response = {
//   "document_tone": {
//     "tone_categories": [
//       {
//         "tones": [
//           {
//             "score": 0.371059,
//             "tone_id": "anger",
//             "tone_name": "Anger"
//           },
//           {
//             "score": 0.245303,
//             "tone_id": "disgust",
//             "tone_name": "Disgust"
//           },
//           {
//             "score": 0.248368,
//             "tone_id": "fear",
//             "tone_name": "Fear"
//           },
//           {
//             "score": 0.052157,
//             "tone_id": "joy",
//             "tone_name": "Joy"
//           },
//           {
//             "score": 0.535403,
//             "tone_id": "sadness",
//             "tone_name": "Sadness"
//           }
//         ],
//         "category_id": "emotion_tone",
//         "category_name": "Emotion Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0,
//             "tone_id": "analytical",
//             "tone_name": "Analytical"
//           },
//           {
//             "score": 0,
//             "tone_id": "confident",
//             "tone_name": "Confident"
//           },
//           {
//             "score": 0.968,
//             "tone_id": "tentative",
//             "tone_name": "Tentative"
//           }
//         ],
//         "category_id": "language_tone",
//         "category_name": "Language Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0.143,
//             "tone_id": "openness_big5",
//             "tone_name": "Openness"
//           },
//           {
//             "score": 0.017,
//             "tone_id": "conscientiousness_big5",
//             "tone_name": "Conscientiousness"
//           },
//           {
//             "score": 0.953,
//             "tone_id": "extraversion_big5",
//             "tone_name": "Extraversion"
//           },
//           {
//             "score": 0.125,
//             "tone_id": "agreeableness_big5",
//             "tone_name": "Agreeableness"
//           },
//           {
//             "score": 0.45,
//             "tone_id": "emotional_range_big5",
//             "tone_name": "Emotional Range"
//           }
//         ],
//         "category_id": "social_tone",
//         "category_name": "Social Tone"
//       }
//     ]
//   },
//   "sentences_tone": [
//     {
//       "sentence_id": 0,
//       "text": "A word is dead when it is said, some say.",
//       "input_from": 0,
//       "input_to": 41,
//       "tone_categories": [
//         {
//           "tones": [
//             {
//               "score": 0.4299,
//               "tone_id": "anger",
//               "tone_name": "Anger"
//             },
//             {
//               "score": 0.231341,
//               "tone_id": "disgust",
//               "tone_name": "Disgust"
//             },
//             {
//               "score": 0.288708,
//               "tone_id": "fear",
//               "tone_name": "Fear"
//             },
//             {
//               "score": 0.028669,
//               "tone_id": "joy",
//               "tone_name": "Joy"
//             },
//             {
//               "score": 0.620037,
//               "tone_id": "sadness",
//               "tone_name": "Sadness"
//             }
//           ],
//           "category_id": "emotion_tone",
//           "category_name": "Emotion Tone"
//         },
//         {
//           "tones": [
//             {
//               "score": 0,
//               "tone_id": "analytical",
//               "tone_name": "Analytical"
//             },
//             {
//               "score": 0,
//               "tone_id": "confident",
//               "tone_name": "Confident"
//             },
//             {
//               "score": 0.715,
//               "tone_id": "tentative",
//               "tone_name": "Tentative"
//             }
//           ],
//           "category_id": "language_tone",
//           "category_name": "Language Tone"
//         },
//         {
//           "tones": [
//             {
//               "score": 0.19,
//               "tone_id": "openness_big5",
//               "tone_name": "Openness"
//             },
//             {
//               "score": 0.066,
//               "tone_id": "conscientiousness_big5",
//               "tone_name": "Conscientiousness"
//             },
//             {
//               "score": 0.904,
//               "tone_id": "extraversion_big5",
//               "tone_name": "Extraversion"
//             },
//             {
//               "score": 0.32,
//               "tone_id": "agreeableness_big5",
//               "tone_name": "Agreeableness"
//             },
//             {
//               "score": 0.489,
//               "tone_id": "emotional_range_big5",
//               "tone_name": "Emotional Range"
//             }
//           ],
//           "category_id": "social_tone",
//           "category_name": "Social Tone"
//         }
//       ]
//     },
//     {
//       "sentence_id": 1,
//       "text": "Emily Dickinson",
//       "input_from": 42,
//       "input_to": 57,
//       "tone_categories": []
//     }
//   ]
// }


module.exports = router